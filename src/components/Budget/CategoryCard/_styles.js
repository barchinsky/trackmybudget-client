import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: '@cardHeight',
		width: '100%',
		backgroundColor: 'green',
	},
	iconContainer: {
		width: 80,
		height: '@cardHeight',
		backgroundColor: 'red',
	},
	titleContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'blue',
	},
	categoryEstimateContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'yellow',
		width: 100,
		height: '@cardHeight',
	},
	estimateInputField: {
		width: 100,
	},
});
