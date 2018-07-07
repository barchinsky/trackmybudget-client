import React from 'react';
import { Provider } from 'react-redux';
import App from './src/App';

import store from '@redux/store';

// import { login } from '@api/authorization';
// import {
// 	getUserData,
// 	saveUserLoginAndToken,
// 	clearLocalCreds,
// } from '@api/local-storage';
// import { logIn } from '@redux/actions/account';

// import {
// 	getBudgets,
// 	getBudgetTransactions,
// 	addBudget,
// 	deleteBudget,
// 	updateBudget,
// } from '@api/budget';

import { fetchCategoriesSuccess } from '@redux/actions/categories/fetch';
import { updateCategory } from '@redux/actions/categories/update';
import Category from '@models/category';

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

// const cat1 = new Category({
// 	_id: '5ae232093305571d3ca5d347',
// 	userId: '5adb7ab3ee93b8143273d7ce',
// 	name: 'Cat1Updated',
// 	color: '#2b2b2b',
// 	__v: 0,
// });
//
// const cat2 = new Category({
// 	_id: '5ae232093305571d3ca5d348',
// 	userId: '5adb7ab3ee93b8143273d7ce',
// 	name: 'Cat2Updated',
// 	color: '#2b2b2b',
// 	__v: 0,
// });
//
// store.dispatch(fetchCategoriesSuccess([cat1, cat2]));
//
// cat1.name = 'Cat1';
// store.dispatch(updateCategory(cat1));
//
// cat2.color = 'green';
// store.dispatch(updateCategory(cat2));

store.subscribe(() => {
	// console.log(store.getState().budgets.data);
	console.log(store.getState().categories);
	// console.log(store.getState().userData.token);
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
