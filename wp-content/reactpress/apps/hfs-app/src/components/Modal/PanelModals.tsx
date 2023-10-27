/** @format */

import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import './styles.css';
import FilterPanel from '../Panels/FilterPanel';
import SearchPanel from '../Panels/SearchPanel';
import TimelinePanel from '../Panels/TimelinePanel';
import { panelStyle } from '../Utils/sytles';

interface Station {
	name: string;
	last_update: string;
	start_date: string;
	basin: string;
	anomaly: number;
	value: number;
	change: number;
	river: string;
	lat: number;
	lon: number;
	sat: string;
}

interface PanelModalsProp {
	flyTo(coord: [long: number, lat: number]): void;
}

export default function PanelModals(props: PanelModalsProp) {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);
	const [listLoaded, setListLoaded] = useState(false);

	/* 	useEffect(() => {
		const list = createStationList(appState.stationFeatures.features);
		appDispatch({
			type: 'setStationList',
			value: list,
		});
		const lastUpdated = filterUpdatedLastStations(
			list,
			appState.timelineDayLimit
		);
		appDispatch({
			type: 'setLastUpdated',
			value: lastUpdated,
		});
		setListLoaded(true);
	}, [appState.timeline]); */

	const createStationList = (features) => {
		const newArray: Station[] = features.map((item) => {
			return {
				'name': item.properties.name,
				'last_update': item.properties.e_date,
				'start_date': item.properties.s_date,
				'basin': item.properties.basin,
				'anomaly': item.properties.anomalia,
				'value': item.properties.value,
				'change': item.properties.change,
				'river': item.properties.river,
				'lat': item.properties.lat,
				'lon': item.properties.long,
				'sat': item.properties.sat,
			};
		});

		return newArray;
	};

	const filterUpdatedLastStations = (
		stationList: Station[],
		days: number
	): Station[] => {
		const result: Station[] = stationList.filter((station) => {
			const dateString: string = station.last_update;
			const dateFormatted: Date = new Date(dateString);
			const dateNow: Date = new Date();
			const differenceMiliseconds: number =
				Number(dateNow) - Number(dateFormatted);
			const differenceinDays: number =
				differenceMiliseconds / (1000 * 60 * 60 * 24);
			return differenceinDays <= days;
		});
		result.sort((a, b) => {
			const dateA = new Date(a.last_update);
			const dateB = new Date(b.last_update);
			return Number(dateB) - Number(dateA);
		});
		console.log(result);
		return result;
	};

	const panelTimeline = (
		<Box sx={{ zIndex: 10, ...panelStyle, padding: '1px' }}>
			<TimelinePanel flyTo={props.flyTo} listLoaded={listLoaded} />
		</Box>
	);

	const filters = (
		<Box sx={panelStyle}>
			<FilterPanel />
		</Box>
	);

	const search = (
		<Box sx={{ zIndex: 10, ...panelStyle }}>
			<SearchPanel flyTo={props.flyTo} />
		</Box>
	);

	return (
		<div
			style={{
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				display: 'flex',
				height: window.innerHeight - 178,
				paddingLeft: '10px',
				paddingRight: '10px',
			}}
		>
			<Grid
				container
				spacing={1}
				sx={{
					backgroundColor: '#44414d',
				}}
			>
				<Grid item xs={4}>
					<Slide
						direction="right"
						in={appState.modals.projects}
						mountOnEnter
						unmountOnExit
					>
						{panelTimeline}
					</Slide>
				</Grid>
				<Grid item xs={4}>
					<Slide
						direction="down"
						in={appState.modals.search}
						mountOnEnter
						unmountOnExit
					>
						{search}
					</Slide>
				</Grid>
				<Grid item xs={4}>
					<Slide
						direction="left"
						in={appState.modals.select}
						mountOnEnter
						unmountOnExit
					>
						{filters}
					</Slide>
				</Grid>
			</Grid>
		</div>
	);
}
