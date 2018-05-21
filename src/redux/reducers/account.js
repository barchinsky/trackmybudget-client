import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS } from '@redux/actions/account';

const initialState = {
	loading: false,
	error: null,
	userId: null,
	token: null
};

export default function(state = initialState, action) {
	switch (action.type) {
	case LOGIN:
		return {
			...state,
			loading: true
		};
	case LOGIN_SUCCESS:
		return {
			loading: false,
			...action.payload,
			error: null
		};
	case LOGIN_FAILED:
		return {
			...state,
			loading: false,
			error: action.payload
		};
	default:
		return state;
	}
}
