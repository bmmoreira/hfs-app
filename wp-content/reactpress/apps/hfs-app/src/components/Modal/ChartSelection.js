/** @format */

import React, { useState } from 'react';
import Chart, {
	CommonSeriesSettings,
	Series,
	Crosshair,
	ValueErrorBar,
	Export,
	Point,
	Margin,
	ArgumentAxis,
	ValueAxis,
	Title,
	Font,
	Legend,
	Label,
	Border,
	ZoomAndPan,
	ScrollBar,
	Tooltip,
} from 'devextreme-react/chart';
import RangeSelector, {
	Size,
	Chart as ChartOptions,
	Margin2,
	Scale,
	Behavior,
} from 'devextreme-react/range-selector';
import StateContext from '../../StateContext';
import { useContext } from 'react';
import './chart.css';

const ChartSelection = function (props) {
	const appState = useContext(StateContext);

	function onLegendClick(e) {
		e.target.isVisible() ? e.target.hide() : e.target.show();
	}

	function formatName(value) {
		if (value === undefined) {
			return '';
		}

		const nameSplit = value.split('_');
		let name = nameSplit[2].substring(0, 2) + '... ' + nameSplit[3];

		return name;
	}

	return (
		<div id="chart-demo">
			<Chart id="chart2" dataSource={appState.chartSelection}>
				<CommonSeriesSettings argumentField="date" />
				<ScrollBar visible={true} />
				<ZoomAndPan argumentAxis="both" />
				<Crosshair enabled={true}>
					<Label visible={true} />
				</Crosshair>
				<Series
					axis="waterlevel"
					color="#59bbec"
					type="rangearea"
					rangeValue1Field="lv"
					rangeValue2Field="hv"
					name="Uncertainty"
					hoverMode="none"
				></Series>

				{appState.secondAxisSelection &&
					appState.compareStationSelection && (
						<Series
							axis="waterlevel"
							valueField="height2"
							name={formatName(appState.searchStation.name)}
							color="#9c27b0"
							width={3}
						>
							<Point size={6} />
						</Series>
					)}
				{appState.compareStationSelection &&
					!appState.secondAxisSelection && (
						<Series
							axis="waterlevel2"
							valueField="height2"
							name={formatName(appState.searchStation.name)}
							color="#9c27b0"
							width={3}
						>
							<Point size={6} />
						</Series>
					)}

				<Series
					axis="waterlevel"
					color="#4945ff"
					valueField="height"
					name={formatName(appState.stationData.name)}
				>
					<ValueErrorBar
						lowValueField="lv"
						highValueField="hv"
						lineWidth={2}
						opacity={0.8}
						hoverMode="none"
					/>
					<Point size={10} />
				</Series>
				<Margin right={20} />
				<ArgumentAxis
					valueMarginsEnabled={false}
					aggregationInterval={'month'}
					argumentType="datetime"
					tickInterval={'month'}
				>
					<Label displayMode="rotate" rotationAngle={30} />
				</ArgumentAxis>
				<ValueAxis name="waterlevel">
					<Title text="Water Level, (m)">
						<Font color="#4945ff" />
					</Title>
					<Label>
						<Font color="#6b6b76" />
					</Label>
				</ValueAxis>
				{!appState.secondAxisSelection && (
					<ValueAxis name="waterlevel2" position="right">
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
				<Tooltip
					enabled={true}
					customizeTooltip={customizeTooltip}
					zIndex={9999}
				/>
				<Legend position="inside">
					<Border visible={true} />
				</Legend>
			</Chart>
		</div>
	);
};

function customizeTooltip(pointInfo) {
	const uncertainty =
		Number(pointInfo.value) - Number(pointInfo.lowErrorValue);
	const handlers = {
		'Water Level': (arg) => ({
			text: `<div>Water Level: ${
				pointInfo.value
			} <br> Uncertainty: ${uncertainty.toFixed(2)}
			</div>`,
		}),
	};

	return handlers[pointInfo.seriesName](pointInfo);
}

export default ChartSelection;
