/** @format */

import React from 'react';
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
	Subtitle,
	Font,
	Legend,
	Label,
	Tooltip,
} from 'devextreme-react/chart';
import StateContext from '../../StateContext';
import { useContext } from 'react';
import * as turf from '@turf/turf';
import './chart.css';

const ChartSearch = function (props) {
	const appState = useContext(StateContext);

	function onLegendClick(e) {
		e.target.isVisible() ? e.target.hide() : e.target.show();
	}

	function getDistance() {
		console.log(appState.searchStation.longitude);
		let from = turf.point([
			Number(appState.searchStation.longitude),
			Number(appState.searchStation.latitude),
		]);
		let to = turf.point(appState.stationData.lngLat);
		let options = { units: 'kilometers' };
		let distance = turf.distance(from, to, options);
		return distance;
	}

	return (
		<div id="chart-series">
			<Chart id="chart3" dataSource={appState.searchStation.overall}>
				<CommonSeriesSettings type="spline" argumentField="date">
					<Point visible={false}></Point>
				</CommonSeriesSettings>
				<Crosshair enabled={true}>
					<Label visible={true} />
				</Crosshair>

				<Series
					valueField="valueMax"
					name={'Max ' + appState.searchStation.yearMax}
					color="#4c9c75"
				/>
				<Series
					valueField="valueMin"
					name={'Min ' + appState.searchStation.yearMin}
					color="#dfd447"
				/>
				<Series
					valueField="valueMen"
					name="Median"
					dashStyle="dot"
					width={4}
				/>
				<Series
					color="#b0daff"
					type="rangeArea"
					rangeValue1Field="valueHigh"
					rangeValue2Field="valueLow"
					name="Median High-Low"
				/>
				<Series
					valueField="valueCur"
					name={new Date().getFullYear()}
					color="#c72729"
					width={3}
				>
					<Point visibility={true} visible={true} />
				</Series>

				<Margin right={10} />
				<ArgumentAxis
					valueMarginsEnabled={false}
					aggregationInterval={'month'}
					argumentType="datetime"
					tickInterval={'month'}
				>
					<Label displayMode="rotate" rotationAngle={70} />
				</ArgumentAxis>
				<ValueAxis
					name="level"
					valueMarginsEnabled={true}
					minValueMargin={0.08}
				>
					<Label>
						<Font color="#6b6b76" />
					</Label>
				</ValueAxis>

				<Legend
					verticalAlignment="bottom"
					horizontalAlignment="center"
				></Legend>
				<Title text={appState.searchStation.name} margin={20}>
					<Font color="#1976d2" size={'0.875rem'} />
					<Subtitle
						text={
							' Latitude/Longitude: ' +
							appState.searchStation.latitude +
							' ,' +
							appState.searchStation.longitude +
							' \n' +
							(appState.setSearchStation
								? getDistance().toFixed(1)
								: '0') +
							' Kms to ' +
							appState.stationData.name.slice(2)
						}
					>
						<Font color="black" size={'0.875rem'} />
					</Subtitle>
				</Title>
				<Tooltip enabled={false} />
				<Export enabled={true} />
			</Chart>
			<div className="chart-title">
				Last Update: {appState.searchStation.lastUpdate}{' '}
			</div>
		</div>
	);
};

export default ChartSearch;
