import {
	createStackNavigator,
	createDrawerNavigator,
	createSwitchNavigator,
} from 'react-navigation';

import AuthLoadingScreen from '@screens/AuthLoading/AuthLoading';
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
	EditTransactionScreen,
});

const CategoryStack = createStackNavigator(
	{
		CategoryScreen,
		EditCategoryScreen,
		AddCategoryScreen,
	},
	{
		initialRouteName: 'CategoryScreen',
	}
);

const TransactionsStack = createStackNavigator(
	{
		TransactionsScreen,
		EditTransactionScreen,
		AddTransactionScreen,
	},
	{
		initialRouteName: 'TransactionsScreen',
	}
);

export const AppStack = createDrawerNavigator(
	{
		Budgets: {
			screen: BudgetsStack,
		},
		Transactions: {
			screen: TransactionsStack,
		},
		Categories: {
			screen: CategoryStack,
		},
		'New Transaction': {
			screen: AddTransactionScreen,
		},
		'New Category': {
			screen: AddCategoryScreen,
		},
		'New budget': {
			screen: AddBudgetScreen,
		},
	},
	{
		initialRouteName: 'Budgets',
	}
);

export default createSwitchNavigator(
	{
		AuthLoading: {
			screen: AuthLoadingScreen,
		},
		App: AppStack,
		Auth: LoginScreen,
	},
	{
		initialRouteName: 'AuthLoading',
	}
);
