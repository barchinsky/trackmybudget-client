import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flex: 1,
		maxHeight: '@cardHeight',
		// borderWidth: 1,
		// borderColor: 'yellow',
		flexDirection: 'row',
	},
	leftColumn: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		maxWidth: 80,
		// borderWidth: 1,
		// borderColor: 'green',
	},
	leftColumnText: {
		fontSize: 60,
		fontWeight: '400',
	},
	middleColumn: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		paddingLeft: 10,
		paddingTop: 5,
		// borderWidth: 1,
		// borderColor: 'red',
		// flexDirection: 'row',
	},
	descriptionContainer: {
		// flex: 1,
		paddingBottom: 1,
		// maxHeight: 25,
		// borderWidth: 1,
		// borderColor: 'green',
	},
	descriptionText: {
		fontSize: 18,
		fontWeight: '500',
		color: '@textColor',
	},
	dateContainer: {
		flex: 1,
		maxHeight: 20,
		// borderWidth: 1,
		// borderColor: '#d400ff',
	},
	dateText: {
		fontSize: 20,
		color: '@textColor',
	},
	rightColumn: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		maxWidth: 100,
		// borderWidth: 1,
		// borderColor: 'blue',
	},
	amountText: {
		fontSize: 20,
		color: '@textColor',
	},
});
