import { createStyle } from 'react-native-theming';

export default createStyle({
	titleContainer: {
		flex: 1,
	},
	title: {
		fontSize: '@cardTitleFontSize',
	},
	colorContainer: {
		width: 60,
		height: 60,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: '@secondaryTextColor',
	},
});
