/** @format */

import * as React from 'react';
import './toasts.css';
import Toast from 'react-bootstrap/Toast';
import CloseButton from 'react-bootstrap/CloseButton';
import ToastContainer from 'react-bootstrap/ToastContainer';
import DispatchContext from '../../DispatchContext';
import StateContext from '../../StateContext';
import SelectBox from 'devextreme-react/select-box';
import { useContext } from 'react';
import Select from 'react-select';
import {
	bgColor,
	bgColorButton,
	bgColorBox,
	bgColorButtonTitle,
} from '../Utils/constants.js';

const ScaleToast = (props) => {
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);

	const productLabel = { 'aria-label': 'Product' };

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

	const optionList = [
		{
			value: `anomalia`,
			label: `Anomaly(meters)`,
		},
		{
			value: `change`,
			label: `Last Change(meters)`,
		},
	];

	const onValueChanged = (event: any) => {
		appDispatch({
			type: 'selectSat',
			satName: event.value,
		});
		console.log('SatPanel ' + event.value);
	};

	const onValueChangedOptions = (event: any) => {
		appDispatch({
			type: 'ucAction',
			ucValue: event.value,
		});
		console.log('SatPanel ' + event.value);
	};

	const closeToast = () => {
		appDispatch({
			type: 'togleSatToast',
			closeSatToast: false,
		});
	};

	return (
		<ToastContainer
			style={{
				zIndex: '5',
				width: '220px',
				top: '160px',
				left: '15px',
				marginRight: '25px',
			}}
		>
			<Toast show={appState.satToast} onClose={closeToast}>
				<Toast.Header
					style={{
						backgroundColor: bgColorButton,
						color: bgColorButtonTitle,
					}}
					closeButton={false}
				>
					<strong className="mr-auto">Anomaly/Change Scale</strong>
					<CloseButton
						variant="white"
						onClick={() => closeToast()}
						style={{ right: '20px', position: 'absolute' }}
					/>
				</Toast.Header>
				<Toast.Body>
					<img
						src="/assets/images/scale.png"
						alt="Legend"
						style={{
							display: 'block',
							marginLeft: 'auto',
							marginRight: 'auto',
							marginTop: '5px',
						}}
					/>
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};
export default ScaleToast;
