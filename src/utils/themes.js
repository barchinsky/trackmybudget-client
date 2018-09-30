import { createTheme } from 'react-native-theming';

const themes = [
	createTheme(
		{
			backgroundColor: '#fff',
			secondaryColor: '#b8b8b8',
			disabledBackgroundColor: '#e7e7e7',
			placeholderColor: '#7a807d',
			textColor: '#000',
			secondaryTextColor: '#2f2f2f',
			placeholderTextColor: '#777777',
			inputFieldBgColor: '#cbcbcb',
			menuCardHeight: 80,
			menuCardBgColor: '#d7d7d7',
			budgetCardHeight: 80,
			budgetCardBorderColor: '#c9c9c9',
			cardHeight: 80,
			deleteButtonColor: '#ff5959',
			cardBgColor: '#cfcfcf',
			textInputBgColor: '#f5f5f5',
			textInputBorderRadius: 5,
			invalidInputBgColor: '#f9baba',
		},
		'Light'
	),
];

export default themes;
