import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 60,
		padding: 5,
		borderBottomWidth: 1,
		borderBottomColor: '@secondaryTextColor',
	},
	titleContainer: {
		flex: 1,
	},
	title: {
		fontSize: '@cardTitleFontSize',
	},
	colorContainer: {
		width: 50,
		height: 50,
		borderRadius: 50,
		borderWidth: 1,
		borderColor: '@secondaryTextColor',
	},
});
