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
			const result = await ASM.deleteBudget(budget);
			if (result.status) {
				dispatch(deleteBudgetSuccess(budget));
			} else {
				dispatch(deleteBudgetFailed(result.msg));
			}

			return result;
		} catch (e) {
			dispatch(deleteBudgetFailed(e.message));
			console.error(`redux::deleteBudget(): action failed: ${e.message}`);
			return false;
		}
	};
}
