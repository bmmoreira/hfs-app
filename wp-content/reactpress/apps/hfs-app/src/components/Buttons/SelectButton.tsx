/** @format */

import React, { useContext } from 'react';
import DispatchContext from '../../DispatchContext';

import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

import { headerButtonStyle } from '../Utils/sytles';

interface SelectProps {
	message: string;
}

const SelectButton: React.FC<SelectProps> = ({ message }) => {
	const appDispatch = useContext(DispatchContext);

	function toggleSelect() {
		appDispatch({ type: 'togleSelectModal' });
	}

	return (
		<IconButton
			aria-label="Select Options"
			sx={{ ...headerButtonStyle }}
			onClick={toggleSelect}
		>
			<Badge
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				badgeContent={7}
				color="secondary"
			>
				<AddLocationAltIcon
					sx={{ position: 'relative', top: '0px', left: '0px' }}
				/>
			</Badge>
			<div>Select</div>
		</IconButton>
	);
};

export default SelectButton;
