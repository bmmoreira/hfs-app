/** @format */

import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import Grid from '@mui/material/Grid';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { ItemTitle } from '../Utils/sytles';

interface Rivers {
	river: string;
}

export default function FilterPanel(props: any) {
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

	const handleCloseSelect = () => {
		//setOpen(false);
		appDispatch({ type: 'closeSelectModal' });
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

	return (
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
								labelPlacement="bottom"
								sx={{
									fontSize: sectionTitle,
								}}
							/>
							<FormControlLabel
								value="change"
								control={<Radio />}
								label="Level Change(meters)**"
								labelPlacement="bottom"
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
						Station Time Filter
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
					{' '}
					Show stations that updated in the last : (Days)
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
					xs={12}
					sx={{
						fontSize: sectionTitle,
						display: 'flex',
						justifyContent: 'center',
						margin: '0 50px 0 50px',
					}}
				>
					<Autocomplete
						id="grouped-rivernames"
						onInputChange={riverInputHandler}
						onChange={riverChangeHandler}
						isOptionEqualToValue={appState.selectedRiver}
						options={options.sort(
							(a, b) => -b.firstLetter.localeCompare(a.firstLetter)
						)}
						groupBy={(option) => (option as any).firstLetter}
						getOptionLabel={(option) => (option as any).river}
						sx={{ width: 300, marginTop: '10px' }}
						renderInput={(params) => (
							<TextField {...params} label="type name or select list" />
						)}
					/>
				</Grid>
			</Grid>
		</Box>
	);
}
