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

function App() {
	const { height, width } = useWindowDimensions();

	const BASE_URL = process.env.REACT_APP_URL_API;

	const initialState = {
		stationData: {},
		chartOverall: {},
		chartSelection: [],
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
		searchStation: {},
		setSearchStation: false,
		showSecondAxis: false,
		compareStationOverall: false,
		compareStationSelection: false,
		secondAxisOverall: false,
		secondAxisSelection: false,
		ucField: 'anomalia',
		showHeader: true,
		modals: {
			projects: false,
			timeline: false,
			download: false,
			where: false,
			when: false,
			how: false,
			select: false,
			filters: false,
			results: false,
		},
		stationLayer: '',
		drainageArea: false,
		drainageAreaName: null,
		drainageData: null,
	};
	const [state, dispatch] = useImmerReducer(mapReducer, initialState);
	const [searchType, setSearchType] = useState('');

	function mapReducer(draft: any, action: any) {
		switch (action.type) {
			case 'loadStation':
				draft.stationData = action.stValue;
				draft.showHeader = false;
				break;
			case 'reduceOverall':
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
				draft.searchResult = true;
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
				break;
			case 'searchFunction':
				search(action.searchTypeValue, action.searchEventValue);
				break;
			case 'searchPanel':
				draft.searchStation = action.valueStation;
				draft.chartOverall = action.valueUpdatedOverall;
				draft.chartSelection = action.valueUpdatedSelection;
				draft.setSearchStation = true;
				break;
			case 'toggleSecondAxisOverall':
				draft.secondAxisOverall = action.valueToggle;
				break;
			case 'toggleSecondAxisSelection':
				draft.secondAxisSelection = action.valueToggle;
				break;
			case 'toggleCompareStationOverall':
				draft.compareStationOverall = action.valueToggle;
				break;
			case 'toggleCompareStationSelection':
				draft.compareStationSelection = action.valueToggle;
				break;
			case 'setChartSelection':
				draft.chartSelection = action.valueSelection;
				break;
			case 'loadDataFromDB':
				draft.chartOverall = action.valueOverall;
				draft.chartSelection = action.valueSelection;
				draft.yearMax = action.valueMax;
				draft.yearMin = action.valueMin;
				draft.yearStart = action.valueStart;
				draft.yearEnd = action.valueEnd;
				break;
			case 'resetExtraData':
				draft.chartOverall = action.updatedArray;
				console.log(action.updatedArray);
				break;
			case 'togleTimeLineModal':
				draft.modals.timeline = true;
				break;
			case 'closeTimeLineModal':
				draft.modals.timeline = false;
				break;
			case 'togleProjectsModal':
				draft.modals.projects = true;
				break;
			case 'closeSearchModal':
				draft.modals.search = false;
				break;
			case 'toggleSearchModal':
				draft.modals.timeline = false;
				draft.modals.search = true;
				break;
			case 'closeProjectsModal':
				draft.modals.projects = false;
				break;
			case 'togleSelectModal':
				draft.modals.select = true;
				break;
			case 'closeSelectModal':
				draft.modals.select = false;
				break;
			case 'stationArea':
				draft.stationLayer = action.valueSource;
				break;
			case 'showDrainageArea':
				draft.drainageArea = action.valueShow;
				draft.drainageAreaName = action.valueName;
				break;
			case 'drainageArea':
				draft.drainageData = action.valueArea;
				break;
			case 'closePopup':
				draft.showHeader = true;
				console.log('teste');
				//popupNull();
				break;
			case 'toggleBackdrop':
				draft.backdrop = action.value;
				break;
		}
	}

	useEffect(() => {
		if (state.searchValue) {
			search('name', state.searchValue);
		}
		/*
    If that was just set and now it's true,
    then this is where we would want to save data
    into localStorage.
    */
	}, [state.searchValue]);

	async function search(type: string, value: string) {
		const cancelTokenSource = axios.CancelToken.source();
		console.log(type);
		try {
			const res = await axios(
				`${BASE_URL}/api/vstations?filters[${type}][$contains]=${value.toUpperCase()}`,
				{
					cancelToken: cancelTokenSource.token,
				}
			);
			dispatch({
				type: 'toggleBackdrop',
				value: !state.backdrop,
			});
			const stationData = await res.data.data;
			if (stationData.length > 0) {
				dispatch({
					type: 'searchDataAction',
					searchDataValue: stationData,
				});
				if (width < 600) {
				} else {
					dispatch({ type: 'toggleSearchModal' });
				}
			}
		} catch (e) {
			console.log(e);
		}
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
