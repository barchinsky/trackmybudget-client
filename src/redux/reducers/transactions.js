import {
	FETCHING_TRANSACTIONS,
	FETCH_TRANSACTIONS_SUCCESS,
	FETCH_TRANSACTIONS_FAILED,
} from '@redux/actions/transactions/fetch';

const initialState = {
	error: null,
	loading: false,
	data: [],
};

export default function(state = initialState, action) {
	switch (action.type) {
	case FETCHING_TRANSACTIONS:
		return {
			...state,
			loading: true,
		};
	case FETCH_TRANSACTIONS_FAILED:
		return {
			...state,
			loading: false,
			error: action.payload,
		};
	case FETCH_TRANSACTIONS_SUCCESS:
		return {
			...state,
			loading: false,
			data: action.payload,
		};
	default:
		return state;
	}
}
