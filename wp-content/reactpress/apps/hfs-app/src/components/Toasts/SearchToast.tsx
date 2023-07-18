/** @format */

import React, { ChangeEvent, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import CloseButton from 'react-bootstrap/CloseButton';
import ToastContainer, {
	ToastPosition,
} from 'react-bootstrap/ToastContainer';
import DispatchContext from '../../DispatchContext';
import StateContext from '../../StateContext';
import Select from 'react-select';

import { useContext } from 'react';
import './toasts.css';

export type StationData = {
	id: number;
	attributes: {
		stCode: string;
		stLongitude: number;
		stLatitude: number;
		stName: string;
		stUF: string;
	};
};

export type SearchData = {
	content?: boolean;
	loading?: boolean;
	stationData?: StationData[];
	value?: string;
};

export interface SearchProp {
	flyTo(coord: [long: number, lat: number]): void;
	onSearch(type: string, value: string): void;
}

const SearchToast = (props: SearchProp) => {
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);
	const [searchResult, setSearchResult] = useState(appState.searchData);
	const [searchArg, setSearchArg] = useState({
		value: `name`,
		label: `Name`,
	});

	const argList = [
		{
			value: `name`,
			label: `Name`,
		},
		{
			value: `basin`,
			label: `Basin`,
		},
		{
			value: `river`,
			label: `River`,
		},
		{
			value: `sat`,
			label: `Satellite`,
		},
	];

	const onValueChanged = (event: any) => {
		setSearchArg({
			value: event.value,
			label: event.label,
		});

		console.log(event);
	};
	let timeoutId;
	const onSearchChangeHandler = (event: any) => {
		clearTimeout(timeoutId); // Clear any existing timeout
		const inputValue = event.target.value;

		// Set a new timeout to handle the event after a delay (e.g., 500 milliseconds)
		timeoutId = setTimeout(() => {
			// Perform the desired action or function call here
			appDispatch({
				type: 'searchAction',
				searchEventValue: inputValue,
				searchTypeValue: searchArg.value,
			});

			console.log('Input value:', inputValue);
			props.onSearch(searchArg.value, inputValue);
		}, 800);
	};

	const closeToast = () => {
		appDispatch({
			type: 'togleSearchToast',
			closeSearchToast: false,
		});
	};

	return (
		<>
			<ToastContainer
				style={{
					zIndex: '4',
					width: '275px',
					top: '470px',
					right: '20px',
				}}
			>
				<Toast show={appState.satToast} onClose={closeToast}>
					<Toast.Header
						style={{ backgroundColor: '#3887BE', color: 'white' }}
						closeButton={false}
					>
						<strong className="mr-auto">Search Box</strong>

						<CloseButton
							variant="white"
							onClick={() => closeToast()}
							style={{ right: '20px', position: 'absolute' }}
						/>
					</Toast.Header>
					<Toast.Body>
						<div>
							<Select
								menuPlacement="bottom"
								defaultValue={{
									label: argList[0].label,
									value: argList[0].value,
								}}
								onChange={onValueChanged}
								options={argList}
								className="toast-select"
							/>

							<input
								onChange={(e) => {
									onSearchChangeHandler(e);
								}}
								placeholder={`Type station ${searchArg.label}`}
								className="toast-input"
								style={{
									marginTop: '5px',
									marginBottom: '5px',
									textAlign: 'center',
								}}
							/>

							<div
								className="toast-div"
								style={{
									width: '250px',
									height: '200px',
									overflow: 'auto',
									margin: '0px',
									padding: '0px',
								}}
							>
								<div className="toast-list-title">Stations List: </div>
								<ul
									style={{
										margin: '0px',
										padding: '0px',
									}}
								>
									{appState.searchData.map((item, idx) => (
										<li key={idx}>
											<button
												className="btn btn-default"
												onClick={() => {
													props.flyTo([
														item.attributes.longitude,
														item.attributes.latitude,
													]);
												}}
											>
												<span className="font-search">
													{item.attributes.name.slice(2)}
												</span>
											</button>
										</li>
									))}
								</ul>
							</div>
						</div>
					</Toast.Body>
				</Toast>
			</ToastContainer>
		</>
	);
};

export default SearchToast;
