import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '@cardBgColor',
		height: 60,
		borderBottomWidth: 1,
		borderBottomColor: '@secondaryColor',
	},
	fileNameContainer: {
		height: 30,
		paddingVertical: 10,
	},
	fileNameText: {
		fontSize: 14,
		fontWeight: '500',
	},
	detailsContainer: {
		height: 30,
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	ctimeText: {
		fontSize: 12,
		fontWeight: '300',
	},
	sizeText: {
		fontSize: 12,
		fontWeight: '300',
	},
	boldText: {
		fontWeight: '600',
	},
});
