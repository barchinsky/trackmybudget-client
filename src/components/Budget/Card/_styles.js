import { createStyle } from 'react-native-theming';
import { StyleSheet } from 'react-native';

export default createStyle({
	container: {
		flex: 1,
		flexDirection: 'row',
		height: '@budgetCardHeight',
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '@budgetCardBorderColor',
		paddingBottom: 13,
	},
	leftContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 80,
	},
	middleContainer: {
		flex: 1,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
	},
	budgetNameContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	budgetName: {
		fontSize: 20,
		color: '@textColor',
	},
	budgetDatesContainer: {
		flex: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		// alignItems: 'center',
	},
	dateTitle: {
		color: '@secondaryTextColor',
		fontSize: 14,
		paddingRight: 4,
		fontWeight: '400',
	},
	rightContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 100,
		padding: 4,
	},
	amountText: {
		fontSize: 16,
		fontWeight: '500',
	},
	progressBarContainer: {
		flex: 0,
		position: 'absolute',
		bottom: 0,
		left: 0,
	},
	budgetNameFirstLetter: {
		fontSize: 50,
	},
});
