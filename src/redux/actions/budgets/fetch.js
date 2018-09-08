// import { getBudgets } from '@api/budget';
import ASM from '@utils/AsyncStorageManager/AsyncStorageManager';

export const FETCHING_BUDGETS = 'FETCHING_BUDGETS';
export const FETCH_BUDGETS_SUCCESS = 'FETCH_BUDGETS_SUCCESS';
export const FETCH_BUDGETS_FAILED = 'FETCH_BUDGETS_FAILED';

export function fetchingBudgets() {
	return {
		type: FETCHING_BUDGETS,
	};
}

export function fetchBudgetsSuccess(budgets) {
	return {
		type: FETCH_BUDGETS_SUCCESS,
		payload: budgets,
	};
}

export function fetchBudgetsFailed(error) {
	return {
		type: FETCH_BUDGETS_FAILED,
		payload: error,
	};
}

export function fetchBudgets() {
	return async (dispatch, getState) => {
		try {
			const userId = getState().userDate.userId;
			const budgets = await ASM.getBudgets(userId);
			dispatch(fetchBudgetsSuccess(budgets));
		} catch (e) {
			dispatch(fetchBudgetsFailed(e));
		}
	};
}

// export function fetchBudgets() {
// 	return (dispatch, getState) => {
// 		dispatch(fetchingBudgets());
// 		const { userData } = getState();
//
// 		return getBudgets(userData.token)
// 			.then(responseData => {
// 				const { data, error } = responseData;
//
// 				if (error === null) {
// 					dispatch(fetchBudgetsSuccess(data));
// 				} else {
// 					dispatch(fetchBudgetsFailed(error));
// 				}
// 			})
// 			.catch(error => {
// 				console.log('error:', error);
// 				dispatch(fetchBudgetsFailed(error.response.data.error));
// 			});
// 	};
// }
