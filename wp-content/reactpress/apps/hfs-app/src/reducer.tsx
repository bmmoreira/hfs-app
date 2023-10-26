/** @format */
import { riversList } from './components/Utils/constants';

export const initialState = {
	stationData: {},
	stationList: [],
	lastUpdatedStations: [],
	filteredFeatures: [],
	stationFeatures: [],
	chartOverall: {},
	chartSelection: [],
	yearMax: 0,
	yearMin: 0,
	yearStart: 0,
	yearEnd: 0,
	yearData: [],
	infoData: {},
	filteredRivers: riversList,
	filterSat: 'All',
	filterMeasurament: 'change',
	filterTimeDays: 0,
	selectedSat: 'All',
	selectedRiver: '',
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
	searchValue2: '',
	searchType2: '',
	searchData: [],
	searchData2: [],
	compareStationName: '',
	searchStation: {},
	setSearchStation: false,
	showSecondAxis: false,
	compareStationOverall: false,
	compareStationSelection: false,
	secondAxisOverall: false,
	secondAxisSelection: false,
	ucField: 'change',
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

export function mapReducer(draft: any, action: any) {
	switch (action.type) {
		case 'setStationList':
			draft.stationList = action.value;
			break;
		case 'setLastUpdated':
			draft.lastUpdatedStations = action.value;
			break;
		case 'setSat':
			draft.selectedSat = action.value;
			break;
		case 'setRiver':
			draft.selectedRiver = action.value;
			break;
		case 'filterFeatures':
			draft.filteredFeatures = action.value;
			break;
		case 'stationFeatures':
			draft.stationFeatures = action.value;
			break;
		case 'setFilterSat':
			draft.filterSat = action.filterSat;
			break;
		case 'setFilterMeasurament':
			draft.filterMeasurament = action.filterMeasurament;
			break;
		case 'setFilterTimeDays':
			draft.filterTimeDays = action.filterTimeDays;
			break;
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
		case 'searchDataAction2':
			draft.searchData2 = action.searchDataValue;
			draft.searchResult2 = true;
			break;
		case 'compareStationAction':
			draft.compareStationName = action.stationName;
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
		case 'searchAction2':
			draft.searchValue2 = action.searchEventValue;
			draft.searchType2 = action.searchTypeValue;
			break;
		case 'searchFunction':
			//search(action.searchTypeValue, action.searchEventValue);
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
