/** @format */

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export const bgColor = '#312f38';
export const bgColorButton = '#44414d';
export const bgColorBox = '#615d6f';
export const bgColorButtonTitle = '#f0f0f0';

export const darkGray = {
	bg: '#44414d',
	bgButton: '#9e9e9e',
	bgButtonHover: '#565262',
	bgButtonActive: '#565262',
	borderColor: '#28262e',
	borderColorHover: '#767187',
	borderColorActive: '#f0f0f0',
	bgBox: '#615d6f',
	colorButtonTitle: '#f0f0f0',
	boxShadowFocus: '0 0 0 0.2rem rgba(64,70,74,.5)',
};

export const styleGray = {
	bg: '#312f38',
	bgButton: '#1bb4f7',
	bgButtonHover: '#565262',
	bgButtonActive: '#565262',
	borderColor: '#28262e',
	borderColorHover: '#767187',
	borderColorActive: '#f0f0f0',
	bgBox: '#615d6f',
	colorButtonTitle: '#f0f0f0',
	boxShadowFocus: '0 0 0 0.2rem rgba(64,70,74,.5)',
};

export const BootstrapButton = styled(Button)({
	boxShadow: 'none',
	textTransform: 'none',
	width: '100%',
	fontSize: 14,
	padding: '6px 12px',
	border: '1px solid',
	lineHeight: 1.5,
	backgroundColor: darkGray.bgButton,
	borderColor: darkGray.borderColor,
	fontFamily: [
		'-apple-system',
		'BlinkMacSystemFont',
		'"Segoe UI"',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'sans-serif',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(','),
	'&:hover': {
		backgroundColor: darkGray.bgButtonHover,
		borderColor: darkGray.borderColorHover,
		boxShadow: 'none',
	},
	'&:active': {
		boxShadow: 'none',
		backgroundColor: darkGray.bgButtonActive,
		borderColor: darkGray.borderColorActive,
	},
	'&:focus': {
		boxShadow: darkGray.boxShadowFocus,
	},
});

export const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	fontSize: '0.8rem',
	color: theme.palette.text.secondary,
}));

export const ItemTitle = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#bdbdbd',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	fontSize: '0.8rem',
	fontWeight: '600',
	color: '#fff',
}));

export const Item3 = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	fontSize: '1.0rem',
	color: theme.palette.text.secondary,
	alignItems: 'center',
	alignContent: 'start',
	display: 'flex',
}));

export const style = {
	position: 'relative',
	top: '0px',

	height: window.innerHeight - 200,
	bgcolor: '#c6eafa',
	border: '1px solid #0f9bd9',
	borderRadius: '3px',
	boxShadow: '0 0 5px 5px gray',
	p: 0,
};

export const styleHow = {
	position: 'relative',
	top: '0px',
	bgcolor: '#c6eafa',
	border: '1px solid #0f9bd9',
	borderRadius: '3px',
	boxShadow: '0 0 5px 5px gray',
	p: 0,
};

export const headerButtonStyle = {
	backgroundColor: bgColorButton,
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	justifyContent: 'center',
	fontSize: '0.9rem',
	height: '80px',
	width: '80px',
	borderRadius: '5px',
	color: bgColorButtonTitle,
};

export const headerStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)',
	alignItems: { xs: 'center', md: 'center' },
	backgroundColor: bgColor,
	height: '90px',
	borderBottom: '2px solid #4cadc5',
	borderTop: '2px solid #4cadc5',
	m: 0,
};
