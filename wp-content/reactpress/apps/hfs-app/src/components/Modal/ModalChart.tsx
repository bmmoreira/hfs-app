/** @format */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import DispatchContext from '../../DispatchContext';
import StateContext from '../../StateContext';
import { useState, useEffect, useContext } from 'react';
import { useImmer } from 'use-immer';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ChartSelection from './ChartSelection';
import ChartOverall from './ChartOverall';
import ChartSearch from './ChartSearch';
import SearchComponent from '../Search/Search';
import DateRangeBox from 'devextreme-react/date-range-box';
import 'devextreme/dist/css/dx.light.css';
import './modalchart.css';
import Switch from '@mui/material/Switch';
import * as turf from '@turf/turf';

interface ChartProps {
	//stationObj: Station | undefined;
	show: boolean;
	onHide(): void;
	searchChangeHandler(type: string, value: string): void;
	getSearchStation(value: string): void;
}

const ModalChart = function (props: ChartProps) {
	const appDispatch = useContext(DispatchContext);
	const [key, setKey] = useState('home');

	const appState = useContext(StateContext);
	const [chartData, setChartData] = useState(appState.chartData);
	const [chartDataOverall, setExtraData] = useState(appState.extraData);
	const [chartDataSearch, setDataSearch] = useState(appState.extraData);
	const [secondAxis, setChecked] = useState(appState.showSecondAxis);

	const commonSettings = {
		showClearButton: false,
		useMaskBehavior: true,
		openOnFieldClick: true,
	};
	const msInDay = 1000 * 60 * 60 * 24;
	const now = new Date();
	const startDate = new Date(now.getTime() - msInDay * 3);
	const endDate = new Date(now.getTime() + msInDay * 3);

	function setChartYear(year) {
		const result = appState.chartData.filter((value) => {
			let dateString = value.date.split('-');
			let yearDate = dateString[0];
			// console.log(yearDate + " " + year);
			return yearDate == Number(year);
		});
		// console.log(result);
		setChartData(result);
	}

	function setChart(initValue, endValue) {
		const result = appState.chartData.filter((value) => {
			let initDate = new Date(initValue);
			let endDate = new Date(endValue);
			let valueDate = new Date(value.dateString);
			return valueDate >= initDate && valueDate <= endDate;
		});
		// console.log(result);
		setChartData(result);
	}

	useEffect(() => {
		//setChartYear(new Date(appState.yearStart).getFullYear());
		console.log('endyear: ' + appState.yearEnd);
		console.log('startyear: ' + appState.yearStart);

		return () => {};
	}, []);

	const setSearchStationData = (value) => {
		props.getSearchStation(value);
		setDataSearch(appState.searchStation.overall);
	};

	const onValueChanged = (e) => {
		let initDate = new Date(e.value[0]);
		let endDate = new Date(e.value[1]);
		//setChartYear(initDate.getFullYear());
		setChart(initDate, endDate);
		// console.log(initDate.getFullYear() + " " + endDate.getFullYear());
	};

	const handleToggleChange = (e) => {
		if (appState.searchStation.isSet) {
			console.log('isSet');
		}

		setChecked((prevState) => {
			console.log('toggle Overal Panel: ' + secondAxis + ' ' + e);
			appDispatch({
				type: 'toggleSecondAxis',
				valueToggle: !prevState,
			});
			return !prevState;
		});
	};

	function getDistance() {
		console.log(appState.searchStation.longitude);
		let from = turf.point([
			Number(appState.searchStation.longitude),
			Number(appState.searchStation.latitude),
		]);
		let to = turf.point(appState.stationData.lngLat);
		let options = { units: 'kilometers' };
		// @ts-ignore
		let distance = turf.distance(from, to, options);
		return distance;
	}

	function formatName(value) {
		if (value === undefined) {
			return '';
		}

		const nameSplit = value.split('_');
		let name =
			getDistance().toFixed(1) +
			' Km to ' +
			nameSplit[2] +
			' ' +
			nameSplit[3];

		return name;
	}

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title
					id="contained-modal-title-vcenter"
					className="text-center"
				>
					{appState.stationData.name}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="text-center"></Modal.Body>

			<Tabs
				id="chart-main-tab"
				activeKey={key}
				onSelect={(k) => setKey(k)}
				className="mb-3"
			>
				<Tab eventKey="home" title="Overall Series">
					<div
						style={{
							textAlign: 'left',
							fontSize: '0.875rem',
							fontWeight: '600',
							width: '100%',
							marginLeft: '30px',
							color: '#9c27b0',
						}}
					>
						Compare Stations{' '}
						<Switch
							color="secondary"
							checked={secondAxis}
							onChange={handleToggleChange}
							inputProps={{ 'aria-label': 'controlled' }}
						/>{' '}
						River: {formatName(appState.searchStation.name)}
					</div>
					<ChartOverall
						extraData={chartDataOverall}
						yearData={appState.yearData}
					/>
				</Tab>
				<Tab eventKey="profile" title="Date Selection Series">
					<ChartSelection chartData={chartData} />
					<div className="dx-field">
						<div className="dx-field-label">
							Click on calendar icon to select dates
						</div>
						<div className="dx-field-value">
							<DateRangeBox
								displayFormat="shortdate"
								defaultStartDate={appState.yearStart}
								defaultEndDate={appState.yearEnd}
								min={appState.yearStart}
								max={appState.yearEnd}
								{...commonSettings}
								onValueChanged={onValueChanged}
							/>
						</div>
					</div>
				</Tab>
				<Tab eventKey="search" title="Search Stations">
					<div className="containerM">
						<div className="columnM">
							<SearchComponent
								onSearch={props.searchChangeHandler}
								getSearchStation={setSearchStationData}
							/>
						</div>
						<div className="columnN">
							<ChartSearch
								dataChartOverall={chartDataSearch}
								yearData={appState.yearData}
							/>
						</div>
					</div>
				</Tab>
			</Tabs>
			<Modal.Footer>{appState.extraData._prodCitation}</Modal.Footer>
		</Modal>
	);
};

export default ModalChart;
