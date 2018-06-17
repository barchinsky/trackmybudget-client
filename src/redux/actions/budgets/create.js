import { addBudget as apiAddBudget } from '@api/budget';

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
	return (dispatch, getState) => {
		const { token } = getState().userData;
		dispatch(addingBudget());

		return apiAddBudget(token, budget)
			.then(response => {
				const { error, data } = response;

				if (error) dispatch(addBudgetFailed(error));
				else dispatch(addBudgetSuccess(data));
			})
			.catch(error => {
				dispatch(addBudgetFailed(error));
				throw error;
			});
	};
}
