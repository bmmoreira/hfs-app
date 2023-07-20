/** @format */

import React from 'react';
import Chart, {
	CommonSeriesSettings,
	Series,
	Aggregation,
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
	Tooltip,
} from 'devextreme-react/chart';

import './chart.css';

const ChartE = function (props) {
	function onLegendClick(e) {
		e.target.isVisible() ? e.target.hide() : e.target.show();
	}

	return (
		<div id="chart-demo">
			<Chart id="chart" dataSource={props.chartData}>
				<CommonSeriesSettings argumentField="date" />
				<Crosshair enabled={true}>
					<Label visible={true} />
				</Crosshair>
				<Series
					axis="temperature"
					color="#59bbec"
					type="rangearea"
					rangeValue1Field="lv"
					rangeValue2Field="hv"
					name="Uncertainty"
					hoverMode="none"
				></Series>
				<Series
					axis="temperature"
					color="#4945ff"
					valueField="height"
					name="Water Level"
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
					<Label displayMode="rotate" rotationAngle={45} />
				</ArgumentAxis>
				<ValueAxis name="temperature">
					<Title text="Water Level, (m)">
						<Font color="#4945ff" />
					</Title>
					<Label>
						<Font color="#6b6b76" />
					</Label>
				</ValueAxis>

				<Legend
					verticalAlignment="bottom"
					horizontalAlignment="center"
				></Legend>
				<Tooltip
					enabled={true}
					customizeTooltip={customizeTooltip}
					zIndex={9999}
				/>
				<Title text="Orthometric Height(m) of Water Surface" />
				<Export enabled={true} />
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

export default ChartE;
