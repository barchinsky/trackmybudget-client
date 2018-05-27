import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flex: 1,
		//flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: '@backgroundColor',
	},
	loginForm: {
		//flex: 1,
		justifyContent: 'center',
		alignItems: 'stretch',
		margin: 50,
		// backgroundColor: 'green'
	},
	logoContainer: {
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		//width: 100,
		// height: 100,
		margin: 50,
		backgroundColor: '@backgroundColor',
	},
	logoText: {
		fontSize: 30,
	},
	textInput: {
		backgroundColor: '@inputFieldBgColor',
		//minWidth: 300,
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
