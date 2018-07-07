import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import HomeScreen from '@screens/Home/Home';
import LoginScreen from '@screens/Login/Login';
import ScreenAddBudget from '@screens/Add/Budget/Budget';

import CategoryScreen from '@screens/Categories/Categories';
import EditCategoryScreen from '@screens/EditCategory/EditCategory';

const CategoryStack = createStackNavigator(
	{
		CategoryScreen,
		EditCategoryScreen,
	},
	{
		initialRouteName: 'CategoryScreen',
	}
);

export default createDrawerNavigator(
	{
		HomeScreen,
		CategoryStack,
		LoginScreen,
		ScreenAddBudget,
	},
	{
		initialRouteName: 'HomeScreen',
	}
);
