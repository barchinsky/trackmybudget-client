import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flex: 1,
		backgroundColor: '@backgroundColor',
	},
	titleContainer: {
		marginVertical: 10,
	},
	colorInputContainer: {
		marginVertical: 10,
		height: 60,
	},
	deleteButton: {
		backgroundColor: '#f54b4b',
		marginVertical: 10,
	},
	categoryTypeContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 10,
	},
});
