/** @format */

import * as React from 'react';
import {
	useRef,
	useState,
	useCallback,
	useContext,
	useEffect,
} from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ModalChart from '../Modal/ModalChart';
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import '../popup/custom-popup.css';
import axios from 'axios';
import {
	Map,
	Popup,
	Source,
	Layer,
	NavigationControl,
	FullscreenControl,
	ScaleControl,
} from 'react-map-gl';

import {
	clusterLayer,
	clusterCountLayer,
	unclusteredPointLayer,
	unclusteredPointSymbol,
	clusterLayerS3A,
	clusterCountLayerS3A,
	unclusteredPointLayerS3A,
	unclusteredPointSymbolS3A,
	clusterLayerS3B,
	clusterCountLayerS3B,
	unclusteredPointLayerS3B,
	unclusteredPointSymbolS3B,
	clusterLayerS6A,
	clusterCountLayerS6A,
	unclusteredPointLayerS6A,
	unclusteredPointSymbolS6A,
	clusterLayerJ2,
	clusterCountLayerJ2,
	unclusteredPointLayerJ2,
	unclusteredPointSymbolJ2,
	clusterLayerJ3,
	clusterCountLayerJ3,
	unclusteredPointLayerJ3,
	unclusteredPointSymbolJ3,
} from '../layers';

import type { LayerProps, MapRef } from 'react-map-gl';

import type { GeoJSONSource } from 'react-map-gl';
import StationPopup from '../popup/StationPopup';
import SatelliteToast from '../Toasts/SatelitePanel';
import SearchToast from '../Toasts/SearchToast';

interface PopupInfo {
	lngLat: [number, number];
	name: string;
	code?: string;
	river?: string;
	basin?: string;
	anomalia?: string;
	sat?: string;
	change?: string;
	level?: string;
	sdate?: string;
	edate?: string;
}

