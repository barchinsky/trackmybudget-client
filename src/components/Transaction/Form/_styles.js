import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flex: 1,
		backgroundColor: '@backgroundColor',
		padding: 10,
	},
	dateContainer: {
		// borderWidth: 1,
		// borderColor: 'red',
	},
	datePicker: {
		width: '100%',
		height: 50,
	},
	buttonContainer: {
		paddingVertical: 5,
	},
	deleteButton: {
		backgroundColor: '@deleteButtonColor',
	},
	input: {
		backgroundColor: '@textInputBgColor',
		borderRadius: '@textInputBorderRadius',
		paddingVertical: 5,
	},
	invalidInput: {
		backgroundColor: '@invalidInputBgColor',
	},
	lableWithHintContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	invalidHintText: {
		fontSize: 12,
		color: 'red',
	},
});
