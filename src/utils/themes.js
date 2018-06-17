import { createTheme } from 'react-native-theming';

const themes = [
	createTheme(
		{
			backgroundColor: '#ffffff',
			textColor: '#000',
			secondaryTextColor: '#166c7d',
			placeholderTextColor: '#777777',
			inputFieldBgColor: '#cbcbcb',
			menuCardHeight: 80,
			menuCardBgColor: '#d7d7d7',
			budgetCardHeight: 80,
			budgetCardBorderColor: '#c9c9c9',
		},
		'Light'
	),
];

export default themes;
