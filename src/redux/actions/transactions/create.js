import ASM, {
	ASM_STATUS,
} from '@utils/AsyncStorageManager/AsyncStorageManager';

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
	return async (dispatch, getState) => {
		try {
			const userId = getState().userData.userId;
			// console.log('createTransaction()::userId=', userId);
			const res = await ASM.addTransaction(transaction, userId);
			if (res.status == ASM_STATUS.SUCCESS) {
				dispatch(createTransactionSuccess(transaction));
			} else {
				dispatch(createTransactionFailed(res.msg));
			}

			return res.status;
		} catch (e) {
			dispatch(createTransactionFailed(e));
		}
	};
}
