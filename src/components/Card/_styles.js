import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flex: 1,
		flexDirection: 'row',
		maxHeight: '@menuCardHeight',
		backgroundColor: '@menuCardBgColor',
		justifyContent: 'flex-start',
	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
	},
	titleContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingLeft: 20,
	},
	title: {
		fontSize: 24,
	},
	icon: {
		width: 50,
		height: 50,
	},
	amountContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
	},
	amount: {
		fontSize: 18,
		color: '@textColor',
	},
	progressBarContainer: {
		flex: 0,
		position: 'absolute',
		bottom: 0,
		left: 0,
	},
});
