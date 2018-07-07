import {
	FETCHING_CATEGORIES,
	FETCH_CATEGORIES_FAILED,
	FETCH_CATEGORIES_SUCCESS,
} from '@redux/actions/categories/fetch';

import { UPDATE_CATEGORY_SUCCESS } from '@redux/actions/categories/update';
import { CREATE_CATEGORY_SUCCESS } from '@redux/actions/categories/create';

const initialState = {
	loading: false,
	data: [],
	error: null,
};

export default function(state = initialState, action) {
	switch (action.type) {
	case FETCHING_CATEGORIES:
		return {
			...state,
			loading: true,
		};
	case FETCH_CATEGORIES_FAILED:
		return {
			...state,
			loading: false,
			error: action.payload,
		};
	case FETCH_CATEGORIES_SUCCESS:
		return {
			loading: false,
			error: null,
			data: action.payload,
		};
	case UPDATE_CATEGORY_SUCCESS:
		return {
			...state,
			data: state.data.map(
				category =>
					category.id === action.payload.id ? action.payload : category
			),
		};
	case CREATE_CATEGORY_SUCCESS:
		console.log('create category success:', action.payload);
		return {
			...state,
			data: state.data.concat([action.payload]),
		};
	default:
		return state;
	}
}
