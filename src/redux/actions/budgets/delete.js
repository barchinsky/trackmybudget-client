import ASM from '@utils/AsyncStorageManager/AsyncStorageManager';

export const DELETING_BUDGET = 'DELETING_BUDGET';
export const DELETE_BUDGET_SUCCESS = 'DELETE_BUDGET_SUCCESS';
export const DELETE_BUDGET_FAILED = 'DELETE_BUDGET_FAILED';

export function deletingBudget() {
	return {
		type: DELETING_BUDGET,
	};
}

export function deleteBudgetSuccess(budget) {
	return {
		type: DELETE_BUDGET_SUCCESS,
		payload: budget,
	};
}

export function deleteBudgetFailed(error) {
	return {
		type: DELETE_BUDGET_FAILED,
		payload: error,
	};
}

export function deleteBudget(budget) {
	return async dispatch => {
		try {
			const isSuccess = await ASM.deleteBudget(budget);
			if (isSuccess) {
				dispatch(deleteBudgetSuccess(budget));
			} else {
				const error = new Error('Updating budget failed!');
				dispatch(deleteBudgetFailed(error));
			}
		} catch (e) {
			dispatch(deleteBudgetFailed(e));
		}
	};
}
