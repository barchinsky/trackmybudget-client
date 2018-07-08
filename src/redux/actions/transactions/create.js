export const CREATING_TRANSACTION = 'CREATING_TRANSACTION';
export const CREATE_TRANSACTION_SUCCESS = 'CREATE_TRANSACTION_SUCCESS';
export const CREATE_TRANSACTION_FAILED = 'CREATE_TRANSACTION_FAILED';

export function creatingTransaction() {
	return {
		type: CREATING_TRANSACTION,
	};
}

export function createTransactionFailed(error) {
	return {
		type: CREATE_TRANSACTION_FAILED,
		payload: error,
	};
}

export function createTransactionSuccess(transaction) {
	return {
		type: CREATE_TRANSACTION_SUCCESS,
		payload: transaction,
	};
}

export function createTransaction(transaction) {
	return dispatch => {
		// do api or db call
		//...
		const { error } = { error: false };
		// process result
		if (!error) dispatch(createTransactionSuccess(transaction));
		else dispatch(createTransactionFailed(error));
	};
}
