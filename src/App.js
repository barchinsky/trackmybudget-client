import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import LoginScreen from '@screens/Login/Login';

import BudgetsScreen from '@screens/Home/Home';
import AddBudgetScreen from '@screens/Add/Budget/Budget';
import BudgetOverviewScreen from '@screens/Budget/Budget';

import CategoryScreen from '@screens/Categories/Categories';
import EditCategoryScreen from '@screens/Edit/Category/Category';
import AddCategoryScreen from '@screens/Add/Category/Category';

import TransactionsScreen from '@screens/Transactions/Transactions';
import AddTransactionScreen from '@screens/Add/Transaction/Transaction';
import EditTransactionScreen from '@screens/Edit/Transaction/Transaction';
import TransactionsOverviewByCategory from '@screens/TransactionsOverviewByCategory/TransactionsOverviewByCategory';

const BudgetsStack = createStackNavigator({
	BudgetsScreen,
	BudgetOverviewScreen,
	TransactionsOverviewByCategory,
});

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
		BudgetsStack,
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
		initialRouteName: 'BudgetsStack',
	}
);
