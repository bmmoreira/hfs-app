/** @format */

import React, { useContext } from 'react';
import DispatchContext from '../../DispatchContext';
import StateContext from '../../StateContext';

import IconButton from '@mui/material/IconButton';
import PublicIcon from '@mui/icons-material/Public';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Grid from '@mui/system/Unstable_Grid';

import { bgColorButtonTitle, bgColor } from '../Utils/sytles';

interface SearchComponentProps {
	message?: string;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ message }) => {
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);

	let timeoutId;
	const onSearchChangeHandler = (event) => {
		const inputValue = event.target.value;

		clearTimeout(timeoutId); // Clear any existing timeout

		if (!appState.modals.panelBox) {
			appDispatch({
				type: 'toglePanelModal',
				value: !appState.modals.panelBox,
			});
		}

		// if user has clear the search box with empty value
		if (inputValue == '') {
			// if the search result is open close it
			appDispatch({ type: 'closeSearchModal' });
			appDispatch({
				type: 'searchDataAction',
				searchDataValue: [],
			});
			appDispatch({
				type: 'searchAction',
				searchEventValue: '',
			});
		} else {
			// Set a new timeout to handle the event after a delay (e.g., 500 milliseconds)
			timeoutId = setTimeout(() => {
				// if the search result is open close it
				appDispatch({ type: 'closeSearchModal' });
				// dispatch action to search value use effect in App.js
				appDispatch({
					type: 'searchAction',
					searchEventValue: inputValue,
				});
				// toggle loading circle on
				appDispatch({
					type: 'toggleBackdrop',
					value: true,
				});
				console.log('searching for input value:', inputValue);
			}, 1300);
		}
	};

	return (
		<Grid container spacing={0} sx={{ display: 'flex' }}>
			<Grid
				xs={12}
				sx={{
					display: 'flex',
					height: '40px',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<TextField
					hiddenLabel
					size="small"
					placeholder="search for stations"
					sx={{
						width: '350px',
						fontStyle: 'italic',
						height: '20px',
					}}
					onChange={(e) => {
						onSearchChangeHandler(e);
					}}
					InputProps={{
						style: {
							border: '1px solid #cccccc',

							height: '35px',
							padding: '0px 0px 0px 0px',
							backgroundColor: 'gray',
						},
						startAdornment: (
							<InputAdornment position="start">
								<IconButton>
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Grid>
			<Grid
				xs={12}
				sx={{
					display: 'flex',
					height: '40px',
					gap: '10px',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Chip
					icon={<PublicIcon />}
					label="Where"
					sx={{
						color: bgColorButtonTitle,
						backgroundColor: bgColor,
						height: '20px',
					}}
				/>
				<Chip
					icon={<WatchLaterIcon />}
					label="When"
					sx={{
						color: bgColorButtonTitle,
						backgroundColor: bgColor,
						height: '20px',
					}}
				/>
				<Chip
					icon={<TuneIcon />}
					label="How"
					sx={{
						color: bgColorButtonTitle,
						backgroundColor: bgColor,
						height: '20px',
					}}
				/>
			</Grid>
		</Grid>
	);
};

export default SearchComponent;
