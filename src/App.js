import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import HomeScreen from '@screens/Home/Home';
import LoginScreen from '@screens/Login/Login';
import ScreenAddBudget from '@screens/Add/Budget/Budget';

export default createDrawerNavigator(
	{
		HomeScreen,
		LoginScreen,
		ScreenAddBudget,
	},
	{
		initialRouteName: 'HomeScreen',
	}
);
