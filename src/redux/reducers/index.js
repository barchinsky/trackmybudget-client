import { combineReducers } from 'redux';

import accountReducer from '@redux/reducers/account';
import budgetsReducer from '@redux/reducers/budgets';

export default combineReducers({
	userData: accountReducer,
	budgets: budgetsReducer,
});
