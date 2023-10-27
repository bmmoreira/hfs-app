/** @format */

import React, { useContext } from 'react';
import DispatchContext from '../../DispatchContext';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import BookIcon from '@mui/icons-material/Book';

import { headerButtonStyle } from '../Utils/sytles';

interface ProjectsButtondProps {
	message: string;
}

const ProjectsButton: React.FC<ProjectsButtondProps> = ({ message }) => {
	const appDispatch = useContext(DispatchContext);

	function toggleProjects() {
		appDispatch({ type: 'setTimelinePanel', value: true });
		appDispatch({ type: 'togleProjectsModal' });
	}

	return (
		<IconButton
			aria-label="Projects Button"
			sx={{ ...headerButtonStyle }}
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
				<BookIcon sx={{ position: 'relative', top: '0px', left: '0px' }} />
			</Badge>
			<div>Projects</div>
		</IconButton>
	);
};

export default ProjectsButton;
