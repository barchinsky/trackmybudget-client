import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flex: 1,
		//flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '@backgroundColor',
	},
	loginForm: {
		//flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		minWidth: '80%',
		// backgroundColor: 'green'
	},
	logoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 50,
		backgroundColor: '@backgroundColor',
	},
	logoText: {
		fontSize: 30,
	},
	textInput: {
		backgroundColor: '@inputFieldBgColor',
	},
	errorText: {
		color: 'red',
		fontSize: 18,
	},
	errorContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
