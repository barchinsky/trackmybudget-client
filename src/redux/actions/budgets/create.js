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
	return async dispatch => {
		// const { token } = getState().userData;
		dispatch(addingBudget());

		const isSuccess = await ASM.addBudget(budget);

		if (isSuccess) {
			dispatch(addBudgetSuccess(budget));
		} else {
			const e = new Error('Add budget failed');
			dispatch(addBudgetFailed(e));
		}

		return isSuccess;
	};
}
