/** @format */

import React, { useContext } from 'react';
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

import { CSSTransition } from 'react-transition-group';
import './styles.css';

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

	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

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

	const projects = (
		<Box sx={{ zIndex: 10, ...style }}>
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
						Projects
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

			<Typography sx={{ mt: 2 }}></Typography>
		</Box>
	);

	const select = (
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
						Select
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Stack direction="row" spacing={1} justifyContent="flex-end">
						<IconButton
							aria-label="delete"
							onClick={handleCloseSelect}
							sx={{ color: 'white' }}
						>
							<CloseIcon />
						</IconButton>
					</Stack>
				</Grid>
			</Grid>

			<Typography sx={{ mt: 2 }}></Typography>
		</Box>
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
						{select}
					</Slide>
				</Grid>
			</Grid>
		</div>
	);
}
