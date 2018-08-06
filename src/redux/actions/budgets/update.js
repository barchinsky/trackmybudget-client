import ASM from '@utils/AsyncStorageManager/AsyncStorageManager';

export const UPDATING_BUDGET = 'UPDATING_BUDGET';
export const UPDATE_BUDGET_SUCCESS = 'UPDATE_BUDGET_SUCCESS';
export const UPDATE_BUDGET_FAILED = 'UPDATE_BUDGET_FAILED';

export function updatingBudget() {
	return {
		type: UPDATING_BUDGET,
	};
}

export function updateBudgetSuccess(budget) {
	return {
		type: UPDATE_BUDGET_SUCCESS,
		payload: budget,
	};
}

export function updateBudgetFailed(error) {
	return {
		type: UPDATE_BUDGET_FAILED,
		payload: error,
	};
}

export function updateBudget(budget) {
	return async dispatch => {
		try {
			const isSuccess = await ASM.updateBudget(budget);
			if (isSuccess) {
				dispatch(updateBudgetSuccess(budget));
			} else {
				const error = new Error('Updating budget failed!');
				dispatch(updateBudgetFailed(error));
			}
		} catch (e) {
			dispatch(updateBudgetFailed(e));
		}
	};
}
