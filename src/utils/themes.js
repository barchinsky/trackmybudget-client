import { createTheme } from 'react-native-theming';

const themes = [
	createTheme(
		{
			backgroundColor: '#ffffff',
			secondaryColor: '#b8b8b8',
			placeholderColor: '#7a807d',
			textColor: '#000',
			secondaryTextColor: '#2f2f2f',
			placeholderTextColor: '#777777',
			inputFieldBgColor: '#cbcbcb',
			menuCardHeight: 80,
			menuCardBgColor: '#d7d7d7',
			budgetCardHeight: 80,
			budgetCardBorderColor: '#c9c9c9',
			cardTitleFontSize: 25,
			cardHeight: 80,
		},
		'Light'
	),
];

export default themes;
