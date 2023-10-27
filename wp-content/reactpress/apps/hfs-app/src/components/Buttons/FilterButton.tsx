/** @format */

import React, { useContext } from 'react';
import DispatchContext from '../../DispatchContext';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

import { headerButtonStyle } from '../Utils/sytles';

interface FilterButtondProps {
	message?: string;
}

const FilterButton: React.FC<FilterButtondProps> = ({ message }) => {
	const appDispatch = useContext(DispatchContext);

	function toggleSelect() {
		appDispatch({ type: 'togleSelectModal' });
	}

	return (
		<IconButton
			aria-label="Filter Options"
			sx={{ ...headerButtonStyle }}
			onClick={toggleSelect}
		>
			<Badge
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				badgeContent={2}
				color="secondary"
			>
				<AddLocationAltIcon
					sx={{ position: 'relative', top: '0px', left: '0px' }}
				/>
			</Badge>
			<div>Filters</div>
		</IconButton>
	);
};

export default FilterButton;
