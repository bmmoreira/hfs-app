/** @format */

import * as React from 'react';
import {
	useRef,
	useState,
	useCallback,
	useContext,
	useEffect,
} from 'react';
import { render } from 'react-dom';
import { useImmerReducer } from 'use-immer';
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';
import MapComponent from './components/Map/Map';
import Header from './components/Pages/Header';
import useWindowDimensions from './components/Utils/useWindowDimensions';
import { initialState, mapReducer } from './reducer';
import { COLLECTION_NAME, BASE_URL } from './components/Utils/constants';

function App() {
	const { height, width } = useWindowDimensions();

	//const BASE_URL = process.env.REACT_APP_URL_API;
	const [state, dispatch] = useImmerReducer(mapReducer, initialState);

	useEffect(() => {
		if (state.searchValue) {
			search('name', state.searchValue);
		}
	}, [state.searchValue]);

	async function search(type: string, value: string) {
		const cancelTokenSource = axios.CancelToken.source();

		try {
			const res = await axios(
				`${BASE_URL}/api/vstations?filters[${type}][$contains]=${value.toUpperCase()}`,
				{
					cancelToken: cancelTokenSource.token,
				}
			);
			// toggle loading circle off
			dispatch({
				type: 'toggleBackdrop',
				value: false,
			});
			const stationData = await res.data.data;
			// if there are results to search value
			if (stationData.length > 0) {
				// add the search array result
				dispatch({
					type: 'searchDataAction',
					searchDataValue: stationData,
				});
				// open search modal results
				if (width < 600) {
				} else {
					dispatch({ type: 'toggleSearchModal' });
				}
			}
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		if (state.searchValue2) {
			search2('name', state.searchValue2);
		}
	}, [state.searchValue2]);

	async function search2(type: string, value: string) {
		const sat = state.selectedSat.slice(3);

		console.log(state.selectedSat);

		if (state.selectedSat === '' || state.selectedSat === 'vs_All') {
			try {
				const res = await axios(
					`${BASE_URL}/${COLLECTION_NAME}?filters[${type}][$contains]=${value.toUpperCase()}`
				);
				const stationData = await res.data.data;
				if (stationData.length > 0) {
					dispatch({
						type: 'searchDataAction2',
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
					dispatch({
						type: 'searchDataAction2',
						searchDataValue: stationData,
					});
					console.log(stationData);
				}
			} catch (error) {
				console.log(error);
			}
		}
	}

	useEffect(() => {
		if (state.compareStationName) {
			getSearchStationData(state.compareStationName);
		}
	}, [state.compareStationName]);
	/*
		Function to search a second station and compare it with the
		current selected virtual station.
		This function merge data with current virtual station data
		so it can be show on the Chart Graphic engine,
		because it can only have a unique array in the Chart Engine,
		we have to arrange a workaround.
	*/
	async function getSearchStationData(id: string) {
		try {
			const sId = String(id).padStart(8, '0');

			const response = await axios
				.get(`${BASE_URL}/${COLLECTION_NAME}?filters[name]=${id}`)
				.then((response) => {
					const entries = response.data.data;

					if (entries.length > 0) {
						const dataset = processData(entries[0].attributes);
						console.log(dataset);
						// rename valueCur to valueCur2 to add it to the current chart source data
						const dataCur2 = dataset.dataCur.map((element) => {
							const obj = {
								date: element.date,
								dateTime: element.dateTime,
								valueCur2: element.valueCur,
							};
							return obj;
						});
						// rename values to *2 to add it to the current chart source data
						const dataSelection = dataset.selection.map((element) => {
							const obj = {
								date: element.date,
								dateString: element.dateTime,
								height2: element.height,
								hv2: element.hv,
								lv2: element.lv,
								uncertainty2: element.uncertainty,
							};
							return obj;
						});

						// remove values from previous station added to data source
						const filteredOverall = state.chartOverall.filter(
							(obj) => !obj.hasOwnProperty('valueCur2')
						);
						const filteredSelection = state.chartSelection.filter(
							(obj) => !obj.hasOwnProperty('height2')
						);

						// add search station data to the station selected in Modal
						let updatedOverall = dataCur2.concat(filteredOverall);
						let updatedSelection = dataSelection.concat(filteredSelection);

						updatedOverall.sort(function (a, b) {
							return a.dateTime - b.dateTime;
						});

						dispatch({
							type: 'searchPanel',
							valueStation: dataset,
							valueUpdatedOverall: updatedOverall,
							valueUpdatedSelection: updatedSelection,
						});
						//console.log(dataCur2);
						console.log(
							'%c EVENT: Panel Search Event! ',
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

	return (
		<>
			<StateContext.Provider value={state}>
				<DispatchContext.Provider value={dispatch}>
					{state.showHeader && <Header />}
					<MapComponent />
				</DispatchContext.Provider>
			</StateContext.Provider>
		</>
	);
}

export default App;
