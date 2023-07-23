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

	function onLegendClick(e) {
		e.target.isVisible() ? e.target.hide() : e.target.show();
	}

	return (
		<div id="chart-series">
			<Chart id="chart2" dataSource={props.extraData}>
				<CommonSeriesSettings type="spline" argumentField="date">
					<Point visible={false}></Point>
				</CommonSeriesSettings>
				<Crosshair enabled={true}>
					<Label visible={true} />
				</Crosshair>

				<Series
					valueField="valueMax"
					name={'Max ' + appState.yearMax}
					color="#4c9c75"
				/>
				<Series
					valueField="valueMin"
					name={'Min ' + appState.yearMin}
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
					width={4}
				>
					<Point visibility={true} visible={true} />
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
				<ValueAxis
					name="level"
					valueMarginsEnabled={true}
					minValueMargin={0.1}
				>
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
				<Tooltip enabled={false} />
				<Title text="👪 Orthometric Height(m) of Water Surface" />
				<Export enabled={true} />
			</Chart>
		</div>
	);
};

export default ChartOverall;
