import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import HomeScreen from '@screens/Home/Home';
import LoginScreen from '@screens/Login/Login';
import ScreenAddBudget from '@screens/Add/Budget/Budget';

import CategoryScreen from '@screens/Categories/Categories';
import EditCategoryScreen from '@screens/EditCategory/EditCategory';
import ScreenAddCategory from '@screens/Add/Category/Category';

import TransactionsScreen from '@screens/Transactions/Transactions';

const CategoryStack = createStackNavigator(
	{
		CategoryScreen,
		EditCategoryScreen,
	},
	{
		initialRouteName: 'CategoryScreen',
	}
);

const TransactionsStack = createStackNavigator(
	{
		TransactionsScreen,
	},
	{
		initialRouteName: 'TransactionsScreen',
	}
);

export default createDrawerNavigator(
	{
		HomeScreen,
		TransactionsStack,
		CategoryStack,
		LoginScreen,
		ScreenAddBudget,
		ScreenAddCategory,
	},
	{
		initialRouteName: 'HomeScreen',
	}
);
