/** @format */
import React, { useRef } from 'react';
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
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from 'devextreme-react/button';
import Chip from '@mui/material/Chip';

interface ChartProps {
	//stationObj: Station | undefined;
	show: boolean;
	onHide(): void;
	searchChangeHandler(type: string, value: string): void;
	getSearchStation(value: string): void;
}

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

const ModalChart = function (props: ChartProps) {
	const modalRef = useRef();
	const appDispatch = useContext(DispatchContext);
	const [key, setKey] = useState('home');

	const appState = useContext(StateContext);
	const [chartOverall, setOverallData] = useState(appState.chartOverall);
	const [chartDataSearch, setDataSearch] = useState(appState.chartOverall);
	const [secondAxisOverall, setSecondAxisOverall] = useState(
		appState.secondAxisOverall
	);
	const [secondAxisSelection, setSecondAxisSelection] = useState(
		appState.secondAxisOverall
	);
	const [compareStationsOverall, setCompareStationsOverall] = useState(
		appState.compareStationsOverall
	);
	const [compareStationsSelection, setCompareStationsSelection] = useState(
		appState.compareStationsSelection
	);

	const commonSettings = {
		showClearButton: false,
		useMaskBehavior: true,
		openOnFieldClick: true,
	};
	const msInDay = 1000 * 60 * 60 * 24;
	const now = new Date();
	const startDate = new Date(now.getTime() - msInDay * 3);
	const endDate = new Date(now.getTime() + msInDay * 3);

	function setChart(initValue, endValue) {
		const result = appState.chartSelection.filter((value) => {
			let initDate = new Date(initValue);
			let endDate = new Date(endValue);
			let valueDate = new Date(value.dateString);
			return valueDate >= initDate && valueDate <= endDate;
		});
		// console.log(result);
		//setChartData(result);
		appDispatch({
			type: 'setChartSelection',
			valueSelection: result,
		});
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

		setCompareStationsOverall((prevState) => {
			console.log('toggle Overall Panel: ' + secondAxisOverall + ' ' + e);
			appDispatch({
				type: 'toggleCompareStationOverall',
				valueToggle: !prevState,
			});
			return !prevState;
		});
	};

	const toggleSelection = (e) => {
		if (appState.searchStation.isSet) {
			console.log('isSet');
		}

		setCompareStationsSelection((prevState) => {
			console.log(
				'toggle Overall Panel: ' + secondAxisSelection + ' ' + e
			);
			appDispatch({
				type: 'toggleCompareStationSelection',
				valueToggle: !prevState,
			});
			return !prevState;
		});
	};

	const handleCheckBoxChange = (e) => {
		if (appState.searchStation.isSet) {
			console.log('isSet');
		}
		setSecondAxisOverall((prevState) => {
			console.log('toggle Overall Panel: ' + secondAxisOverall + ' ' + e);
			appDispatch({
				type: 'toggleSecondAxisOverall',
				valueToggle: !prevState,
			});
			return !prevState;
		});
	};

	const checkBoxSelection = (e) => {
		if (appState.searchStation.isSet) {
			console.log('isSet');
		}
		setSecondAxisSelection((prevState) => {
			console.log(
				'toggle Selection Panel: ' + secondAxisSelection + ' ' + e
			);
			appDispatch({
				type: 'toggleSecondAxisSelection',
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
			<Modal.Body className="chart-modal-body"></Modal.Body>

			<Tabs
				id="chart-main-tab"
				activeKey={key}
				onSelect={(k) => setKey(k)}
				className="mb-3 chart-modal-tabs"
			>
				<Tab eventKey="home" title="Overall Series">
					<Box
						sx={{
							height: 50,
							fontSize: '0.75rem',
							marginLeft: '30px',
							marginRight: '30px',
							color: '#9c27b0',
							fontWeight: '600',
						}}
					>
						<Grid container spacing={1}>
							<Grid item xs={3.2} md={3.2}>
								<Chip label="Compare Stations" variant="outlined" />
								<Switch
									color="secondary"
									checked={compareStationsOverall}
									onChange={handleToggleChange}
									inputProps={{ 'aria-label': 'controlled' }}
								/>
							</Grid>
							<Grid item xs={4.2} md={4.2} sx={{ alignSelf: 'center' }}>
								{formatName(appState.searchStation.name)}
							</Grid>
							<Grid item xs={2.8} md={2.8} sx={{ alignSelf: 'center' }}>
								<Chip label="Use same Scale" variant="outlined" />
								<Checkbox
									color="secondary"
									checked={secondAxisOverall}
									onChange={handleCheckBoxChange}
									inputProps={{ 'aria-label': 'controlled' }}
								/>
							</Grid>
							<Grid item xs={1.8} md={1.8} sx={{ alignSelf: 'center' }}>
								<div id="buttonGroup">
									<Button
										icon="export"
										text="Save"
										// @ts-ignore
										onClick={() => modalRef.current.log()}
									/>
								</div>
							</Grid>
						</Grid>
					</Box>

					<ChartOverall ref={modalRef} />
				</Tab>
				<Tab eventKey="profile" title="Date Selection Series">
					<Box
						sx={{
							height: 50,
							fontSize: '0.875rem',
							marginLeft: '30px',
							marginRight: '30px',
							color: '#9c27b0',
							fontWeight: '600',
						}}
					>
						<Grid container spacing={1}>
							<Grid item xs={3.5} md={3.5}>
								Compare Stations{' '}
								<Switch
									color="secondary"
									checked={compareStationsSelection}
									onChange={toggleSelection}
									inputProps={{ 'aria-label': 'controlled' }}
								/>
							</Grid>
							<Grid item xs={5.5} md={5.5} sx={{ alignSelf: 'center' }}>
								{formatName(appState.searchStation.name)}
							</Grid>
							<Grid item xs={3} md={3} sx={{ alignSelf: 'center' }}>
								Use Same Scale
								<Checkbox
									color="secondary"
									checked={secondAxisSelection}
									onChange={checkBoxSelection}
									inputProps={{ 'aria-label': 'controlled' }}
								/>
							</Grid>
						</Grid>
					</Box>
					<ChartSelection chartData={appState.chartSelection} />
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
			<Modal.Footer></Modal.Footer>
		</Modal>
	);
};

export default ModalChart;
