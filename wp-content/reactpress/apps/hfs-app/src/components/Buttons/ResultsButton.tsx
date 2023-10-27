/** @format */

import React, { useContext } from 'react';
import DispatchContext from '../../DispatchContext';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';

import { headerButtonStyle } from '../Utils/sytles';

interface ResultsButtondProps {
	message: string;
}

const ResultsButton: React.FC<ResultsButtondProps> = ({ message }) => {
	const appDispatch = useContext(DispatchContext);

	function toggleSelect() {
		appDispatch({ type: 'togleSelectModal' });
	}

	return (
		<IconButton
			aria-label="{notificationsLabel(100)}"
			sx={{ ...headerButtonStyle }}
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
	);
};

export default ResultsButton;
