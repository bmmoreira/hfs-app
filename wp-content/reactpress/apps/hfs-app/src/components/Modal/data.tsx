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
	{
		height: 696.05,
		uncertainty: 0.02,
		hv: 696.07,
		lv: 696.03,
		date: "2019-1-5",
	},
	{
		height: 696.37,
		uncertainty: 0.01,
		hv: 696.38,
		lv: 696.36,
		date: "2019-2-1",
	},
	{
		height: 696.26,
		uncertainty: 0.12,
		hv: 696.38,
		lv: 696.14,
		date: "2019-2-28",
	},
	{
		height: 696.47,
		uncertainty: 0.18,
		hv: 696.65,
		lv: 696.29,
		date: "2019-3-27",
	},
	{
		height: 696.29,
		uncertainty: 0.03,
		hv: 696.32,
		lv: 696.26,
		date: "2019-5-20",
	},
	{
		height: 695.55,
		uncertainty: 0.04,
		hv: 695.51,
		lv: 695.59,
		date: "2019-6-16",
	},
	{
		height: 695.7,
		uncertainty: 0.1,
		hv: 695.71,
		lv: 695.7,
		date: "2019-7-13",
	},
	{
		height: 696.07,
		uncertainty: 0.05,
		hv: 696.12,
		lv: 696.02,
		date: "2019-8-9",
	},
	{
		height: 696.09,
		uncertainty: 0.15,
		hv: 696.24,
		lv: 695.97,
		date: "2019-9-5",
	},
	{
		height: 696.13,
		uncertainty: 0.15,
		hv: 696.28,
		lv: 695.98,
		date: "2019-10-2",
	},
	{
		height: 695.79,
		uncertainty: 0.03,
		hv: 695.82,
		lv: 695.76,
		date: "2019-10-29",
	},
	{
		height: 695.95,
		uncertainty: 0.03,
		hv: 695.98,
		lv: 695.92,
		date: "2019-11-25",
	},
];

export const intervalLabel = { "aria-label": "Interval" };
export const functionLabel = { "aria-label": "Function" };
