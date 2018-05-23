import { createTheme } from 'react-native-theming';

const themes = [
	createTheme(
		{
			backgroundColor: '#ffffff',
			textColor: '#000',
			placeholderTextColor: '#9e9e9e',
			inputFieldBgColor: '#b1b1b1'
		},
		'Light'
	)
];

export default themes;
