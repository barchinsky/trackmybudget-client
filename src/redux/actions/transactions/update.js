export const UPDATING_TRANSACTION = 'UPDATING_TRANSACTION';
export const UPDATE_TRANSACTION_SUCCESS = 'UPDATE_TRANSACTION_SUCCESS';
export const UPDATE_TRANSACTION_FAILED = 'UPDATE_TRANSACTION_FAILED';

export function updatingTransaction() {
	return {
		type: UPDATING_TRANSACTION,
	};
}

export function updateTransactionFailed(error) {
	return {
		type: UPDATE_TRANSACTION_FAILED,
		payload: error,
	};
}

export function updateTransactionSuccess(transaction) {
	return {
		type: UPDATE_TRANSACTION_SUCCESS,
		payload: transaction,
	};
}

export function updateTransaction(transaction) {
	return dispatch => {
		dispatch(updatingTransaction());

		// do api or db call
		//...

		const { error } = { error: null };

		if (!error) dispatch(updateTransactionSuccess(transaction));
		else dispatch(updateTransactionFailed(error));
	};
}
