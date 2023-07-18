/** @format */
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import DispatchContext from '../../DispatchContext';
import StateContext from '../../StateContext';
import { useState, useEffect, useContext } from 'react';
import { useImmer } from 'use-immer';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ChartE from './Chart';
import ChartS from './ChartS';

import DateRangeBox from 'devextreme-react/date-range-box';
import 'devextreme/dist/css/dx.light.css';
import './modalchart.css';
import { weatherData } from './data';

interface ChartProps {
	//stationObj: Station | undefined;
	show: boolean;
	onHide(): void;
}

const ModalChart = function (props: ChartProps) {
	const appDispatch = useContext(DispatchContext);
	const [key, setKey] = useState('home');

	const appState = useContext(StateContext);
	const [chartData, setChartData] = useState(appState.chartData);
	const [extraData, setExtraData] = useState(appState.extraData);

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
		setChartYear(2019);
		console.log(appState.extraData);
		return () => {};
	}, []);

	const onValueChanged = (e) => {
		let initDate = new Date(e.value[0]);
		let endDate = new Date(e.value[1]);
		//setChartYear(initDate.getFullYear());
		setChart(initDate, endDate);
		// console.log(initDate.getFullYear() + " " + endDate.getFullYear());
	};

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
					<ChartS extraData={extraData} yearData={appState.yearData} />
				</Tab>
				<Tab eventKey="profile" title="Date Selection Series">
					<ChartE chartData={chartData} />
					<div className="dx-field">
						<div className="dx-field-label">
							Click on calendar icon to select dates
						</div>
						<div className="dx-field-value">
							<DateRangeBox
								displayFormat="shortdate"
								defaultStartDate={startDate}
								defaultEndDate={endDate}
								{...commonSettings}
								onValueChanged={onValueChanged}
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
