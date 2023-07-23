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
	Font,
	Legend,
	Label,
	Tooltip,
} from 'devextreme-react/chart';
import StateContext from '../../StateContext';
import { useContext } from 'react';
import './chart.css';

const ChartSearch = function (props) {
	const appState = useContext(StateContext);

	function onLegendClick(e) {
		e.target.isVisible() ? e.target.hide() : e.target.show();
	}

	return (
		<div id="chart-series">
			<Chart id="chart3" dataSource={props.dataChartOverall}>
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
					minValueMargin={0.1}
				>
					<Label>
						<Font color="#6b6b76" />
					</Label>
				</ValueAxis>

				<Legend
					verticalAlignment="bottom"
					horizontalAlignment="center"
				></Legend>
				<Tooltip enabled={false} />
				<Export enabled={true} />
			</Chart>
		</div>
	);
};

export default ChartSearch;
