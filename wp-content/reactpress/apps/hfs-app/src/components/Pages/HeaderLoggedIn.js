/** @format */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DispatchContext from '../../DispatchContext';
import StateContext from '../../StateContext';
import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import BookIcon from '@mui/icons-material/Book';
import HistoryIcon from '@mui/icons-material/History';
import DownloadIcon from '@mui/icons-material/Download';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import TuneIcon from '@mui/icons-material/Tune';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import {
	bgColor,
	bgColorButton,
	bgColorBox,
	bgColorButtonTitle,
	styleGray,
} from '../Utils/constants.js';

function HeaderLoggedIn(props) {
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);

	function notificationsLabel(count) {
		if (count === 0) {
			return 'no notifications';
		}
		if (count > 99) {
			return 'more than 99 notifications';
		}
		return `${count} notifications`;
	}

	function toggleTimeline() {
		appDispatch({ type: 'togleTimeLineModal' });
	}

	function toggleProjects() {
		appDispatch({ type: 'togleProjectsModal' });
	}

	function toggleSelect() {
		appDispatch({ type: 'togleSelectModal' });
	}

	function handleLogout() {
		appDispatch({ type: 'logout' });
		appDispatch({
			type: 'flashMessages',
			value: 'You have successfully logged out',
		});
	}

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
		// Set a new timeout to handle the event after a delay (e.g., 500 milliseconds)
		if (inputValue == '') {
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
			timeoutId = setTimeout(() => {
				// Perform the desired action or function call here
				appDispatch({ type: 'closeSearchModal' });
				appDispatch({
					type: 'searchAction',
					searchEventValue: inputValue,
				});
				appDispatch({
					type: 'toggleBackdrop',
					value: !appState.backdrop,
				});
				console.log('Input value:', inputValue);
			}, 1300);
		}
	};

	const gridRightButtons = (
		<Grid
			xs={8}
			sx={{
				display: 'flex',
				gap: '10px',
				justifyContent: 'center',
				backgroundColor: 'red',
			}}
		>
			<IconButton
				aria-label={notificationsLabel(100)}
				sx={{
					backgroundColor: bgColorButton,
					display: 'flex',
					flexDirection: 'column',
					gap: '20px',
					justifyContent: 'center',
					fontSize: '0.9rem',
					height: '80px',
					width: '80px',
					borderRadius: '5px',
					color: bgColorButtonTitle,
				}}
				onClick={toggleSelect}
			>
				<Badge
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					badgeContent={7}
					color="secondary"
				>
					<AddLocationAltIcon
						sx={{ position: 'relative', top: '0px', left: '0px' }}
					/>
				</Badge>
				<div>Select</div>
			</IconButton>
			<IconButton
				aria-label={notificationsLabel(100)}
				sx={{
					backgroundColor: bgColorButton,
					display: 'flex',
					flexDirection: 'column',
					gap: '20px',
					justifyContent: 'center',
					fontSize: '0.9rem',
					height: '80px',
					width: '80px',
					borderRadius: '5px',
					color: bgColorButtonTitle,
				}}
				disabled
			>
				<Badge
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					badgeContent={3}
					color="secondary"
				>
					<FilterAltIcon
						sx={{ position: 'relative', top: '0px', left: '0px' }}
					/>
				</Badge>
				<div>Filters</div>
			</IconButton>

			<IconButton
				aria-label={notificationsLabel(100)}
				sx={{
					backgroundColor: bgColorButton,
					display: 'flex',
					flexDirection: 'column',
					gap: '20px',
					justifyContent: 'center',
					fontSize: '0.9rem',
					height: '80px',
					width: '80px',
					borderRadius: '5px',
					color: bgColorButtonTitle,
				}}
				disabled
			>
				<Badge
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					badgeContent={22}
					color="secondary"
				>
					<AutoAwesomeMotionIcon
						sx={{ position: 'relative', top: '0px', left: '0px' }}
					/>
				</Badge>
				<div>Results</div>
			</IconButton>
		</Grid>
	);

	const gridIcons = (
		<Grid container spacing={0} sx={{ display: 'flex' }}>
			<Grid
				xs={12}
				sx={{
					display: 'flex',
					height: '60px',
					gap: '10px',

					alignItems: 'end',
					paddingTop: '0px',
					paddingLeft: '20px',
				}}
			>
				<img src="/assets/images/sgb_60h.png" height={40} alt="SGB" />
				<img src="/assets/images/ird_60h.png" height={60} alt="IRD" />
				<img src="/assets/images/iph_60.png" height={60} alt="IPH" />
				<img
					src="/assets/images/hydromatters_60.png"
					height={60}
					alt="hydromatters"
				/>
			</Grid>
		</Grid>
	);

	const gridProfile = (
		<Grid
			xs={4}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'flex-end',
				paddingRight: '20px',
				height: '80px',
			}}
		>
			<div>
				<IconButton
					aria-label="settings"
					sx={{
						backgroundColor: bgColorButton,
						color: bgColorButtonTitle,
					}}
				>
					<SettingsIcon />
				</IconButton>
				<IconButton
					aria-label="mail"
					sx={{
						backgroundColor: bgColorButton,
						color: bgColorButtonTitle,
					}}
				>
					<MailIcon />
				</IconButton>
				<IconButton
					aria-label="help"
					sx={{
						backgroundColor: bgColorButton,
						color: bgColorButtonTitle,
					}}
				>
					<HelpIcon />
				</IconButton>
			</div>
			<Button
				aria-label="account"
				endIcon={<PersonIcon />}
				color="primary"
				sx={{
					backgroundColor: bgColorButton,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					fontSize: '0.9rem',
					height: '30px',
					width: '140px',
					borderRadius: '5px',
					marginTop: '5px',
					color: bgColorButtonTitle,
				}}
			>
				Log in
			</Button>
		</Grid>
	);

	const gridLeftButtons = (
		<Grid
			container
			spacing={0}
			sx={{
				m: 0,
			}}
		>
			<Grid
				xs={8}
				sx={{
					display: 'flex',
					gap: '10px',
				}}
			>
				<IconButton
					aria-label={notificationsLabel(100)}
					sx={{
						backgroundColor: bgColorButton,
						display: 'flex',
						flexDirection: 'column',
						gap: '20px',
						justifyContent: 'center',
						fontSize: '0.9rem',
						height: '80px',
						width: '80px',
						borderRadius: '5px',
						color: bgColorButtonTitle,
					}}
					onClick={toggleProjects}
				>
					<Badge
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						badgeContent={1}
						color="secondary"
					>
						<BookIcon
							sx={{ position: 'relative', top: '0px', left: '0px' }}
						/>
					</Badge>
					<div>Projects</div>
				</IconButton>
				<IconButton
					aria-label={notificationsLabel(100)}
					sx={{
						backgroundColor: bgColorButton,
						display: 'flex',
						flexDirection: 'column',
						gap: '20px',
						justifyContent: 'center',
						fontSize: '0.9rem',
						height: '80px',
						width: '80px',
						borderRadius: '5px',
						color: bgColorButtonTitle,
					}}
					onClick={toggleTimeline}
					disabled
				>
					<Badge
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						badgeContent={15}
						color="secondary"
					>
						<HistoryIcon
							sx={{ position: 'relative', top: '0px', left: '0px' }}
						/>
					</Badge>
					<div>Timeline</div>
				</IconButton>
				<IconButton
					aria-label={notificationsLabel(100)}
					sx={{
						backgroundColor: bgColorButton,
						display: 'flex',
						flexDirection: 'column',
						gap: '20px',
						justifyContent: 'center',
						fontSize: '0.9rem',
						height: '80px',
						width: '80px',
						borderRadius: '5px',
						color: bgColorButtonTitle,
					}}
					onClick={toggleSelect}
				>
					<Badge
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						badgeContent={7}
						color="secondary"
					>
						<AddLocationAltIcon
							sx={{ position: 'relative', top: '0px', left: '0px' }}
						/>
					</Badge>
					<div>Select</div>
				</IconButton>
			</Grid>
			{gridProfile}
		</Grid>
	);

	return (
		<div style={{ width: '100%', margin: 0, padding: 0 }}>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(3, 1fr)',
					alignItems: { xs: 'center', md: 'center' },
					backgroundColor: bgColor,
					height: '90px',
					borderBottom: '2px solid #4cadc5',
					borderTop: '2px solid #4cadc5',
					m: 0,
				}}
			>
				{gridIcons}
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
									<InputAdornment size="small">
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

				{gridLeftButtons}
			</Box>
		</div>
	);
}

export default HeaderLoggedIn;
