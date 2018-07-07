import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flex: 1,
		flexDirection: 'row',
		maxHeight: '@menuCardHeight',
		height: '@menuCardHeight',
		backgroundColor: '@menuCardBgColor',
		justifyContent: 'flex-start',
	},
	iconContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
	},
	titleContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingLeft: 20,
	},
	title: {
		fontSize: 20,
	},
	icon: {
		fontSize: 34,
	},
	colorContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
	},
	color: {
		borderRadius: 50,
	},
});
