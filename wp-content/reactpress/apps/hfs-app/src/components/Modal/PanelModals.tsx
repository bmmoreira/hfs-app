/** @format */

import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import SearchIcon from '@mui/icons-material/Search';
import {
	BootstrapButton,
	Item,
	ItemTitle,
	darkGray,
} from '../Utils/sytles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import MuiInput from '@mui/material/Input';
import './styles.css';

interface Rivers {
	river: string;
}

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

export default function PanelModals(props: any) {
	const style = {
		position: 'relative',
		top: '0px',

		height: window.innerHeight - 200,
		bgcolor: '#dddddd',
		border: '1px solid #000',
		borderRadius: '3px',
		boxShadow: '0 0 5px 5px gray',
		p: 0,
		zIndex: 10,
	};

	const sectionTitle = '0.875rem';

	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);
	const [rivers, setRivers] = useState<Rivers[]>(appState.filteredRivers);

	const marks = [
		{
			value: 0,
			label: 'None',
		},
		{
			value: 2,
			label: '2',
		},
		{
			value: 5,
			label: '5',
		},
		{
			value: 7,
			label: '7',
		},
		{
			value: 15,
			label: '15',
		},
		{
			value: 21,
			label: '21',
		},
	];

	function valuetext(value: number) {
		return `${value} Days`;
	}

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
	}, [appState.timeline]); */

	//const [open, setOpen] = React.useState(appState.modals.timeline);
	//const handleOpen = () => setOpen(true);
	const handleCloseProject = () => {
		//setOpen(false);
		appDispatch({ type: 'closeProjectsModal' });
	};

	const handleCloseSelect = () => {
		//setOpen(false);
		appDispatch({ type: 'closeSelectModal' });
	};

	const handleCloseSearch = () => {
		//setOpen(false);
		appDispatch({ type: 'closeSearchModal' });
		appDispatch({ type: 'toglePanelModal', value: false });
	};

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

	const filterRiver = (filteredArray) => {
		const uniquePropertiesSet = new Set();

		// Extract and filter unique 'name' properties
		const newArray = filteredArray
			.map((item) => {
				if (!uniquePropertiesSet.has(item.properties.river)) {
					uniquePropertiesSet.add(item.properties.river);
					return { 'river': item.properties.river };
				}
				return undefined; // To filter out duplicates
			})
			.filter((item) => item !== undefined);
		return newArray;
	};

	const handleRadioSat = (event: React.ChangeEvent<HTMLInputElement>) => {
		/* appDispatch({
			type: 'selectSat',
			satName: (event.target as HTMLInputElement).value,
		}); */
		appDispatch({
			type: 'setSat',
			value: (event.target as HTMLInputElement).value,
		});
		appDispatch({
			type: 'setFilterSat',
			filterSat: (event.target as HTMLInputElement).value,
		});
		if ((event.target as HTMLInputElement).value == 'All') {
			appDispatch({
				type: 'filterFeatures',
				value: appState.stationFeatures,
			});
		} else {
			console.log('SatPanel ' + (event.target as HTMLInputElement).value);

			const result = appState.stationFeatures.features.filter(
				(feature) => {
					return feature.properties.sat.includes(
						(event.target as HTMLInputElement).value
					);
				}
			);

			const riverResult = filterRiver(result);
			setRivers(riverResult);
			console.log(riverResult);

			appDispatch({
				type: 'filterFeatures',
				value: {
					'type': 'FeatureCollection',
					'name': 'sv',
					'crs': {
						'type': 'name',
						'properties': { 'name': 'urn:ogc:def:crs:OGC:1.3:CRS84' },
					},
					'features': result,
				},
			});
		}
	};

	const handleRadioStation = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		appDispatch({
			type: 'ucAction',
			ucValue: (event.target as HTMLInputElement).value,
		});
		appDispatch({
			type: 'setFilterMeasurament',
			filterMeasurament: (event.target as HTMLInputElement).value,
		});
		console.log('SatPanel ' + (event.target as HTMLInputElement).value);
	};

	const handleRadioTime = (event: React.ChangeEvent<HTMLInputElement>) => {
		if ((event.target as HTMLInputElement).value == 'none') {
			appDispatch({
				type: 'filterFeatures',
				value: appState.stationFeatures,
			});
		} else if (appState.selectedSat == 'vs_All') {
			const days = Number((event.target as HTMLInputElement).value);
			const result = appState.stationFeatures.features.filter(
				(feature) => {
					const dateString = feature.properties.e_date;
					const dateFormatted = new Date(dateString);
					const dateNow = new Date();
					const differenceMiliseconds =
						Number(dateNow) - Number(dateFormatted);
					const differenceinDays =
						differenceMiliseconds / (1000 * 60 * 60 * 24);
					return differenceinDays <= days;
				}
			);
			appDispatch({
				type: 'filterFeatures',
				value: {
					'type': 'FeatureCollection',
					'name': 'sv',
					'crs': {
						'type': 'name',
						'properties': { 'name': 'urn:ogc:def:crs:OGC:1.3:CRS84' },
					},
					'features': result,
				},
			});
		} else {
			const days = Number((event.target as HTMLInputElement).value);
			const result = appState.stationFeatures.features.filter(
				(feature) => {
					const dateString = feature.properties.e_date;
					const dateFormatted = new Date(dateString);
					const dateNow = new Date();
					const differenceMiliseconds =
						Number(dateNow) - Number(dateFormatted);
					const differenceinDays =
						differenceMiliseconds / (1000 * 60 * 60 * 24);
					return (
						differenceinDays <= days &&
						feature.properties.sat.substring.includes(appState.selectedSat)
					);
				}
			);
			appDispatch({
				type: 'filterFeatures',
				value: {
					'type': 'FeatureCollection',
					'name': 'sv',
					'crs': {
						'type': 'name',
						'properties': { 'name': 'urn:ogc:def:crs:OGC:1.3:CRS84' },
					},
					'features': result,
				},
			});
		}
	};

	const handleMaxZoomSlider = (
		event: Event,
		newValue: number | number[]
	) => {
		if (typeof newValue === 'number') {
			appDispatch({
				type: 'setClusterMaxZoom',
				value: newValue as number,
			});
			console.log(newValue);
		}
	};

	const handleClusterRadius = (
		event: Event,
		newValue: number | number[]
	) => {
		if (typeof newValue === 'number') {
			appDispatch({
				type: 'setClusterRadius',
				value: newValue as number,
			});
			console.log(newValue);
		}
	};

	const handleChangeSlider = (
		event: Event,
		newValue: number | number[]
	) => {
		if (typeof newValue === 'number') {
			appDispatch({
				type: 'setFilterTimeDays',
				filterTimeDays: Number((event.target as HTMLInputElement).value),
			});
			if (newValue == 0) {
				appDispatch({
					type: 'filterFeatures',
					value: appState.stationFeatures,
				});
				appDispatch({
					type: 'setFilterSat',
					filterSat: 'All',
				});
			} else {
				if (appState.selectedSat == 'All') {
					const days = Number((event.target as HTMLInputElement).value);
					const result = appState.stationFeatures.features.filter(
						(feature) => {
							const dateString = feature.properties.e_date;
							const dateFormatted = new Date(dateString);
							const dateNow = new Date();
							const differenceMiliseconds =
								Number(dateNow) - Number(dateFormatted);
							const differenceinDays =
								differenceMiliseconds / (1000 * 60 * 60 * 24);
							return differenceinDays <= days;
						}
					);
					appDispatch({
						type: 'filterFeatures',
						value: {
							'type': 'FeatureCollection',
							'name': 'sv',
							'crs': {
								'type': 'name',
								'properties': { 'name': 'urn:ogc:def:crs:OGC:1.3:CRS84' },
							},
							'features': result,
						},
					});
				} else if (appState.selectedRiver != '') {
					const days = Number((event.target as HTMLInputElement).value);
					const result = appState.stationFeatures.features.filter(
						(feature) => {
							const dateString = feature.properties.e_date;
							const dateFormatted = new Date(dateString);
							const dateNow = new Date();
							const differenceMiliseconds =
								Number(dateNow) - Number(dateFormatted);
							const differenceinDays =
								differenceMiliseconds / (1000 * 60 * 60 * 24);
							return (
								differenceinDays <= days &&
								feature.properties.sat.includes(appState.selectedSat) &&
								feature.properties.river
									.toLowerCase()
									.includes(appState.selectedRiver)
							);
						}
					);
					appDispatch({
						type: 'filterFeatures',
						value: {
							'type': 'FeatureCollection',
							'name': 'sv',
							'crs': {
								'type': 'name',
								'properties': { 'name': 'urn:ogc:def:crs:OGC:1.3:CRS84' },
							},
							'features': result,
						},
					});
				} else {
					const days = Number((event.target as HTMLInputElement).value);
					const result = appState.stationFeatures.features.filter(
						(feature) => {
							const dateString = feature.properties.e_date;
							const dateFormatted = new Date(dateString);
							const dateNow = new Date();
							const differenceMiliseconds =
								Number(dateNow) - Number(dateFormatted);
							const differenceinDays =
								differenceMiliseconds / (1000 * 60 * 60 * 24);
							return (
								differenceinDays <= days &&
								feature.properties.sat.includes(appState.selectedSat)
							);
						}
					);
					appDispatch({
						type: 'filterFeatures',
						value: {
							'type': 'FeatureCollection',
							'name': 'sv',
							'crs': {
								'type': 'name',
								'properties': { 'name': 'urn:ogc:def:crs:OGC:1.3:CRS84' },
							},
							'features': result,
						},
					});
				}
			}
		}
	};

	const options = rivers.map((option) => {
		const firstLetter = option.river[0].toUpperCase();
		return {
			firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
			...option,
		};
	});

	let timeoutId;
	const riverInputHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const input = event.target as HTMLInputElement;

		if (input.dataset.testid == 'CloseIcon') {
			appDispatch({
				type: 'filterFeatures',
				value: appState.stationFeatures,
			});
			appDispatch({
				type: 'setRiver',
				value: '',
			});
			appDispatch({
				type: 'setFilterSat',
				filterSat: 'All',
			});
			return;
		}
		const inputValue = (event.target as HTMLInputElement).value;

		clearTimeout(timeoutId); // Clear any existing timeout
		// if user clear input box, resert features
		if (inputValue == '') {
			appDispatch({
				type: 'filterFeatures',
				value: appState.stationFeatures,
			});
			appDispatch({
				type: 'setRiver',
				value: '',
			});
		} else {
			timeoutId = setTimeout(() => {
				if ((event.target as HTMLInputElement).value != '0') {
					console.log(inputValue);
					const result = appState.stationFeatures.features.filter(
						(feature) => {
							const riverName = feature.properties.river;
							return String(riverName.toLowerCase()).includes(
								String(inputValue.toLowerCase())
							);
						}
					);
					appDispatch({
						type: 'setRiver',
						value: inputValue.toLowerCase(),
					});
					appDispatch({
						type: 'filterFeatures',
						value: {
							'type': 'FeatureCollection',
							'name': 'sv',
							'crs': {
								'type': 'name',
								'properties': {
									'name': 'urn:ogc:def:crs:OGC:1.3:CRS84',
								},
							},
							'features': result,
						},
					});
				}
			}, 1300);
		}
	};

	const riverChangeHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const input = event.target as HTMLInputElement;
		if (input.dataset.testid == 'CloseIcon') {
			appDispatch({
				type: 'filterFeatures',
				value: appState.stationFeatures,
			});
			return;
		}

		const inputValue = (event.target as HTMLInputElement).innerText;

		console.log(inputValue);
		const result = appState.stationFeatures.features.filter((feature) => {
			const riverName = feature.properties.river;
			return String(riverName.toLowerCase()).includes(
				String(inputValue.toLowerCase())
			);
		});
		appDispatch({
			type: 'setRiver',
			value: inputValue.toLowerCase(),
		});
		appDispatch({
			type: 'filterFeatures',
			value: {
				'type': 'FeatureCollection',
				'name': 'sv',
				'crs': {
					'type': 'name',
					'properties': {
						'name': 'urn:ogc:def:crs:OGC:1.3:CRS84',
					},
				},
				'features': result,
			},
		});
	};

	const projects = (
		<Box sx={{ zIndex: 10, ...style, padding: '1px' }}>
			<Grid
				container
				spacing={0}
				sx={{
					padding: 0,
					backgroundColor: darkGray.bg,
				}}
			>
				<Grid item xs={8}>
					<Typography
						variant="h6"
						component="h2"
						sx={{ padding: '5px 0 5px 10px', color: 'white' }}
					>
						Timeline (Last {appState.timelineDayLimit} days)
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Stack direction="row" spacing={1} justifyContent="flex-end">
						<IconButton
							aria-label="delete"
							onClick={handleCloseProject}
							sx={{ color: 'white' }}
						>
							<CloseIcon />
						</IconButton>
					</Stack>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={0.5}
				sx={{
					marginTop: '10px 0 5px 0',
					padding: '0px 5px 0 2px',
				}}
			>
				<Grid item xs={5.5}>
					<ItemTitle>STATION NAME</ItemTitle>
				</Grid>
				<Grid item xs={2.2}>
					<ItemTitle>Date</ItemTitle>
				</Grid>
				<Grid item xs={1.5}>
					<ItemTitle>Change</ItemTitle>
				</Grid>
				<Grid item xs={1.3}>
					<ItemTitle>Anom.</ItemTitle>
				</Grid>
				<Grid item xs={1.5}>
					<ItemTitle>Level</ItemTitle>
				</Grid>
			</Grid>
			<List
				sx={{
					padding: 0,
					overflow: 'auto',
					height: '85%',
					'&::-webkit-scrollbar': {
						width: 11,
					},
					'&::-webkit-scrollbar-track': {
						boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
					},
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: 'darkgrey',
						outline: `1px solid slategrey`,
					},
				}}
			>
				{appState.lastUpdatedStations.map((item: any, idx: number) => (
					<ListItem key={idx} disablePadding>
						<Grid
							key={idx}
							container
							spacing={1}
							sx={{
								padding: '2px',
							}}
						>
							<Grid item xs={5.5}>
								<Tooltip title={item.name} placement="right">
									<BootstrapButton
										variant="contained"
										aria-label="station name"
										color="primary"
										disableRipple
										onClick={() => {
											appDispatch({ type: 'closeSearchModal' });
											appDispatch({
												type: 'toglePanelModal',
												value: false,
											});

											props.flyTo([item.lon, item.lat]);
											console.log('click button');
										}}
									>
										<Typography
											sx={{ fontSize: '0.8rem', color: 'white' }}
										>
											{item.name.slice(2).substring(0, 22)}...
										</Typography>
									</BootstrapButton>
								</Tooltip>
							</Grid>

							<Grid item xs={2.2}>
								<Item>{item.last_update.slice(2)}</Item>
							</Grid>
							<Grid item xs={1.5}>
								<Item>{item.change}</Item>
							</Grid>
							<Grid item xs={1.3}>
								<Item>{item.anomaly}</Item>
							</Grid>
							<Grid item xs={1.5}>
								<Item>{item.value}</Item>
							</Grid>
						</Grid>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const filters = (
		<Box sx={style}>
			<Grid
				container
				spacing={0}
				sx={{
					padding: 0,
					backgroundColor: '#44414d',
				}}
			>
				<Grid item xs={8}>
					<Typography
						variant="h6"
						component="h2"
						sx={{ padding: '5px 0 5px 10px', color: 'white' }}
					>
						Filters
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Stack direction="row" spacing={1} justifyContent="flex-end">
						<IconButton
							aria-label="close"
							onClick={handleCloseSelect}
							sx={{ color: 'white' }}
						>
							<CloseIcon />
						</IconButton>
					</Stack>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={1}
				sx={{
					marginTop: '5px',
					padding: '5px',
				}}
			>
				<Grid item xs={12}>
					<ItemTitle
						sx={{
							fontSize: sectionTitle,
							fontWeight: '600',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						Satellite Layers - Choose stations to show by satellite:
					</ItemTitle>
				</Grid>
				<Grid
					item
					xs={12}
					sx={{
						fontSize: sectionTitle,
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<FormControl>
						<RadioGroup
							row
							aria-labelledby="satellite-selection"
							name="position"
							defaultValue={appState.filterSat}
							onChange={handleRadioSat}
							value={appState.filterSat}
						>
							<FormControlLabel
								value="All"
								control={<Radio />}
								label="All"
								labelPlacement="bottom"
								sx={{
									fontSize: '0.5rem',
								}}
							/>
							<FormControlLabel
								value="S3A"
								control={<Radio />}
								label="S3A"
								labelPlacement="bottom"
								sx={{
									fontSize: sectionTitle,
								}}
							/>
							<FormControlLabel
								value="S3B"
								control={<Radio />}
								label="S3B"
								labelPlacement="bottom"
								sx={{
									fontSize: sectionTitle,
								}}
							/>
							<FormControlLabel
								value="S6A"
								control={<Radio />}
								label="S6A"
								labelPlacement="bottom"
								sx={{
									fontSize: sectionTitle,
								}}
							/>
							<FormControlLabel
								value="J2"
								control={<Radio />}
								label="J2"
								labelPlacement="bottom"
								sx={{
									fontSize: sectionTitle,
								}}
							/>
							<FormControlLabel
								value="J3"
								control={<Radio />}
								label="J3"
								labelPlacement="bottom"
								sx={{
									fontSize: sectionTitle,
								}}
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<ItemTitle
						sx={{
							fontSize: sectionTitle,
							fontWeight: '600',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						Station Filter - Choose to show station color parameter by:
					</ItemTitle>
				</Grid>
				<Grid
					item
					xs={12}
					sx={{
						fontSize: sectionTitle,
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<FormControl>
						<RadioGroup
							row
							aria-labelledby="satellite-selection"
							name="position"
							defaultValue={appState.filterMeasurament}
							onChange={handleRadioStation}
						>
							<FormControlLabel
								value="anomalia"
								control={<Radio />}
								label="Anomaly(meters)"
								labelPlacement="end"
								sx={{
									fontSize: sectionTitle,
								}}
							/>
							<FormControlLabel
								value="change"
								control={<Radio />}
								label="Level Change(meters)**"
								labelPlacement="end"
								sx={{
									fontSize: sectionTitle,
								}}
							/>
						</RadioGroup>
					</FormControl>
				</Grid>
				<Grid
					item
					xs={12}
					sx={{
						fontSize: sectionTitle,
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					{' '}
					**Change from last two measurements.
				</Grid>
				<Grid item xs={12}>
					<ItemTitle
						sx={{
							fontSize: sectionTitle,
							fontWeight: '600',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						Station Time Filter that updated in the last : (Days)
					</ItemTitle>
				</Grid>

				<Grid
					item
					xs={12}
					sx={{
						fontSize: sectionTitle,
						display: 'flex',
						justifyContent: 'center',
						margin: '0 50px 0 50px',
					}}
				>
					<Slider
						aria-label="Custom marks"
						defaultValue={appState.filterTimeDays}
						getAriaValueText={valuetext}
						value={appState.filterTimeDays}
						step={1}
						max={21}
						valueLabelDisplay="auto"
						marks={marks}
						onChange={handleChangeSlider}
					/>
				</Grid>
				<Grid item xs={12}>
					<ItemTitle
						sx={{
							fontSize: sectionTitle,
							fontWeight: '600',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						Station Filter - Choose to show station by river name:
					</ItemTitle>
				</Grid>
				<Grid
					item
					xs={4}
					sx={{
						fontSize: sectionTitle,
						display: 'flex',
						justifyContent: 'center',
						margin: '0 0px 0 0px',
						alignItems: 'center',
					}}
				>
					<BootstrapButton
						variant="contained"
						aria-label="station name"
						color="primary"
						disableRipple
						onClick={() => {
							appDispatch({
								type: 'filterFeatures',
								value: appState.stationFeatures,
							});
							appDispatch({
								type: 'setFilterSat',
								filterSat: 'All',
							});
							appDispatch({
								type: 'setFilterTimeDays',
								filterTimeDays: 0,
							});
						}}
						sx={{
							height: '40px',
							width: '95px',
							marginTop: '10px',
						}}
					>
						<Typography
							sx={{
								fontSize: '0.8rem',
								color: 'white',
								fontWeight: '600',
							}}
						>
							Clear Filters
						</Typography>
					</BootstrapButton>
				</Grid>
				<Grid
					item
					xs={8}
					sx={{
						fontSize: sectionTitle,
						display: 'flex',
						justifyContent: 'center',
						margin: '0 0px 0 0px',
					}}
				>
					<Autocomplete
						id="grouped-rivernames"
						onInputChange={riverInputHandler}
						onChange={riverChangeHandler}
						options={options.sort(
							(a, b) => -b.firstLetter.localeCompare(a.firstLetter)
						)}
						groupBy={(option) => option.firstLetter}
						getOptionLabel={(option) => option.river}
						sx={{ width: 300, marginTop: '10px' }}
						renderInput={(params) => (
							<TextField {...params} label="type name or select list" />
						)}
					/>
				</Grid>
			</Grid>
		</Box>
	);

	const timeFilterRadio = (
		<Grid
			item
			xs={12}
			sx={{
				fontSize: sectionTitle,
				display: 'flex',
				justifyContent: 'center',
			}}
		>
			<FormControl>
				<FormLabel id="satSelection" style={{ textAlign: 'center' }}>
					Show stations that updated in the last : (Days)
				</FormLabel>
				<RadioGroup
					row
					aria-labelledby="satellite-selection"
					name="position"
					defaultValue={appState.filterTimeDays}
					onChange={handleRadioTime}
				>
					<FormControlLabel
						value="none"
						control={<Radio />}
						label="None"
						labelPlacement="bottom"
					/>

					<FormControlLabel
						value="2"
						control={<Radio />}
						label="2"
						labelPlacement="bottom"
					/>

					<FormControlLabel
						value="5"
						control={<Radio />}
						label="5"
						labelPlacement="bottom"
					/>

					<FormControlLabel
						value="7"
						control={<Radio />}
						label="7"
						labelPlacement="bottom"
					/>
					<FormControlLabel
						value="14"
						control={<Radio />}
						label="14"
						labelPlacement="bottom"
					/>

					<FormControlLabel
						value="21"
						control={<Radio />}
						label="21"
						labelPlacement="bottom"
					/>
				</RadioGroup>
			</FormControl>
		</Grid>
	);

	const search = (
		<Box sx={{ overflow: 'auto', zIndex: 10, ...style }}>
			{appState.modals.search && (
				<div>
					<Grid
						container
						spacing={0}
						sx={{
							padding: 0,
							backgroundColor: darkGray.bg,
							overflow: 'auto',
						}}
					>
						<Grid item xs={8}>
							<Typography
								variant="h6"
								component="h2"
								sx={{ padding: '5px 0 5px 10px', color: 'white' }}
							>
								<SearchIcon sx={{ color: 'white' }} />
								Search
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Stack direction="row" spacing={1} justifyContent="flex-end">
								<IconButton
									aria-label="timeline"
									onClick={handleCloseSearch}
									sx={{ color: 'white' }}
								>
									<CloseIcon />
								</IconButton>
							</Stack>
						</Grid>
					</Grid>

					{appState.searchResult && (
						<Grid
							container
							spacing={1}
							sx={{
								marginTop: '30px',
								padding: '2px',
							}}
						>
							<Grid item xs={7}>
								<ItemTitle>STATION NAME</ItemTitle>
							</Grid>

							<Grid item xs={2}>
								<ItemTitle>SAT</ItemTitle>
							</Grid>
							<Grid item xs={1.5}>
								<ItemTitle>Long.</ItemTitle>
							</Grid>
							<Grid item xs={1.5}>
								<ItemTitle>Lat.</ItemTitle>
							</Grid>
						</Grid>
					)}
					{appState.searchResult &&
						appState.searchData.map((item: any, idx: number) => (
							<Grid
								key={idx}
								container
								spacing={1}
								sx={{
									padding: '2px',
								}}
							>
								<Grid item xs={7}>
									<BootstrapButton
										variant="contained"
										aria-label="station name"
										color="primary"
										disableRipple
										onClick={() => {
											appDispatch({ type: 'closeSearchModal' });
											appDispatch({
												type: 'toglePanelModal',
												value: false,
											});

											props.flyTo([
												item.attributes.longitude,
												item.attributes.latitude,
											]);
											console.log('click button');
										}}
									>
										{item.attributes.name.slice(2)}
									</BootstrapButton>
								</Grid>

								<Grid item xs={2}>
									<Item>{item.attributes.sat}</Item>
								</Grid>
								<Grid item xs={1.5}>
									<Item>{item.attributes.longitude.toFixed(3)}</Item>
								</Grid>
								<Grid item xs={1.5}>
									<Item>{item.attributes.latitude.toFixed(3)}</Item>
								</Grid>
							</Grid>
						))}
				</div>
			)}
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
						{projects}
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
