/** @format */

import React, { ChangeEvent, useState } from 'react';
import DispatchContext from '../../DispatchContext';
import StateContext from '../../StateContext';
import Select from 'react-select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { useContext } from 'react';
import './search.css';
import { Button } from '@mui/material';

export type StationData = {
	id: number;
	attributes: {
		stCode: string;
		stLongitude: number;
		stLatitude: number;
		stName: string;
		stUF: string;
	};
};

export type SearchData = {
	content?: boolean;
	loading?: boolean;
	stationData?: StationData[];
	value?: string;
};

export interface SearchProp {
	flyTo?(coord: [long: number, lat: number]): void;
	onSearch?(type: string, value: string): void;
	getSearchStation?(value: any): void;
}

const SearchComponent = (props: SearchProp) => {
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);
	const [searchResult, setSearchResult] = useState(appState.searchData);
	const [showSatSelectBox, setSatSelectBox] = useState(false);

	const [searchArg, setSearchArg] = useState({
		value: `name`,
		label: `Name`,
	});

	const argList = [
		{
			value: `name`,
			label: `Name`,
		},
		{
			value: `basin`,
			label: `Basin`,
		},
		{
			value: `river`,
			label: `River`,
		},
	];

	const onCatValueChanged = (event: any) => {
		setSearchArg({
			value: event.value,
			label: event.label,
		});

		// setSatSelectBox(event.value == 'sat');

		console.log(event);
	};
	let timeoutId;
	const onSearchChangeHandler = (event: any) => {
		clearTimeout(timeoutId); // Clear any existing timeout
		const inputValue = event.target.value;

		// Set a new timeout to handle the event after a delay (e.g., 500 milliseconds)
		timeoutId = setTimeout(() => {
			// Perform the desired action or function call here
			appDispatch({
				type: 'searchAction2',
				searchEventValue: inputValue,
				searchTypeValue: searchArg.value,
			});

			console.log('Search Modal input value:', inputValue);
			//props.onSearch(searchArg.value, inputValue);
		}, 800);
	};

	const closeToast = () => {
		appDispatch({
			type: 'togleSearchToast',
			closeSearchToast: false,
		});
	};

	const style = {
		width: '100%',
		maxWidth: 360,
		bgcolor: 'background.paper',
		paddingLeft: '0px',
		m: 0,
		p: 0,
	};

	const styleItem = {
		fontWeight: 'bold',
		mx: 0.5,
		fontSize: 12,
		bgcolor: 'red',
	};

	const satList = [
		{
			value: `All`,
			label: `All Satellites`,
		},
		{
			value: `S3A`,
			label: `S3A`,
		},
		{
			value: `S3B`,
			label: `S3B`,
		},
		{
			value: `S6A`,
			label: `S6A`,
		},
		{
			value: `J2`,
			label: `J2`,
		},
		{
			value: `J3`,
			label: `J3`,
		},
	];

	const onSatValueChanged = (event: any) => {
		appDispatch({
			type: 'selectSat',
			satName: event.value,
		});
		console.log('SatPanel ' + event.value);
	};

	return (
		<>
			<div>
				<Select
					menuPlacement="bottom"
					defaultValue={{
						label: argList[0].label,
						value: argList[0].value,
					}}
					onChange={onCatValueChanged}
					options={argList}
					className="toast-select"
				/>

				<Select
					menuPlacement="bottom"
					defaultValue={{
						label: satList[0].label,
						value: satList[0].value,
					}}
					onChange={onSatValueChanged}
					options={satList}
					className="toast-select"
				/>

				<input
					onChange={(e) => {
						onSearchChangeHandler(e);
					}}
					placeholder={`Type station ${searchArg.label}`}
					className="toast-input"
					style={{
						marginTop: '5px',
						marginBottom: '5px',
						textAlign: 'center',
					}}
				/>

				<div
					className="toast-div"
					style={{
						width: '250px',
						height: '260px',
						overflow: 'auto',
						margin: '0px',
						padding: '0px',
					}}
				>
					<div className="toast-list-title">Stations List: </div>
					{appState.searchData2.map((item, idx) => (
						<>
							<Typography component="div">
								<Button
									variant="contained"
									sx={{ fontSize: 12, m: 1 }}
									onClick={() => {
										// call this function on ModalChart.tsx
										//props.getSearchStation(item.attributes.name);
										appDispatch({
											type: 'compareStationAction',
											stationName: item.attributes.name,
										});
									}}
								>
									{item.attributes.name.slice(2)}
								</Button>
							</Typography>

							<Divider />
						</>
					))}
				</div>
			</div>
		</>
	);
};

export default SearchComponent;
