import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flex: 1,
		backgroundColor: '@backgroundColor',
	},
	sectionHeaderContainer: {
		height: 30,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		backgroundColor: '@secondaryColor',
		paddingLeft: 5,
	},
	sectionHeaderText: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	listItemContainer: {
		height: 40,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingLeft: 10,
	},
	listItemText: {
		fontSize: 16,
	},
	disabled: {
		backgroundColor: '@disabledBackgroundColor',
	},
});
