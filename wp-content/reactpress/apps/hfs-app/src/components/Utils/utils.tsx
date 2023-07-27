/** @format */
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import { useContext } from 'react';

const appDispatch = useContext(DispatchContext);
const appState = useContext(StateContext);

export function formatDataSet(response) {
	const dataset = response[0].attributes;

	const chartData = new Array();
	console.log(dataset);

	let max = dataset.overall.maxData;
	let min = max.concat(dataset.overall.minData);
	let men = min.concat(dataset.overall.men);
	let cur = men.concat(dataset.overall.curData);
	let overall = cur;
	overall.sort(function (a, b) {
		return a.dateTime - b.dateTime;
	});

	dataset.data._dataSet.forEach((value) => {
		let dateObject = new Date(value.date);
		let month = dateObject.getUTCMonth() + 1; //months from 1-12
		let day = dateObject.getUTCDate();
		let year = dateObject.getUTCFullYear();

		chartData.push({
			height: Number(value.height),
			uncertainty: Number(value.ncertainty),
			hv: Number(value.height) + Math.abs(value.uncertainty),
			lv: Number(value.height) - Math.abs(value.uncertainty),
			date: year + '-' + month + '-' + day,
			dateString: value.date,
		});
	});
}

function separateDataByYear(dataset, dateProperty) {
	var separatedData = {};
	console.log(dataset);
	let lowerValue = 0;
	let higherValue = 0;
	let higherValueYear = 0;
	let lowerValueYear = 0;
	let lastYear = 0;
	let currentYearData = new Array();

	dataset.forEach(function (item) {
		let date = new Date(item[dateProperty]);
		let year = date.getFullYear();

		if (lowerValue == 0) {
			lowerValue = item.orthometric_height_of_water;
		}

		if (item.orthometric_height_of_water > Number(higherValue)) {
			higherValue = item.orthometric_height_of_water;
			higherValueYear = year;
		}

		if (item.orthometric_height_of_water < Number(lowerValue)) {
			lowerValue = item.orthometric_height_of_water;
			lowerValueYear = year;
		}

		if (year > lastYear) {
			lastYear = year;
		}

		if (!separatedData.hasOwnProperty(year)) {
			separatedData[year] = [];
		}

		separatedData[year].push(item);
	});

	separatedData[lastYear].forEach((item) => {
		currentYearData.push({
			date: new Date(item.date),
			valueCur: item.orthometric_height_of_water,
			uncertainty: item.associated_uncertainty,
		});
	});

	appDispatch({
		type: 'reduceOverall',
		infoYears: {
			hValue: higherValue,
			hValueYear: higherValueYear,
			lValue: lowerValue,
			lValueYear: lowerValueYear,
			currentYear: currentYearData,
			cValueYear: lastYear,
		},
		infoData: separatedData,
	});
	console.log(higherValue + ' ' + higherValueYear);
	console.log(lowerValue + ' ' + lowerValueYear);
	return currentYearData;
}
