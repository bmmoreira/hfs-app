/** @format */
import * as React from 'react';
import './toasts.css';
import Toast from 'react-bootstrap/Toast';
import CloseButton from 'react-bootstrap/CloseButton';
import ToastContainer from 'react-bootstrap/ToastContainer';
import StateContext from '../../StateContext';
import DispatchContext from '../../DispatchContext';
import { useContext } from 'react';

const PatternToast = (props) => {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

	const closeToast = () => {
		appDispatch({
			type: 'toglePatternToast',
			closePatternToast: false,
		});
	};

	return (
		<ToastContainer
			style={{
				zIndex: '3',
				width: '180px',
				top: '220px',
				right: '0px',
				marginRight: '20px',
				alignContent: 'center',
				alignItems: 'center',
			}}
		>
			<Toast show={appState.patternToast} onClose={closeToast}>
				<Toast.Header
					style={{ backgroundColor: '#3887BE', color: 'white' }}
					closeButton={false}
				>
					<strong className="mr-auto">Anomaly Pattern</strong>
					<CloseButton
						variant="white"
						onClick={() => closeToast()}
						style={{ right: '20px', position: 'absolute' }}
					/>
				</Toast.Header>
				<Toast.Body>
					<img
						src="/assets/images/legend_colors.png"
						alt="Legend"
						style={{
							display: 'block',
							marginLeft: 'auto',
							marginRight: 'auto',
						}}
					/>
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};
export default PatternToast;
