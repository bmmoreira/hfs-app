/** @format */

export const aggregationIntervals = [
	{ displayName: "One week", interval: "week" },
	{ displayName: "Two weeks", interval: { weeks: 2 } },
	{ displayName: "Month", interval: "month" },
];

export const aggregationFunctions = [
	{ displayName: "Average", func: "avg" },
	{ displayName: "Minimum", func: "min" },
	{ displayName: "Maximum", func: "max" },
];

export const weatherData = [
	{ date: "2023-01-01", valueCur: 93.2 },
	{
		men: 92.939,
		hv: 93.456,
		lv: 92.474,
		date: "2023-01-01",
	},
	{ date: "2023-01-04", valueMax: 93.23 },

	{ date: "2023-01-17", valueMin: 92.67 },
	{ date: "2023-01-28", valueCur: 93.39 },
	{ date: "2023-01-31", valueMax: 92.59 },
	{ date: "2023-02-13", valueMin: 92.29 },
	{
		men: 92.939,
		hv: 93.456,
		lv: 92.474,
		date: "2023-02-15",
	},
	{ date: "2023-02-24", valueCur: 92.96 },
	{ date: "2023-02-27", valueMax: 92.42 },
	{ date: "2023-03-11", valueMin: 92.01 },
	{
		men: 92.689,
		hv: 93.617,
		lv: 92.124,
		month: "2023-03-15",
	},
	{ date: "2023-03-23", valueCur: 92.77 },

	{ date: "2023-03-26", valueMax: 92.12 },
	{
		men: 94.382,
		hv: 96.257,
		lv: 91.95,
		date: "2023-04-15",
	},
	{ date: "2023-04-19", valueCur: 92.92 },

	{ date: "2023-05-04", valueMin: 91.95 },
	{
		men: 96.723,
		hv: 99.332,
		lv: 94.953,
		date: "2023-05-15",
	},
	{ date: "2023-05-16", valueCur: 94.29 },
	{ date: "2023-05-19", valueMax: 93.41 },
	{ date: "2023-05-31", valueMin: 96.27 },
	{ date: "2023-06-12", valueCur: 94.38 },
	{ date: "2023-06-15", valueMax: 99.35 },
	{
		men: 95.482,
		hv: 96.489,
		lv: 94.165,
		date: "2023-06-15",
	},
	{ date: "2023-06-27", valueMin: 96.59 },
	{ date: "2023-07-12", valueMax: 94.15 },
	{
		men: 94.677,
		hv: 95.765,
		lv: 93.707,
		date: "2023-07-15",
	},
	{ date: "2023-08-08", valueMax: 95.77 },
	{
		men: 93.675,
		hv: 94.304,
		lv: 93.15,
		date: "2023-08-15",
	},
	{ date: "2023-08-20", valueMin: 94.98 },
	{ date: "2023-09-04", valueMax: 93.34 },
	{
		men: 93.379,
		hv: 94.201,
		lv: 92.6235,
		date: "2023-09-15",
	},

	{ date: "2023-09-16", valueMin: 93.45 },
	{ date: "2023-10-01", valueMax: 93.93 },
	{ date: "2023-10-13", valueMin: 92.87 },
	{
		men: 93.846,
		hv: 95.44,
		lv: 92.57,
		date: "2023-10-15",
	},
	{ date: "2023-10-28", valueMax: 92.63 },
	{ date: "2023-11-09", valueMin: 94.75 },
	{
		men: 93.716,
		hv: 95.646,
		lv: 92.669,
		date: "2023-11-15",
	},
	{ date: "2023-11-24", valueMax: 92.57 },
	{ date: "2023-12-06", valueMin: 94.21 },
	{
		men: 93.716,
		hv: 95.646,
		lv: 92.669,
		date: "2023-12-15",
	},
	{ date: "2023-12-21", valueMax: 93.99 },
];

export const intervalLabel = { "aria-label": "Interval" };
export const functionLabel = { "aria-label": "Function" };
