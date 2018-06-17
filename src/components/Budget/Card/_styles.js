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
		backgroundColor: '#db8582',
	},
	middleContainer: {
		flex: 1,
		padding: 5,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'yellow',
	},
	budgetNameContainer: {
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#d2043b',
	},
	budgetName: {
		fontSize: 20,
		color: '@textColor',
	},
	budgetDatesContainer: {
		flex: 0,
		flexDirection: 'row',
		backgroundColor: '#000',
		justifyContent: 'space-between',
		// alignItems: 'center',
	},
	dateTitle: {
		color: '@secondaryTextColor',
		fontSize: 14,
		paddingRight: 4,
	},
	rightContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 100,
		backgroundColor: '#07c9f4',
		padding: 4,
	},
	progressBarContainer: {
		flex: 0,
		position: 'absolute',
		bottom: 0,
		left: 0,
	},
});
