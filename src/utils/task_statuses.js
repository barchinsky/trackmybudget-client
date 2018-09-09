// helpers
export const STATUS = {
	SUCCESS: 1,
	FAILED: 0,
};

// build succes response
export function success(payload) {
	return {
		status: STATUS.SUCCESS,
		msg: '',
		payload: payload,
	};
}

// build failed response
export function failed(msg) {
	return {
		status: STATUS.FAILED,
		msg: msg,
	};
}
