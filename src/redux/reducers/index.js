import { combineReducers } from 'redux';

import accountReducer from '@redux/reducers/account';

export default combineReducers({
	userData: accountReducer
});
