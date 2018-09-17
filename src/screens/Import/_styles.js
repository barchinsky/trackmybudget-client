import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flex: 1,
		backgroundColor: '@backgroundColor',
	},
	placeholderContainer: {
		flex: 1,
	},
	listItemTextPlaceholder: {
		height: 30,
		backgroundColor: '@secondaryColor',
		width: '90%',
	},
});
