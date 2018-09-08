import ASM, {
	ASM_STATUS,
} from '@utils/AsyncStorageManager/AsyncStorageManager';

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
	return async (dispatch, getState) => {
		dispatch(deletingTransaction());
		try {
			const userId = getState().userData.userId;
			const res = await ASM.deleteTransaction(transaction, userId);
			console.log(`deleteTransaction()::${res}`);
			if (res.status == ASM_STATUS.SUCCESS) {
				dispatch(deleteTransactionSuccess(transaction));
			} else {
				dispatch(deleteTransactionFailed(e));
			}

			return res.status;
		} catch (e) {
			dispatch(deleteTransactionFailed(e));
			return 0;
		}
	};
}
