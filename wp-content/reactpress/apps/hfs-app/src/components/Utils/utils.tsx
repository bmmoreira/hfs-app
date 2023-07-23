/** @format */

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
