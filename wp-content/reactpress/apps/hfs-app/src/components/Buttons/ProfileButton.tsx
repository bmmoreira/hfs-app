/** @format */

import React, { useContext } from 'react';
import DispatchContext from '../../DispatchContext';

import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';

import { bgColorButton, bgColorButtonTitle } from '../Utils/sytles';
interface ProfileButtondProps {
	message: string;
}

const ProfileButton: React.FC<ProfileButtondProps> = ({ message }) => {
	const appDispatch = useContext(DispatchContext);

	function configButton() {
		window.location.reload(); // refresh the browser
	}

	function handleLogout() {
		appDispatch({ type: 'logout' });
		appDispatch({
			type: 'flashMessages',
			value: 'You have successfully logged out',
		});
	}

	return (
		<>
			<div>
				<IconButton
					aria-label="settings"
					sx={{
						backgroundColor: bgColorButton,
						color: bgColorButtonTitle,
					}}
					onClick={configButton}
				>
					<SettingsIcon />
				</IconButton>
				<IconButton
					aria-label="mail"
					sx={{
						backgroundColor: bgColorButton,
						color: bgColorButtonTitle,
					}}
				>
					<MailIcon />
				</IconButton>
				<IconButton
					aria-label="help"
					sx={{
						backgroundColor: bgColorButton,
						color: bgColorButtonTitle,
					}}
				>
					<HelpIcon />
				</IconButton>
			</div>
			<Button
				aria-label="account"
				endIcon={<PersonIcon />}
				color="primary"
				sx={{
					backgroundColor: bgColorButton,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					fontSize: '0.9rem',
					height: '30px',
					width: '140px',
					borderRadius: '5px',
					marginTop: '5px',
					color: bgColorButtonTitle,
				}}
			>
				Log in
			</Button>
		</>
	);
};

export default ProfileButton;
