/** @format */

import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';

import { headerStyle } from '../Utils/sytles';
import FilterButton from '../Buttons/FilterButton';
import SearchComponent from './SearchComponent';
import TimelineButton from '../Buttons/TimelineButton';

function HeaderLoggedIn(props) {
	const headerLeftPanel = (
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
		></Grid>
	);

	const headerRightPanel = (
		<Grid
			container
			spacing={0}
			sx={{
				m: 0,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Grid
				xs={2}
				sx={{
					display: 'flex',
					gap: '10px',
				}}
			>
				<FilterButton />
			</Grid>
			<Grid
				xs={2}
				sx={{
					display: 'flex',
					gap: '10px',
				}}
			></Grid>
			<Grid
				xs={8}
				sx={{
					display: 'flex',
					gap: '10px',
					height: '60px',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<img src="/assets/images/theia_60h3.png" height={60} alt="IRD" />
			</Grid>
		</Grid>
	);

	return (
		<div style={{ width: '100%', margin: 0, padding: 0 }}>
			<Box sx={{ ...headerStyle }}>
				{headerLeftPanel}
				<SearchComponent />
				{headerRightPanel}
			</Box>
		</div>
	);
}

export default HeaderLoggedIn;
