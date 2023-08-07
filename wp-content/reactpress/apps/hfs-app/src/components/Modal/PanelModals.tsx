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
import { CSSTransition } from 'react-transition-group';
import './styles.css';

export default function PanelModals() {
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

	const handleClose = () => {
		//setOpen(false);
		appDispatch({ type: 'closeTimeLineModal' });
	};

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
					<CSSTransition
						in={appState.modals.projects}
						timeout={500}
						classNames="slide-projects"
						unmountOnExit
					>
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
										Projects
									</Typography>
								</Grid>
								<Grid item xs={4}>
									<Stack
										direction="row"
										spacing={1}
										justifyContent="flex-end"
									>
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
					</CSSTransition>
				</Grid>
				<Grid item xs={4}>
					<CSSTransition
						in={appState.modals.timeline}
						timeout={500}
						classNames="slide-timeline"
						unmountOnExit
					>
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
										Timeline
									</Typography>
								</Grid>
								<Grid item xs={4}>
									<Stack
										direction="row"
										spacing={1}
										justifyContent="flex-end"
									>
										<IconButton
											aria-label="delete"
											onClick={handleClose}
											sx={{ color: 'white' }}
										>
											<CloseIcon />
										</IconButton>
									</Stack>
								</Grid>
							</Grid>

							<Typography sx={{ mt: 2 }}></Typography>
						</Box>
					</CSSTransition>
				</Grid>
				<Grid item xs={4}>
					<CSSTransition
						in={appState.modals.select}
						timeout={500}
						classNames="slide-select"
						unmountOnExit
					>
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
									<Stack
										direction="row"
										spacing={1}
										justifyContent="flex-end"
									>
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
					</CSSTransition>
				</Grid>
			</Grid>
		</div>
	);
}
