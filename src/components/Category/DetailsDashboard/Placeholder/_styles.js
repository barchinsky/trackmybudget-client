import { createStyle } from 'react-native-theming';
import { StyleSheet } from 'react-native';

export default createStyle({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '@backgroundColor',
		height: 180,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '@secondaryColor',
	},
	categoryName: {
		fontWeight: '600',
		width: 200,
		height: 35,
		backgroundColor: '@placeholderColor',
		marginVertical: 10,
	},
	categoryAmount: {
		fontWeight: '500',
		width: 150,
		height: 25,
		backgroundColor: '@placeholderColor',
	},
});
