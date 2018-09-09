import { combineReducers } from 'redux';

import accountReducer from '@redux/reducers/account';
import budgetsReducer from '@redux/reducers/budgets';
import categoriesReducer from '@redux/reducers/category';
import transactionsReducer from '@redux/reducers/transactions';
import appReducer from '@redux/reducers/app';

export default combineReducers({
	app: appReducer,
	userData: accountReducer,
	budgets: budgetsReducer,
	categories: categoriesReducer,
	transactions: transactionsReducer,
});
