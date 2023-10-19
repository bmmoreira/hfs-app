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
import ScaleToast from '../Toasts/ScaleToast';
import PanelModals from '../Modal/PanelModals';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { BASE_URL, COLLECTION_NAME } from '../Utils/constants';

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

	const iniZoom: number = 4;
	const iniLat = -13.91;
	const iniLon = -58.59;

	const unclustered: LayerProps = {
		id: 'unclustered-symbol',
		type: 'symbol',
		source: 'vs_All',
		filter: ['!', ['has', 'point_count']],
		paint: {
			'text-color': [
				'step',
				['get', appState.ucField],
				'#ffffff',
				-1.5,
				'#ffffff',
				-1.0,
				'#000000',
				-0.5,
				'#000000',
				0,
				'#000000',
				0.5,
				'#000000',
				1.0,
				'#ffffff',
				1.5,
				'#ffffff',
			],
		},
	};

	const unclusteredS3A: LayerProps = {
		id: 'unclustered-symbol',
		type: 'symbol',
		source: 'vs_S3A',
		filter: ['!', ['has', 'point_count']],
	};

	const unclusteredS3B: LayerProps = {
		id: 'unclustered-symbol',
		type: 'symbol',
		source: 'vs_S3B',
		filter: ['!', ['has', 'point_count']],
	};

	const unclusteredS6A: LayerProps = {
		id: 'unclustered-symbol',
		type: 'symbol',
		source: 'vs_S6A',
		filter: ['!', ['has', 'point_count']],
	};

	const unclusteredJ2: LayerProps = {
		id: 'unclustered-symbol',
		type: 'symbol',
		source: 'vs_S6A',
		filter: ['!', ['has', 'point_count']],
	};

	const unclusteredJ3: LayerProps = {
		id: 'unclustered-symbol',
		type: 'symbol',
		source: 'vs_S6A',
		filter: ['!', ['has', 'point_count']],
	};

	if (API_KEY == null) {
		throw new Error(
			'You have to configure env REACT_APP_API_KEY, see README'
		);
	}

	const [chartModal, setChartModal] = useState(false);
	const toggleChartModal = () => {
		// change search value to blank to fix next search with same value useEffect
		appDispatch({
			type: 'searchAction',
			searchEventValue: '',
		});
		setChartModal((prevState) => {
			return !prevState;
		});
	};

	function popupNull() {
		setPopupInfo(null);
		appDispatch({
			type: 'closePopup',
		});
		let resizable = document.getElementById('map-wrap');
		resizable.style.height = '100vh';
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
	const [showOverlay, setShowOverlay] = useState(true);

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
		window.scrollTo(0, 150);
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
					type: 'stationArea',
					valueSource: feature.properties.name,
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
				let mapElement = document.getElementById('map-wrap');
				let newHeight = Number(window.innerHeight) - 90;
				mapElement.style.height = `${newHeight}px`;
				mapRef.current.resize();
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

			const response = await axios
				.get(`${BASE_URL}/${COLLECTION_NAME}?filters[name]=${id}`)
				.then((response) => {
					const entries = response.data.data;
					console.log(entries);
					if (entries.length > 0) {
						const dataset = processData(entries[0].attributes);

						appDispatch({
							type: 'loadDataFromDB',
							valueOverall: dataset.overall,
							valueSelection: dataset.selection,
							valueMin: dataset.yearMin,
							valueMax: dataset.yearMax,
							valueStart: dataset.yearStart,
							valueEnd: dataset.yearEnd,
						});
						toggleChartModal();

						console.log(
							'%c EVENT: click button getData - toggleModalChat! ',
							'background: #222; color: #bada55'
						);
					} else {
						console.log(
							'No entry found with the specified custom specific field.!!!'
						);
					}
				})
				.catch((err) => {
					console.log(err);
					console.log(
						'No entry found with the specified custom specific field.!!!'
					);
				});
		} catch (error: any) {
			console.log(error);
		}
	}

	async function getDrainageArea(id: string) {
		try {
			const sId = String(id).padStart(8, '0');

			const response = await axios
				.get(`${BASE_URL}/${COLLECTION_NAME}?filters[name]=${id}`)
				.then((response) => {
					const entries = response.data.data;
					console.log(entries);
					if (entries.length > 0) {
						appDispatch({
							type: 'drainageArea',
							valueArea: entries[0].attributes.drainage,
						});

						console.log(
							'%c EVENT: click button getDrainageArea! ',
							'background: #222; color: #bada55'
						);
					} else {
						console.log(
							'No entry found with the specified custom specific field.!!!'
						);
					}
				})
				.catch((err) => {
					console.log(err);
					console.log(
						'No entry found with the specified custom specific field.!!!'
					);
				});
		} catch (error: any) {
			console.log(error);
		}
	}

	function processData(dataset) {
		console.log(dataset);
		const dataSelection = new Array();
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

			dataSelection.push({
				height: Number(value.height),
				uncertainty: Number(value.uncertainty),
				hv: Number(value.height) + Math.abs(value.uncertainty),
				lv: Number(value.height) - Math.abs(value.uncertainty),
				date: year + '-' + month + '-' + day,
				dateString: value.date,
			});
		});

		const data = {
			isSet: true,
			overall: overall,
			selection: dataSelection,
			dataCur: dataset.overall.curData,
			yearMin: dataset.overall.minYear,
			yearMax: dataset.overall.maxYear,
			yearStart: dataset.start,
			yearEnd: dataset.last,
			name: dataset.name,
			latitude: dataset.latitude,
			longitude: dataset.longitude,
			lastUpdate: dataset.updatedAt,
		};
		return data;
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

	const flyToStation = (coord: number[]) => {
		// blank search value to avoid bug on next search
		appDispatch({
			type: 'searchAction',
			searchEventValue: '',
		});
		mapRef.current.flyTo({
			center: [coord[0], coord[1]], // Fly to the selected target
			duration: 6000, // Animate over 6 seconds
			essential: true, // This animation is considered essential with
			zoom: 10,
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

	const _onIdle = () => {
		console.log(mapRef.current);
		setShowOverlay(false);
		console.log('teste onIdle');
	};

	const Overlay = () => {
		return (
			<div className="overlay">
				<div className="spinner"></div>
				{/* Optionally, you can add a loading message */}
				<p
					style={{
						marginLeft: '-150px',
						marginBottom: '180px',
						fontWeight: '600',
						fontSize: '1.5rem',
						color: '#f0f0f0',
					}}
				>
					Loading HFS-App...
				</p>
			</div>
		);
	};

	const [state, setState] = useState({
		messageClass: 'visible',
		mapStyle: 'mapbox://styles/mapbox/dark-v9',
		popupInfo: null,
		x: 0,
		y: 0,
		width: 100,
		height: 100,
	});

	/* 	useEffect(() => {
		if (mapRef.current) {
			console.log('test ref2');
			console.log(mapRef.current);
		}
		
	}, [mapRef.current]); 

		 	useEffect(() => {
		if (mapRef.current) {
			mapRef.current.flyTo({
				center: [appState.stationData.lngLat[0], appState.stationData.lngLat[1]], // Fly to the selected target
				duration: 2000, // Animate over 6 seconds
				essential: true, // This animation is considered essential with
				zoom: 12,
				//respect to prefers-reduced-motion
			});
		}
		
	}, [mapRef.current]); */

	useEffect(() => {
		if (appState.drainageAreaName) {
			getDrainageArea(appState.drainageAreaName);
		}
	}, [appState.drainageAreaName]);

	useEffect(() => {
		loadFeatures();
	}, []);

	async function loadFeatures() {
		try {
			const res = await axios({
				method: 'get',
				url: `/assets/data/geojson/vs_All.geojson`,
				headers: {
					'Access-Control-Allow-Origin': true,
				},
			});
			console.log(res);

			if (res.data.features.length > 0) {
				appDispatch({
					type: 'filterFeatures',
					value: res.data,
				});
				appDispatch({
					type: 'stationFeatures',
					value: res.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	const baciasFills2: LayerProps = {
		id: 'bacias2-fills',
		type: 'fill',
		source: 'bacias2',
		layout: {
			// Make the layer visible by default.
			visibility: 'visible',
		},
		paint: {
			'fill-color': '#627BC1',
			'fill-opacity': [
				'case',
				['boolean', ['feature-state', 'hover'], false],
				0.7,
				0.3,
			],
		},
	};

	const baciasBorders2: LayerProps = {
		id: 'bacias2-borders',
		type: 'line',
		source: 'bacias2',
		layout: {
			// Make the layer visible by default.
			visibility: 'visible',
		},
		paint: {
			'line-color': '#627BC1',
			'line-width': 2,
		},
	};

	return (
		<>
			<div id="map-wrap" className="map-wrap">
				{showOverlay && <Overlay />}
				<Map
					initialViewState={{
						latitude: iniLat,
						longitude: iniLon,
						zoom: iniZoom,
					}}
					mapStyle={state.mapStyle}
					mapboxAccessToken={API_KEY}
					interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id]}
					onClick={onClick}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					onIdle={_onIdle}
					ref={mapRef}
				>
					{appState.drainageArea ? (
						<Source
							id="bacias"
							type="geojson"
							data={appState.drainageData}
						>
							<Layer {...baciasFills2} />
							<Layer {...baciasBorders2} />
						</Source>
					) : (
						<Source
							id="bacias"
							type="geojson"
							data={`/assets/data/geojson/layer_dummy.geojson`}
						>
							<Layer {...baciasFills2} />
							<Layer {...baciasBorders2} />
						</Source>
					)}

					{appState.allSat && (
						<Source
							id="vs_All"
							type="geojson"
							data={appState.filteredFeatures}
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
										-1.5,
										'#ff9400',
										-1.0,
										'#fbc500',
										-0.5,
										'#f9f602',
										0,
										'#b2d9ff',
										0.5,
										'#0080ff',
										1.0,
										'#004d99',
										1.5,
										'#001a33',
									],
									'circle-radius': 18,
									'circle-stroke-width': [
										'step',
										['get', appState.ucField],
										5,
										-1.5,
										4,
										-1.0,
										3,
										-0.5,
										2,
										0,
										2,
										0.5,
										3,
										1.0,
										4,
										1.5,
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
							<Layer
								id={'unclustered-point'}
								type={'circle'}
								source={'vs_S3A'}
								filter={['!', ['has', 'point_count']]}
								paint={{
									'circle-color': [
										'step',
										['get', appState.ucField],
										'#8f0000',
										-1.5,
										'#ff9400',
										-1.0,
										'#fbc500',
										-0.5,
										'#f9f602',
										0,
										'#b5e700',
										0.5,
										'#57d005',
										1.0,
										'#018414',
										1.5,
										'#014f0c',
									],
									'circle-radius': 18,
									'circle-stroke-width': [
										'step',
										['get', appState.ucField],
										5,
										-1.5,
										4,
										-1.0,
										3,
										-0.5,
										2,
										0,
										2,
										0.5,
										3,
										1.0,
										4,
										1.5,
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
								{...unclusteredS3A}
							/>
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
							<Layer
								id={'unclustered-point'}
								type={'circle'}
								source={'vs_S3B'}
								filter={['!', ['has', 'point_count']]}
								paint={{
									'circle-color': [
										'step',
										['get', appState.ucField],
										'#8f0000',
										-1.5,
										'#ff9400',
										-1.0,
										'#fbc500',
										-0.5,
										'#f9f602',
										0,
										'#b2d9ff',
										0.5,
										'#0080ff',
										1.0,
										'#004d99',
										1.5,
										'#001a33',
									],
									'circle-radius': 18,
									'circle-stroke-width': [
										'step',
										['get', appState.ucField],
										5,
										-1.5,
										4,
										-1.0,
										3,
										-0.5,
										2,
										0,
										2,
										0.5,
										3,
										1.0,
										4,
										1.5,
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
								{...unclusteredS3B}
							/>
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
							<Layer
								id={'unclustered-point'}
								type={'circle'}
								source={'vs_S6A'}
								filter={['!', ['has', 'point_count']]}
								paint={{
									'circle-color': [
										'step',
										['get', appState.ucField],
										'#8f0000',
										-1.5,
										'#ff9400',
										-1.0,
										'#fbc500',
										-0.5,
										'#f9f602',
										0,
										'#b2d9ff',
										0.5,
										'#0080ff',
										1.0,
										'#004d99',
										1.5,
										'#001a33',
									],
									'circle-radius': 18,
									'circle-stroke-width': [
										'step',
										['get', appState.ucField],
										5,
										-1.5,
										4,
										-1.0,
										3,
										-0.5,
										2,
										0,
										2,
										0.5,
										3,
										1.0,
										4,
										1.5,
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
								{...unclusteredS6A}
							/>
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
							<Layer
								id={'unclustered-point'}
								type={'circle'}
								source={'vs_J2'}
								filter={['!', ['has', 'point_count']]}
								paint={{
									'circle-color': [
										'step',
										['get', appState.ucField],
										'#8f0000',
										-1.5,
										'#ff9400',
										-1.0,
										'#fbc500',
										-0.5,
										'#f9f602',
										0,
										'#b2d9ff',
										0.5,
										'#0080ff',
										1.0,
										'#004d99',
										1.5,
										'#001a33',
									],
									'circle-radius': 18,
									'circle-stroke-width': [
										'step',
										['get', appState.ucField],
										5,
										-1.5,
										4,
										-1.0,
										3,
										-0.5,
										2,
										0,
										2,
										0.5,
										3,
										1.0,
										4,
										1.5,
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
								{...unclusteredJ2}
							/>
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
							<Layer
								id={'unclustered-point'}
								type={'circle'}
								source={'vs_J3'}
								filter={['!', ['has', 'point_count']]}
								paint={{
									'circle-color': [
										'step',
										['get', appState.ucField],
										'#8f0000',
										-1.5,
										'#ff9400',
										-1.0,
										'#fbc500',
										-0.5,
										'#f9f602',
										0,
										'#b2d9ff',
										0.5,
										'#0080ff',
										1.0,
										'#004d99',
										1.5,
										'#001a33',
									],
									'circle-radius': 18,
									'circle-stroke-width': [
										'step',
										['get', appState.ucField],
										5,
										-1.5,
										4,
										-1.0,
										3,
										-0.5,
										2,
										0,
										2,
										0.5,
										3,
										1.0,
										4,
										1.5,
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
								{...unclusteredJ3}
							/>
						</Source>
					)}

					<NavigationControl position="top-left" />
					<ScaleControl />
					{popupInfo && (
						<StationPopup
							sObj={popupInfo}
							getData={getStationData}
							closePopup={popupNull}
						/>
					)}
					<PanelModals flyTo={flyToStation} />
				</Map>

				{chartModal && (
					<ModalChart
						show={chartModal}
						onHide={() => setChartModal(false)}
					/>
				)}
				<ScaleToast />

				<Backdrop
					sx={{
						color: '#fff',
						zIndex: (theme) => theme.zIndex.drawer + 1,
					}}
					open={appState.backdrop}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			</div>
		</>
	);
}

export default MapComponent;
