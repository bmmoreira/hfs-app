/** @format */

import React from 'react';
import { Popup } from 'react-map-gl';
import DispatchContext from '../../DispatchContext';
import StateContext from '../../StateContext';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import {
	bgColor,
	bgColorButton,
	bgColorBox,
	bgColorButtonTitle,
	styleGray,
} from '../Utils/constants.js';
import './custom-popup.css';

export type StationObject = {
	lngLat: [number, number];
	name: string;
	code?: string;
	river?: string;
	basin?: string;
	anomalia?: string;
	sat?: string;
	change?: string;
	level?: string;
	sdate?: string;
	edate?: string;
};

type StPopupProp = {
	sObj: StationObject;
	getData(name: string): void;
	closePopup(): void;
};

const StationPopup = (props: StPopupProp) => {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

	const BootstrapButton = styled(Button)({
		boxShadow: 'none',
		textTransform: 'none',
		fontSize: 14,
		padding: '6px 12px',
		border: '1px solid',
		lineHeight: 1.5,
		backgroundColor: styleGray.bgButton,
		borderColor: styleGray.borderColor,
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:hover': {
			backgroundColor: styleGray.bgButtonHover,
			borderColor: styleGray.borderColorHover,
			boxShadow: 'none',
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: styleGray.bgButtonActive,
			borderColor: styleGray.borderColorActive,
		},
		'&:focus': {
			boxShadow: styleGray.boxShadowFocus,
		},
	});

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		fontSize: '0.8rem',
		color: theme.palette.text.secondary,
	}));
	return (
		<Popup
			// @ts-ignore
			tipSize={5}
			longitude={props.sObj.lngLat[0]}
			latitude={props.sObj.lngLat[1]}
			closeOnClick={false}
			offset={{
				'bottom-left': [12, -20],
				bottom: [0, -20],
				'bottom-right': [-12, -20],
			}}
			onClose={() => {
				props.closePopup();
				appDispatch({
					type: 'showDrainageArea',
					valueShow: false,
				});
			}}
			className="custom-popup"
		>
			{/* Customize the content of the popup */}
			<div>
				<h3>
					Code: {appState.stationData.river} {props.sObj.code}
				</h3>
				<Box sx={{ flexGrow: 1, minWidth: 250 }}>
					<Grid container spacing={1}>
						<Grid item xs={2}>
							<Item>Basin:</Item>
						</Grid>
						<Grid item xs={10}>
							<Item>{appState.stationData.basin}</Item>
						</Grid>

						<Grid item xs={6}>
							<Item>Lat: {props.sObj.lngLat[1].toFixed(5)}</Item>
						</Grid>
						<Grid item xs={6}>
							<Item>Lon: {props.sObj.lngLat[0].toFixed(5)}</Item>
						</Grid>

						<Grid item xs={4}>
							<Item>Level: {props.sObj.level}(m)</Item>
						</Grid>
						<Grid item xs={4}>
							<Item>Change: {props.sObj.change}(m)</Item>
						</Grid>
						<Grid item xs={4}>
							<Item>
								Anomaly: {Number(props.sObj.anomalia).toFixed(1)}(m)
							</Item>
						</Grid>
						<Grid item xs={6}>
							<Item>Start: {props.sObj.sdate}</Item>
						</Grid>
						<Grid item xs={6}>
							<Item>Last: {props.sObj.edate}</Item>
						</Grid>
						<Grid
							item
							xs={6}
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<BootstrapButton
								variant="contained"
								aria-label="delete"
								endIcon={<ShowChartIcon />}
								color="primary"
								disableRipple
								onClick={() => {
									props.getData(props.sObj.name);
									console.log('click button');
								}}
							>
								Show Data
							</BootstrapButton>
						</Grid>
						<Grid
							item
							xs={6}
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<BootstrapButton
								variant="contained"
								aria-label="drainage"
								endIcon={<WaterDropIcon />}
								color="primary"
								disableRipple
								onClick={() => {
									appDispatch({
										type: 'showDrainageArea',
										valueShow: true,
										valueName: appState.stationData.name,
									});
								}}
								sx={{ backgroundColor: '#0677b2' }}
							>
								Show Drainage
							</BootstrapButton>
						</Grid>
					</Grid>
				</Box>
			</div>
		</Popup>
	);
};
export default StationPopup;
