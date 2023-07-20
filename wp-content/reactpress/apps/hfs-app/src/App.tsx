/** @format */

import * as React from 'react';
import { useRef, useState, useCallback, useContext } from 'react';
import { render } from 'react-dom';
import { useImmerReducer } from 'use-immer';
import StateContext from './StateContext';
import DispatchContext from './DispatchContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';
import MapComponent from './components/Map/Map';

function App() {
	const initialState = {
		stationData: {},
		extraData: {},
		chartData: [],
		yearMax: 0,
		yearMin: 0,
		yearStart: 0,
		yearEnd: 0,
		yearData: [],
		infoData: {},
		selectedSat: 'vs_All',
		satToast: true,
		searchToast: true,
		patternToast: true,
		allSat: true,
		satS3A: false,
		satS3B: false,
		satS6A: false,
		satJ2: false,
		satJ3: false,
		searchValue: '',
		searchType: '',
		searchData: [],
		ucField: 'anomalia',
	};
	const [state, dispatch] = useImmerReducer(mapReducer, initialState);
	const [searchType, setSearchType] = useState('');

	function mapReducer(draft: any, action: any) {
		switch (action.type) {
			case 'loadStation':
				draft.stationData = action.stValue;
				break;
			case 'extraData':
				draft.yearData = action.infoYears;
				draft.infoData = action.infoData;
				break;
			case 'selectSat':
				draft.selectedSat = action.satName;
				if (action.satName == 'S3A') {
					draft.allSat = false;
					draft.satS3A = true;
					draft.satS3B = false;
					draft.satS6A = false;
					draft.satJ2 = false;
					draft.satJ3 = false;
					draft.selectedSat = 'vs_' + action.satName;
				} else if (action.satName == 'All') {
					draft.allSat = true;
					draft.satS3A = false;
					draft.satS3B = false;
					draft.satS6A = false;
					draft.satJ2 = false;
					draft.satJ3 = false;
					draft.selectedSat = 'vs_' + action.satName;
				} else if (action.satName == 'S3B') {
					draft.allSat = false;
					draft.satS3A = false;
					draft.satS3B = true;
					draft.satS6A = false;
					draft.satJ2 = false;
					draft.satJ3 = false;
					draft.selectedSat = 'vs_' + action.satName;
				} else if (action.satName == 'S6A') {
					draft.allSat = false;
					draft.satS3A = false;
					draft.satS3B = false;
					draft.satS6A = true;
					draft.satJ2 = false;
					draft.satJ3 = false;
					draft.selectedSat = 'vs_' + action.satName;
				} else if (action.satName == 'J2') {
					draft.allSat = false;
					draft.satS3A = false;
					draft.satS3B = false;
					draft.satS6A = false;
					draft.satJ2 = true;
					draft.satJ3 = false;
					draft.selectedSat = 'vs_' + action.satName;
				} else if (action.satName == 'J3') {
					draft.allSat = false;
					draft.satS3A = false;
					draft.satS3B = false;
					draft.satS6A = false;
					draft.satJ2 = false;
					draft.satJ3 = true;
					draft.selectedSat = 'vs_' + action.satName;
				}
				console.log('SatPanel ' + action.satName);
				break;
			case 'togleSatToast':
				draft.satToast = action.closeSatToast;
				break;
			case 'togleSearchToast':
				draft.searchToast = action.closeSearchToast;
				break;
			case 'toglePatternToast':
				draft.patternToast = action.closePatternToast;
				break;
			case 'searchDataAction':
				draft.searchData = action.searchDataValue;
				break;
			case 'searchValues':
				draft.searchValue = action.searchValue;
				break;
			case 'ucAction':
				draft.ucField = action.ucValue;
				break;
			case 'searchAction':
				draft.searchValue = action.searchEventValue;
				draft.searchType = action.searchTypeValue;
				//search(action.searchTypeValue, action.searchEventValue);

				break;
			case 'searchFunction':
				search(action.searchTypeValue, action.searchEventValue);
				break;
			case 'loadData':
				draft.extraData = action.infoValue;
				draft.chartData = action.infoChart;
				draft.yearMax = action.valueMax;
				draft.yearMin = action.valueMin;
				draft.yearStart = action.valueStart;
				draft.yearEnd = action.valueEnd;
				/* () => {
					toggleChartModal();
				}; */
				break;
			case 'closePopup':
				console.log('teste');
				//popupNull();
				break;
		}
	}

	async function search(type, value) {
		/* 		dispatch({
			type: 'searchLoading',
			searchState: true,
		}); */
		console.log(type);
		const res = await axios(
			`http://localhost:1337/api/vstations?filters[${type}][$contains]=${value.toUpperCase()}`
		);
		/* const res = await axios(
		`https://api.maphidro.info/api/stations?filters[stName][$contains]=${val.toUpperCase()}`
	); */
		const stationData = await res.data.data;
		if (stationData.length > 0) {
			dispatch({
				type: 'searchDataAction',
				searchDataValue: stationData,
			});
		}
	}

	return (
		<>
			<StateContext.Provider value={state}>
				<DispatchContext.Provider value={dispatch}>
					<MapComponent />
				</DispatchContext.Provider>
			</StateContext.Provider>
		</>
	);
}

export default App;
