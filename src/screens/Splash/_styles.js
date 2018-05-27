import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	splashLogoText: {
		fontSize: 25,
		color: '@textColor',
	},
});
