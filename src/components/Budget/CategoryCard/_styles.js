import { createStyle } from 'react-native-theming';

export default createStyle({
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		height: '@cardHeight',
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: '@secondaryColor'
		// backgroundColor: 'green',
	},
	iconContainer: {
		width: 80,
		justifyContent: 'center',
		alignItems: 'center',
		height: '@cardHeight',
		backgroundColor: 'red'
	},
	iconFont: {
		fontSize: 56,
		color: 'white'
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginHorizontal: 10
		// backgroundColor: 'blue',
	},
	categoryName: {
		fontSize: 22
	},
	estimateInputField: {
		width: 100,
		textAlign: 'center'
	},
	estimateContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		// width: 100,
		marginHorizontal: 10
		// backgroundColor: 'yellow',
	},
	estimateText: {
		// width: 100,
		textAlign: 'center',
		fontSize: 18,
		color: '@textColor'
	}
});
