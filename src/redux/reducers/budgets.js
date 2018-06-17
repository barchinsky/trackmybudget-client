import {
	FETCHING_BUDGETS,
	FETCH_BUDGETS_FAILED,
	FETCH_BUDGETS_SUCCESS,
} from '@redux/actions/budgets/fetch';

import {
	ADDING_BUDGET,
	ADD_BUDGET_FAILED,
	ADD_BUDGET_SUCCESS,
} from '@redux/actions/budgets/create';

const initialState = {
	loading: false,
	data: [],
	error: null,
};

export default function(state = initialState, action) {
	switch (action.type) {
	case FETCHING_BUDGETS:
		return {
			...state,
			loading: true,
		};
	case FETCH_BUDGETS_SUCCESS:
		return {
			loading: false,
			error: null,
			data: action.payload,
		};
	case FETCH_BUDGETS_FAILED:
		return {
			...state,
			loading: false,
			error: action.payload,
		};
	case ADDING_BUDGET:
		return state;
	case ADD_BUDGET_SUCCESS:
		return {
			...state,
			data: state.data.concat([action.payload]),
		};
	case ADD_BUDGET_FAILED:
		return {
			...state,
			error: action.payload,
		};
	default:
		return state;
	}
}
