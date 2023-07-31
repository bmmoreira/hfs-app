/** @format */

import React, { useContext } from 'react';
import HeaderLoggedOut from './HeaderLoggedOut';
import HeaderLoggedIn from './HeaderLoggedIn';
import StateContext from '../../StateContext';

import './main.css';

function Header(props) {
	const appState = useContext(StateContext);

	return (
		<header className="">
			<HeaderLoggedIn />
		</header>
	);
}

export default Header;
