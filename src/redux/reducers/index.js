import { combineReducers } from 'redux';

import accountReducer from '@redux/reducers/account';
import budgetsReducer from '@redux/reducers/budgets';
import categoriesReducer from '@redux/reducers/category';
import transactionsReducer from '@redux/reducers/transactions';

export default combineReducers({
	userData: accountReducer,
	budgets: budgetsReducer,
	categories: categoriesReducer,
	transactions: transactionsReducer,
});
