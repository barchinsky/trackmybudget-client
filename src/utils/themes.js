import { createTheme } from 'react-native-theming';

const themes = [
	createTheme(
		{
			backgroundColor: '#ffffff',
			textColor: '#000',
			placeholderTextColor: '#777777',
			inputFieldBgColor: '#cbcbcb',
		},
		'Light'
	),
];

export default themes;
