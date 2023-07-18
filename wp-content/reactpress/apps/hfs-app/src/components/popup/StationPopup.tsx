/** @format */

import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { Popup } from 'react-map-gl';
import StateContext from '../../StateContext';
import { useContext } from 'react';

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
				/* appDispatch({
					type: "closePopup",
				}); */
			}}
			className="custom-popup"
		>
			{/* Customize the content of the popup */}
			<div>
				<h3>Code: {props.sObj.code}</h3>
				<p>
					River: {appState.stationData.river} <br />
					Basin: {appState.stationData.basin} <br />
					Latitude: {props.sObj.lngLat[1]}
					<br />
					Longitude: {props.sObj.lngLat[0]}
					<br />
					Satellite / Track: {props.sObj.sat}
					<br />
					Water Level Anomaly: {props.sObj.anomalia}
					<br />
					Last Water Level Value: {props.sObj.level}
					<br />
					Water Level Change: {props.sObj.change}
					<br />
					Start of Time Series: {props.sObj.sdate}
					<br />
					Last Measurament: {props.sObj.edate}
				</p>
				<div className="text-center">
					<Button
						className="popup-button"
						variant="primary"
						onClick={() => {
							props.getData(props.sObj.name);
							console.log('click button');
						}}
					>
						Get Data
					</Button>
				</div>
			</div>
		</Popup>
	);
};
export default StationPopup;
