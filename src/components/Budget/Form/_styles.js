import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flex: 1,
		backgroundColor: '@backgroundColor',
		padding: 5,
	},
	saveButtonContainer: {
		marginTop: 5,
	},
	datePicker: {
		width: '100%',
		height: 50,
	},
});
