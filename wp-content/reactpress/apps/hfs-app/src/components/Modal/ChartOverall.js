/** @format */

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Chart, {
	CommonSeriesSettings,
	Series,
	Crosshair,
	Export,
	Point,
	Margin,
	ArgumentAxis,
	ValueAxis,
	Title,
	Font,
	Legend,
	Label,
	Tooltip,
} from 'devextreme-react/chart';
import Button from 'devextreme-react/button';
import StateContext from '../../StateContext';
import { useContext } from 'react';
import './chart.css';

const ChartOverall = forwardRef((props, ref) => {
	useImperativeHandle(ref, () => ({
		log() {
			console.log('child function');
			chartRef.current.instance.exportTo('chat-overall', 'png');
		},
	}));

	const chartRef = useRef();

	const appState = useContext(StateContext);

	function onLegendClick(e) {
		e.target.isVisible() ? e.target.hide() : e.target.show();
	}

	function formatName(value) {
		if (value === undefined) {
			return '';
		}

		const nameSplit = value.split('_');
		let name = nameSplit[2] + ' ' + nameSplit[3];

		return name;
	}

	return (
		<div id="chart-series">
			<Chart ref={chartRef} id="chart1" dataSource={appState.chartOverall}>
				<CommonSeriesSettings
					type="spline"
					argumentField="date"
				></CommonSeriesSettings>
				<Crosshair enabled={true}>
					<Label visible={true} />
				</Crosshair>
				<Series
					axis="level1"
					color="#b0daff"
					type="rangeArea"
					rangeValue1Field="valueHigh"
					rangeValue2Field="valueLow"
					name="Median High-Low"
				/>
				<Series
					axis="level1"
					valueField="valueMax"
					name={'Max ' + appState.yearMax}
					color="#4c9c75"
				>
					<Point size={5} />
				</Series>
				<Series
					axis="level1"
					valueField="valueMin"
					name={'Min ' + appState.yearMin}
					color="#dfd447"
				>
					<Point size={5} />
				</Series>

				<Series
					axis="level1"
					valueField="valueCur"
					name={new Date().getFullYear()}
					color="#c72729"
					width={3}
				>
					<Point size={7} />
				</Series>
				{appState.secondAxisOverall && appState.compareStationOverall && (
					<Series
						axis="level1"
						valueField="valueCur2"
						name={new Date().getFullYear()}
						color="#9c27b0"
						width={4}
					>
						<Point size={7} />
					</Series>
				)}
				{appState.compareStationOverall && !appState.secondAxisOverall && (
					<Series
						axis="level2"
						valueField="valueCur2"
						name={new Date().getFullYear()}
						color="#9c27b0"
						width={4}
					>
						<Point size={7} />
					</Series>
				)}
				<Margin right={10} />
				<ArgumentAxis
					valueMarginsEnabled={false}
					aggregationInterval={'month'}
					argumentType="datetime"
					tickInterval={'month'}
				>
					<Label displayMode="rotate" rotationAngle={45} />
				</ArgumentAxis>
				<ValueAxis name="level1">
					<Title text="Water Level, (m)">
						<Font color="#c72729" />
					</Title>
					<Label>
						<Font color="#c72729" />
					</Label>
				</ValueAxis>
				{!appState.secondAxisOverall && (
					<ValueAxis name="level2" position="right">
						<Title
							text={
								'Water Level, (m) \n' +
								formatName(appState.searchStation.name)
							}
						>
							<Font color="#9c27b0" />
						</Title>
						<Label>
							<Font color="#9c27b0" />
						</Label>
					</ValueAxis>
				)}

				<Legend
					verticalAlignment="bottom"
					horizontalAlignment="center"
				></Legend>
				<Tooltip enabled={false} />
			</Chart>
		</div>
	);
});

export default ChartOverall;
