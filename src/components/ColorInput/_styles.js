import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 40,
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
	},
	titleContainer: {
		flex: 1,
	},
	title: {
		fontSize: 16,
		color: '@textColor',
		textAlign: 'center',
	},
	pickerContainer: {
		flex: 1,
	},
});
