/** @format */

import React, { useContext, useState } from 'react';
import DispatchContext from '../../DispatchContext';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import StateContext from '../../StateContext';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import {
	BootstrapButton,
	Item,
	ItemTitle,
	darkGray,
} from '../Utils/sytles';

interface SearchPanelProp {
	flyTo(coord: [long: number, lat: number]): void;
}

export default function SearchPanel(props: SearchPanelProp) {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

	const handleCloseProject = () => {
		appDispatch({ type: 'closeProjectsModal' });
	};

	const handleCloseSearch = () => {
		appDispatch({ type: 'closeSearchModal' });
		appDispatch({ type: 'toglePanelModal', value: false });
	};

	return (
		<>
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
						<SearchIcon sx={{ color: 'white' }} />
						Search
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
			{appState.searchResult && (
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
					{appState.searchData.map((item: any, idx: number) => (
						<ListItem key={idx} disablePadding>
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
						</ListItem>
					))}
				</List>
			)}
		</>
	);
}
