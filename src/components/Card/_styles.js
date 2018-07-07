import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flex: 1,
		flexDirection: 'row',
		maxHeight: '@menuCardHeight',
		backgroundColor: '@menuCardBgColor',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 5,
	},
});
