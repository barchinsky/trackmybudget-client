import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import HomeScreen from '@screens/Home/Home';
import LoginScreen from '@screens/Login/Login';
import AddBudgetScreen from '@screens/Add/Budget/Budget';

import CategoryScreen from '@screens/Categories/Categories';
import EditCategoryScreen from '@screens/EditCategory/EditCategory';
import AddCategoryScreen from '@screens/Add/Category/Category';

import TransactionsScreen from '@screens/Transactions/Transactions';
import AddTransactionScreen from '@screens/Add/Transaction/Transaction';
import EditTransactionScreen from '@screens/Edit/Transaction/Transaction';

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
		EditTransactionScreen,
	},
	{
		initialRouteName: 'TransactionsScreen',
	}
);

export default createDrawerNavigator(
	{
		HomeScreen,
		Transactions: {
			screen: TransactionsStack,
		},
		Categories: {
			screen: CategoryStack,
		},
		LoginScreen,
		AddBudgetScreen,
		AddCategoryScreen,
		AddTransactionScreen,
	},
	{
		initialRouteName: 'HomeScreen',
	}
);
