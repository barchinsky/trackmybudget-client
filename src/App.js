import {
	createStackNavigator,
	createDrawerNavigator,
	createSwitchNavigator,
} from 'react-navigation';

import { getCurrentTheme } from 'react-native-theming';

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

import SettingsScreen from '@screens/Settings/Settings';
import ExportScreen from '@screens/Export/Export';
import ImportScreen from '@screens/Import/Import';

const theme = getCurrentTheme();
const drawerBgColor = theme.def['backgroundColor'];

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

const SettingsStack = createStackNavigator({
	SettingsScreen,
	ExportScreen,
	ImportScreen,
});

export const AppDrawer = createDrawerNavigator(
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
		Settings: {
			screen: SettingsStack,
		},
	},
	{
		initialRouteName: 'Budgets',
		drawerBackgroundColor: drawerBgColor,
	}
);

export default createSwitchNavigator(
	{
		AuthLoading: {
			screen: AuthLoadingScreen,
		},
		App: AppDrawer,
		Auth: LoginScreen,
	},
	{
		initialRouteName: 'AuthLoading',
	}
);