function MapComponent() {
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);

	const API_KEY = process.env.REACT_APP_API_KEY;
	const BASE_URL = process.env.REACT_APP_URL_API;
	const COLLECTION_NAME = process.env.REACT_APP_COLLECTION_NAME;

	const iniZoom: number = 4;
	const iniLat = -13.91;
	const iniLon = -58.59;

	const unclustered: LayerProps = {
		id: 'unclustered-symbol',
		type: 'symbol',
		source: 'vs_All',
		filter: ['!', ['has', 'point_count']],
	};

	if (API_KEY == null) {
		throw new Error(
			'You have to configure env REACT_APP_API_KEY, see README'
		);
	}

	const [chartModal, setChartModal] = useState(false);
	const toggleChartModal = () => {
		setChartModal((prevState) => {
			return !prevState;
		});
	};

	function popupNull() {
		setPopupInfo(null);
		mapRef.current.easeTo({
			center: [iniLon, iniLat],
			zoom: iniZoom,
			duration: 1500,
			pitch: 0, // pitch in degrees
			bearing: 0, // bearing in degrees
		});
	}

	const mapRef = useRef<MapRef>(null);
	const popupRef = useRef(null);

	const [cursor, setCursor] = useState<string>('auto');
	const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);

	const markerData = [
		{ coordinates: [-63.51944, -8.05167], value: 10 },
		{ coordinates: [-64.775, -3.24], value: 20 },
		// Add more marker data as needed
	];

	const onClick = (event) => {
		// If we let the click event propagates to the map, it will immediately close the popup
		// with `closeOnClick: true`
		event.originalEvent.stopPropagation();
		const zoom = 13;
		const feature = event.features[0];

		if (feature) {
			if (feature.properties.name) {
				const nameSplit = feature.properties.name.split('_');

				mapRef.current.easeTo({
					center: feature.geometry.coordinates,

					pitch: 120, // pitch in degrees
					bearing: 60, // bearing in degrees
					zoom: 8,
					duration: 1500,
				});

				appDispatch({
					type: 'loadStation',
					stValue: {
						lngLat: feature.geometry.coordinates,
						name: feature.properties.name,
						river: feature.properties.river,
						basin: feature.properties.basin,
						anomalia: feature.properties.anomalia,
						change: feature.properties.change,
						level: feature.properties.value,
						sdate: feature.properties.s_date,
						edate: feature.properties.e_date,
						code: nameSplit[3],
					},
				});

				setPopupInfo({
					lngLat: feature.geometry.coordinates,
					name: feature.properties.name,
					river: feature.properties.river,
					basin: feature.properties.basin,
					anomalia: feature.properties.anomalia,
					sat: feature.properties.sat,
					change: feature.properties.change,
					level: feature.properties.value,
					sdate: feature.properties.s_date,
					edate: feature.properties.e_date,
					code: nameSplit[3],
				});
				console.log(feature.properties.name);
			} else {
				const clusterId = feature.properties.cluster_id;

				const mapboxSource = mapRef.current.getSource(
					appState.selectedSat
				) as GeoJSONSource;

				mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
					if (err) {
						return;
					}

					mapRef.current.easeTo({
						center: feature.geometry.coordinates,
						zoom,
						duration: 500,
					});
				});
			}
		}
	};

	const onMouseEnter = useCallback(() => setCursor('pointer'), []);
	const onMouseLeave = useCallback(() => setCursor('auto'), []);

	async function getStationData(id: string) {
		try {
			const sId = String(id).padStart(8, '0');

			const [stData] = await Promise.all([
				axios.get(`${BASE_URL}/${COLLECTION_NAME}?filters[name]=${id}`),
			]);

			const data = stData.data.data;
			//console.log(data);
			if (data.length > 0) {
				const dataset = data[0].attributes;

				const chartData = new Array();
				console.log(dataset);
				let separatedDataset = separateDataByYear(
					dataset.data._dataSet,
					'date'
				);
				//console.log(separatedDataset);

				let max = dataset.overall.maxData;
				let min = max.concat(dataset.overall.minData);
				let men = min.concat(dataset.overall.men);
				let cur = men.concat(dataset.overall.curData);
				let overall = cur;
				overall.sort(function (a, b) {
					return a.dateTime - b.dateTime;
				});

				dataset.data._dataSet.forEach((value) => {
					let dateObject = new Date(value.date);
					let month = dateObject.getUTCMonth() + 1; //months from 1-12
					let day = dateObject.getUTCDate();
					let year = dateObject.getUTCFullYear();

					chartData.push({
						height: Number(value.height),
						uncertainty: Number(value.ncertainty),
						hv: Number(value.height) + Math.abs(value.uncertainty),
						lv: Number(value.height) - Math.abs(value.uncertainty),
						date: year + '-' + month + '-' + day,
						dateString: value.date,
					});
				});

				appDispatch({
					type: 'loadData',
					infoValue: overall,
					infoChart: chartData,
					valueMin: dataset.overall.minYear,
					valueMax: dataset.overall.maxYear,
				});

				toggleChartModal();
				// console.log(chartData);
				console.log('click button getData');
			} else {
				//console.log(data);
			}
		} catch (error: any) {
			console.log(error);
		}
	}

	function separateDataByYear(dataset, dateProperty) {
		var separatedData = {};
		console.log(dataset);
		let lowerValue = 0;
		let higherValue = 0;
		let higherValueYear = 0;
		let lowerValueYear = 0;
		let lastYear = 0;
		let currentYearData = new Array();

		dataset.forEach(function (item) {
			let date = new Date(item[dateProperty]);
			let year = date.getFullYear();

			if (lowerValue == 0) {
				lowerValue = item.orthometric_height_of_water;
			}

			if (item.orthometric_height_of_water > Number(higherValue)) {
				higherValue = item.orthometric_height_of_water;
				higherValueYear = year;
			}

			if (item.orthometric_height_of_water < Number(lowerValue)) {
				lowerValue = item.orthometric_height_of_water;
				lowerValueYear = year;
			}

			if (year > lastYear) {
				lastYear = year;
			}

			if (!separatedData.hasOwnProperty(year)) {
				separatedData[year] = [];
			}

			separatedData[year].push(item);
		});

		separatedData[lastYear].forEach((item) => {
			currentYearData.push({
				date: new Date(item.date),
				valueCur: item.orthometric_height_of_water,
				uncertainty: item.associated_uncertainty,
			});
		});

		appDispatch({
			type: 'extraData',
			infoYears: {
				hValue: higherValue,
				hValueYear: higherValueYear,
				lValue: lowerValue,
				lValueYear: lowerValueYear,
				currentYear: currentYearData,
				cValueYear: lastYear,
			},
			infoData: separatedData,
		});
		console.log(higherValue + ' ' + higherValueYear);
		console.log(lowerValue + ' ' + lowerValueYear);
		return currentYearData;
	}

	const [searchValue, setSearchValue] = useState({
		stationData: [],
		loading: false,
		value: '',
		content: false,
	});

	const [showSearchToast, toggleSearch] = useState(false);
	const toggleSearchToast = () => {
		toggleSearch((prevState) => {
			return !prevState;
		});
	};

	async function searchChangeHandler(type: string, value: string) {
		//console.log(appState);
		console.log(type + ' ' + value);
		search(type, value);
	}

	const flyToStation = (coord: number[]) => {
		mapRef.current.flyTo({
			center: [coord[0], coord[1]], // Fly to the selected target
			duration: 6000, // Animate over 6 seconds
			essential: true, // This animation is considered essential with
			zoom: 12,
			//respect to prefers-reduced-motion
		});
	};

	async function search(type: string, value: string) {
		const sat = appState.selectedSat.slice(3);

		console.log(appState.selectedSat);

		if (appState.selectedSat === '' || appState.selectedSat === 'vs_All') {
			try {
				const res = await axios(
					`${BASE_URL}/${COLLECTION_NAME}?filters[${type}][$contains]=${value.toUpperCase()}`
				);
				const stationData = await res.data.data;
				if (stationData.length > 0) {
					appDispatch({
						type: 'searchDataAction',
						searchDataValue: stationData,
					});
					console.log(stationData);
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			try {
				const res = await axios(
					`${BASE_URL}/${COLLECTION_NAME}?filters[sat][$contains]=${sat}&filters[${type}][$contains]=${value.toUpperCase()}`
				);
				const stationData = await res.data.data;
				if (stationData.length > 0) {
					appDispatch({
						type: 'searchDataAction',
						searchDataValue: stationData,
					});
					console.log(stationData);
				}
			} catch (error) {
				console.log(error);
			}
		}
	}

	return (
		<>
			<Map
				initialViewState={{
					latitude: iniLat,
					longitude: iniLon,
					zoom: iniZoom,
				}}
				mapStyle="mapbox://styles/mapbox/dark-v9"
				mapboxAccessToken={API_KEY}
				interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				ref={mapRef}
			>
				{appState.allSat && (
					<Source
						id="vs_All"
						type="geojson"
						data="/assets/data/geojson/vs_All.geojson"
						cluster={true}
						clusterMaxZoom={6}
						clusterRadius={50}
					>
						<Layer {...clusterLayer} />
						<Layer {...clusterCountLayer} />
						<Layer
							id={'unclustered-point'}
							type={'circle'}
							source={'vs_All'}
							filter={['!', ['has', 'point_count']]}
							paint={{
								'circle-color': [
									'step',
									['get', appState.ucField],
									'#8f0000',
									-3,
									'#ff9400',
									-2,
									'#fbc500',
									-1,
									'#f9f602',
									0,
									'#b5e700',
									1,
									'#57d005',
									2,
									'#018414',
									3,
									'#014f0c',
								],
								'circle-radius': 18,
								'circle-stroke-width': [
									'step',
									['get', appState.ucField],
									5,
									-3,
									4,
									-2,
									3,
									-1,
									2,
									0,
									2,
									1,
									3,
									2,
									4,
									3,
									5,
								],
								'circle-stroke-color': '#fff',
							}}
						/>
						<Layer
							layout={{
								'text-field': ['get', appState.ucField],
								'text-font': [
									'DIN Offc Pro Medium',
									'Arial Unicode MS Bold',
								],
								'text-size': 11,
							}}
							{...unclustered}
						/>
					</Source>
				)}

				{appState.satS3A && !appState.allSat && (
					<Source
						id="vs_S3A"
						type="geojson"
						data="/assets/data/geojson/vs_S3A.geojson"
						cluster={true}
						clusterMaxZoom={6}
						clusterRadius={75}
					>
						<Layer {...clusterLayerS3A} />
						<Layer {...clusterCountLayerS3A} />
						<Layer {...unclusteredPointLayerS3A} />

						<Layer {...unclusteredPointSymbolS3A} />
					</Source>
				)}
				{appState.satS3B && !appState.allSat && (
					<Source
						id="vs_S3B"
						type="geojson"
						data="/assets/data/geojson/vs_S3B.geojson"
						cluster={true}
						clusterMaxZoom={6}
						clusterRadius={75}
					>
						<Layer {...clusterLayerS3B} />
						<Layer {...clusterCountLayerS3B} />
						<Layer {...unclusteredPointLayerS3B} />
						<Layer {...unclusteredPointSymbolS3B} />
					</Source>
				)}
				{appState.satS6A && !appState.allSat && (
					<Source
						id="vs_S6A"
						type="geojson"
						data="/assets/data/geojson/vs_S6A.geojson"
						cluster={true}
						clusterMaxZoom={6}
						clusterRadius={75}
					>
						<Layer {...clusterLayerS6A} />
						<Layer {...clusterCountLayerS6A} />
						<Layer {...unclusteredPointLayerS6A} />
						<Layer {...unclusteredPointSymbolS6A} />
					</Source>
				)}
				{appState.satJ2 && !appState.allSat && (
					<Source
						id="vs_J2"
						type="geojson"
						data="/assets/data/geojson/vs_J2.geojson"
						cluster={true}
						clusterMaxZoom={2}
						clusterRadius={75}
					>
						<Layer {...clusterLayerJ2} />
						<Layer {...clusterCountLayerJ2} />
						<Layer {...unclusteredPointLayerJ2} />
						<Layer {...unclusteredPointSymbolJ2} />
					</Source>
				)}
				{appState.satJ3 && !appState.allSat && (
					<Source
						id="vs_J3"
						type="geojson"
						data="/assets/data/geojson/vs_J3.geojson"
						cluster={true}
						clusterMaxZoom={2}
						clusterRadius={75}
					>
						<Layer {...clusterLayerJ3} />
						<Layer {...clusterCountLayerJ3} />
						<Layer {...unclusteredPointLayerJ3} />
						<Layer {...unclusteredPointSymbolJ3} />
					</Source>
				)}
				<FullscreenControl position="top-left" />
				<NavigationControl position="top-left" />
				<ScaleControl />
				{popupInfo && (
					<StationPopup
						sObj={popupInfo}
						getData={getStationData}
						closePopup={popupNull}
					/>
				)}
			</Map>
			{chartModal && (
				<ModalChart
					show={chartModal}
					onHide={() => setChartModal(false)}
				/>
			)}

			<SatelliteToast />
			<SearchToast flyTo={flyToStation} onSearch={searchChangeHandler} />
		</>
	);
}

export default MapComponent;
