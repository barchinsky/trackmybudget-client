// import { addBudget as apiAddBudget } from '@api/budget';
import ASM from '@utils/AsyncStorageManager/AsyncStorageManager';

export const ADDING_BUDGET = 'ADDING_BUDGET';
export const ADD_BUDGET_SUCCESS = 'ADD_BUDGET_SUCCESS';
export const ADD_BUDGET_FAILED = 'ADD_BUDGET_FAILED';

export function addingBudget() {
	return {
		type: ADDING_BUDGET,
	};
}

export function addBudgetSuccess(budget) {
	return {
		type: ADD_BUDGET_SUCCESS,
		payload: budget,
	};
}

export function addBudgetFailed(error) {
	return {
		type: ADD_BUDGET_FAILED,
		payload: error,
	};
}

export function addBudget(budget) {
	return async (dispatch, getState) => {
		// const { token } = getState().userData;
		dispatch(addingBudget());

		try {
			const userId = getState().userData.userId;
			console.log(`redux:addBudget(): userId=${userId}`);
			const result = await ASM.addBudget(budget, userId);

			if (result.status) {
				dispatch(addBudgetSuccess(budget));
			} else {
				dispatch(addBudgetFailed(result.msg));
			}
			return result;
		} catch (e) {
			console.error(`redux::addBudget(): Action failed: ${e.message}`);
			dispatch(addBudgetFailed(e.message));
			return false;
		}
	};
}
