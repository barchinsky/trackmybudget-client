import ASM from '@utils/AsyncStorageManager/AsyncStorageManager';

export const FETCHING_TRANSACTIONS = 'FETCHING_TRANSACTIONS';
export const FETCH_TRANSACTIONS_SUCCESS = 'FETCH_TRANSACTIONS_SUCCESS';
export const FETCH_TRANSACTIONS_FAILED = 'FETCH_TRANSACTIONS_FAILED';

export const fetchingTransactions = () => {
	return {
		type: FETCHING_TRANSACTIONS,
	};
};

export function fetchTransactionsSuccess(transactions) {
	return {
		type: FETCH_TRANSACTIONS_SUCCESS,
		payload: transactions,
	};
}

export const fetchTransactionFailed = error => {
	return {
		type: FETCH_TRANSACTIONS_FAILED,
		payload: error,
	};
};

export const fetchTransactions = () => {
	console.log('fetchTranasctions()');
	return async dispatch => {
		dispatch(fetchingTransactions());

		try {
			const transactions = await ASM.getTransactions();
			console.log('fetchTransactions().asm:', transactions.length);
			dispatch(fetchTransactionsSuccess(transactions));
		} catch (e) {
			dispatch(fetchTransactionFailed(e));
		}
	};
};
