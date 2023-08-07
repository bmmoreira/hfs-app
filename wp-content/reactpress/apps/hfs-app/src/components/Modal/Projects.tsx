/** @format */

import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';

export default function Projects() {
	const style = {
		position: 'relative',
		top: '0px',
		width: 300,
		height: window.innerHeight - 200,
		bgcolor: '#dddddd',
		border: '1px solid #000',
		borderRadius: '3px',
		boxShadow: '0 0 5px 5px gray',
		p: 0,
		zIndex: 11,
	};

	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

	//const [open, setOpen] = React.useState(appState.modals.projects);
	//const handleOpen = () => setOpen(true);
	const handleClose = () => {
		//setOpen(false);
		appDispatch({ type: 'closeProjectsModal' });
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
						Projects
					</Typography>
				</Grid>
				<Grid item xs={4}>
					<Stack direction="row" spacing={1} justifyContent="flex-end">
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

			<Typography sx={{ mt: 2 }}>
				Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
			</Typography>
		</Box>
	);
}
