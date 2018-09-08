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
	return async (dispatch, getState) => {
		try {
			const userId = getState().userData.userId;
			const result = await ASM.updateBudget(budget, userId);
			if (result.status) {
				dispatch(updateBudgetSuccess(budget));
			} else {
				dispatch(updateBudgetFailed(result.msg));
			}

			return result;
		} catch (e) {
			console.error(`redux::updateBudget: action failed: ${e.message}`);
			dispatch(updateBudgetFailed(e.message));
		}
	};
}
