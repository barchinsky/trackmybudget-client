import {
	FETCHING_TRANSACTIONS,
	FETCH_TRANSACTIONS_SUCCESS,
	FETCH_TRANSACTIONS_FAILED,
} from '@redux/actions/transactions/fetch';

import {
	CREATING_TRANSACTION,
	CREATE_TRANSACTION_SUCCESS,
	CREATE_TRANSACTION_FAILED,
} from '@redux/actions/transactions/create';

import { DELETE_TRANSACTION_SUCCESS } from '@redux/actions/transactions/delete';
import {
	UPDATE_TRANSACTION_SUCCESS,
	UPDATE_TRANSACTION_FAILED,
} from '@redux/actions/transactions/update';

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
	case CREATING_TRANSACTION:
		return {
			...state,
			loading: true,
		};
	case CREATE_TRANSACTION_FAILED:
		return {
			...state,
			loading: false,
			error: action.payload,
		};
	case CREATE_TRANSACTION_SUCCESS:
		return {
			error: null,
			loading: false,
			data: [action.payload].concat(state.data),
		};
	case DELETE_TRANSACTION_SUCCESS:
		return {
			error: null,
			loading: false,
			data: state.data.filter(
				transaction => transaction.id !== action.payload.id
			),
		};
	case UPDATE_TRANSACTION_SUCCESS:
		return {
			loading: false,
			error: null,
			data: state.data.map(
				transaction =>
					transaction.id == action.payload.id ? action.payload : transaction
			),
		};
	case UPDATE_TRANSACTION_FAILED:
		return {
			...state,
			loading: false,
			error: action.payload,
		};
	default:
		return state;
	}
}
