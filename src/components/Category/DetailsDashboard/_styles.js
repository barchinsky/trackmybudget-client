import { createStyle } from 'react-native-theming';
import { StyleSheet } from 'react-native';

export default createStyle({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 180,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '@secondaryColor',
	},
	categoryName: {
		fontSize: 35,
		fontWeight: '600',
	},
	categoryAmount: {
		fontSize: 20,
		fontWeight: '500',
	},
});
