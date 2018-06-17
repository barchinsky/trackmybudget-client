import React from 'react';
import { Provider } from 'react-redux';
import App from './src/App';

import store from '@redux/store';

import { login } from '@api/authorization';
import {
	getUserData,
	saveUserLoginAndToken,
	clearLocalCreds,
} from '@api/local-storage';
import { logIn } from '@redux/actions/account';

import {
	getBudgets,
	getBudgetTransactions,
	addBudget,
	deleteBudget,
	updateBudget,
} from '@api/budget';

const token =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YWRiN2FiM2VlOTNiODE0MzI3M2Q3Y2UiLCJpYXQiOjE1MjQ0MzA1NjZ9.mj8mETN1quZhD7bRFoxOcDoILUrEdljhp28FW9TucrQ';

// saveUserLoginAndToken('1', '2')
// 	.then(err => {
// 		console.log('------------->', err);
// 	});

// getUserData()
// 	.then(data => {
// 		console.log('Local user data:', data);
// 	});

// login('test', '12345')
// 	.then(res => {
// 		console.log(res);
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	});
// clearLocalCreds();

//store.dispatch(logIn('test', '12345', true));
//
// getBudgets(token)
// 	.then(response => console.log(response));

// getBudgetTransactions(token, '5af3511f1e437b3ffa7df948')
// 	.then(data =>
// 		console.log(data)
// 	);

// addBudget(token, {
// 	name: 'test budget',
// 	startDate: '2018-05-01',
// 	endDate: '2018-05-30',
// 	estimate: 1400,
// })
// 	.then(data => {
// 		console.log('created budget:', data);
// 		updateBudget(token, {
// 			id: data.data._id,
// 			name: 'test budget',
// 			startDate: '2018-05-01',
// 			endDate: '2018-05-30',
// 			estimate: 1500,
// 		})
// 			.then(response => console.log('Updated budget:', response));
// 	});

// updateBudget(token, {
// 	id: '5b0c66ed1912c47cb2ad1a07',
// 	name: 'test budget',
// 	startDate: '2018-05-01',
// 	endDate: '2018-05-30',
// 	estimate: 1500,
// })
// 	.then(response => console.log('Updated budget:', response));

// deleteBudget(token, '5b0c642c1912c47cb2ad1a06')
// 	.then(response =>
// 		console.log(response)
// 	);

store.subscribe(() => {
	// console.log(store.getState().budgets.data);
	// console.log(store.getState().budgets.data.length);
	console.log(store.getState().userData.token);
});

export default class AppContainer extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}
