import ASM from '@utils/AsyncStorageManager/AsyncStorageManager';

export const DELETING_TRANSACTION = 'DELETING_TRANSACTION';
export const DELETE_TRANSACTION_SUCCESS = 'DELETE_TRANSACTION_SUCCESS';
export const DELETE_TRANSACTION_FAILED = 'DELETE_TRANSACTION_FAILED';

export function deletingTransaction() {
	return {
		type: DELETING_TRANSACTION,
	};
}

export function deleteTransactionFailed(error) {
	return {
		type: DELETE_TRANSACTION_FAILED,
		payload: error,
	};
}

export function deleteTransactionSuccess(transaction) {
	return {
		type: DELETE_TRANSACTION_SUCCESS,
		payload: transaction,
	};
}

export function deleteTransaction(transaction) {
	return async dispatch => {
		dispatch(deletingTransaction());
		try {
			await ASM.deleteTransaction(transaction);
			dispatch(deleteTransactionSuccess(transaction));
		} catch (e) {
			dispatch(deleteTransactionFailed(e));
		}
	};
}
