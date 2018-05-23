import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	loginForm: {
		// flex: 1,
		// justifyContent: 'center',
		// alignItems: 'center',
		// //		margin: 10,
		// backgroundColor: 'green'
	},
	logoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 100,
		height: 100,
		backgroundColor: 'grey'
	},
	textInput: {
		backgroundColor: '@inputFieldBgColor',
		minWidth: 300
	}
});
