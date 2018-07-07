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
	return dispatch => {
		dispatch(fetchingTransactions());

		// do magic with data
		const result = true;

		// check response
		// .....

		// dispatch action based on response received

		if (result) dispatch(fetchTransactionsSuccess(result));
		else dispatch(fetchTransactionFailed(result));
	};
};
