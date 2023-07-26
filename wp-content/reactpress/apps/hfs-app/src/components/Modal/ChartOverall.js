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
	Font,
	Legend,
	Label,
	Tooltip,
} from 'devextreme-react/chart';
import StateContext from '../../StateContext';
import { useContext } from 'react';
import './chart.css';

const ChartOverall = function (props) {
	const appState = useContext(StateContext);

	const customTitleStyle = {
		fontSize: 12,
	};

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
			<Chart id="chart2" dataSource={appState.extraData}>
				<CommonSeriesSettings
					type="spline"
					argumentField="date"
				></CommonSeriesSettings>
				<Crosshair enabled={true}>
					<Label visible={true} />
				</Crosshair>

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
					color="#b0daff"
					type="rangeArea"
					rangeValue1Field="valueHigh"
					rangeValue2Field="valueLow"
					name="Median High-Low"
				/>
				<Series
					axis="level1"
					valueField="valueCur"
					name={new Date().getFullYear()}
					color="#c72729"
					width={3}
				>
					<Point size={7} />
				</Series>
				{appState.showSecondAxis && (
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
				<ValueAxis
					name="level1"
					valueMarginsEnabled={true}
					minValueMargin={0.1}
				>
					<Title text="Water Level, (m)">
						<Font color="#c72729" />
					</Title>
					<Label>
						<Font color="#c72729" />
					</Label>
				</ValueAxis>
				{appState.showSecondAxis && (
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
				<Title text="Orthometric Height(m) of Water Surface">
					<Font color="black" size={'1rem'} />
				</Title>
				<Export enabled={true} />
			</Chart>
		</div>
	);
};

export default ChartOverall;
