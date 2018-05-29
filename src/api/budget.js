import axios from '@utils/axios.js';

export function getBudgets(token) {
	const uri = '/budgets';

	const headers = {
		token,
	};

	return axios.get(uri, { headers })
		.then(response => response.data);
}

export function getBudgetTransactions(token, budgetId) {
	const uri = '/budget/transactions';

	const headers = {
		token,
	};

	const body = {
		budget: budgetId,
	};

	return axios.post(uri, body, { headers })
		.then(response => response.data);
}

export function addBudget(token, budget) {
	const uri = '/add/budget';

	const headers = { token };
	const body = { ...budget };

	return axios.post(uri, body, { headers })
		.then(response => response.data);
}

export function deleteBudget(token, budget) {
	const uri = '/remove/budget';

	const headers = { token };
	const body = { budget };

	return axios.post(uri, body, { headers })
		.then(response => response.data);
}

export function updateBudget(token, budget) {
	console.log('updateBudget:', budget);
	const uri = '/update/budget';

	const headers = { token };
	const body = {
		budget: budget.id,
		name: budget.name,
		startDate: budget.startDate,
		endDate: budget.endDate,
		estimate: budget.estimate,
	};

	return axios.post(uri, body, { headers })
		.then(response => response.data);
}
