/** @format */

import React, { useContext } from 'react';
import DispatchContext from '../../DispatchContext';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import HistoryIcon from '@mui/icons-material/History';

import { headerButtonStyle } from '../Utils/sytles';

interface TimelinedProps {
	message: string;
}

const TimelineButton: React.FC<TimelinedProps> = ({ message }) => {
	const appDispatch = useContext(DispatchContext);

	function toggleTimeline() {
		appDispatch({ type: 'togleTimeLineModal' });
	}

	return (
		<IconButton
			aria-label="Timeline Button"
			sx={{ ...headerButtonStyle }}
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
	);
};

export default TimelineButton;
