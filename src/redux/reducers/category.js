import {
	FETCHING_CATEGORIES,
	FETCH_CATEGORIES_FAILED,
	FETCH_CATEGORIES_SUCCESS,
} from '@redux/actions/category';

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
	default:
		return state;
	}
}
