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

// import { fetchCategoriesSuccess } from '@redux/actions/categories/fetch';
// import { updateCategory } from '@redux/actions/categories/update';
// import Category from '@models/category';
//
// import { fetchTransactionsSuccess } from '@redux/actions/transactions/fetch';
// import { createTransaction } from '@redux/actions/transactions/create';
// import { deleteTransaction } from '@redux/actions/transactions/delete';
// import { updateTransaction } from '@redux/actions/transactions/update';
// import Transaction from '@models/transaction';

// import DataManager from '@utils/AsyncStorageManager/AsyncStorageManager';
// import FileSystemManager from '@utils/FileSystemManager/FileSystemManager';

// FileSystemManager.saveData('Ololo', 'test.tbud');
// const token =
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YWRiN2FiM2VlOTNiODE0MzI3M2Q3Y2UiLCJpYXQiOjE1MjQ0MzA1NjZ9.mj8mETN1quZhD7bRFoxOcDoILUrEdljhp28FW9TucrQ';

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
// 	_userId: '5adb7ab3ee93b8143273d7ce',
// 	_name: 'Cat1Updated',
// 	_color: '#2b2b2b',
// 	__v: 0,
// });
//
// const cat2 = new Category({
// 	_id: '5ae232093305571d3ca5d348',
// 	_userId: '5adb7ab3ee93b8143273d7ce',
// 	_name: 'Cat2Updated',
// 	_color: '#2b2b2b',
// 	__v: 0,
// });

// const d1 = new Date();
// const d2 = new Date();
// const tran1 = new Transaction({
// 	id: 1,
// 	userId: '1',
// 	comment: 'LIDL food',
// 	date: d1,
// 	amount: 1234.23,
// 	categoryId: '5ae232093305571d3ca5d347',
// });
// const tran2 = new Transaction({
// 	id: 2,
// 	userId: '2',
// 	comment: 'REWE food',
// 	date: d2,
// 	amount: 34.23,
// 	categoryId: '5ae232093305571d3ca5d348',
// });

//
//
// cat1.name = 'Cat1';
// store.dispatch(updateCategory(cat1));
//
// cat2.color = 'green';
// store.dispatch(updateCategory(cat2));

store.subscribe(() => {
	// console.log(store.getState().budgets.data);
	// console.log('------------->', store.getState().budgets);
	// console.log(store.getState().userData.token);
});

// store.dispatch(fetchCategoriesSuccess([cat1, cat2]));
// store.dispatch(fetchTransactionsSuccess([tran1, tran2]));
// store.dispatch(createTransaction(tran1));
// store.dispatch(deleteTransaction(tran1));
// tran1.comment = 'Lidl food updated';
// store.dispatch(updateTransaction(tran1));
// const imData =
// 	'{"transactions":["{\\"_id\\":1536501792736,\\"_userId\\":\\"testid\\",\\"_comment\\":\\"t2\\",\\"_date\\":\\"2018-09-09 16:03\\",\\"_amount\\":\\"1\\",\\"_categoryId\\":1536501760601,\\"_category\\":null}","{\\"_id\\":1536501781461,\\"_userId\\":\\"testid\\",\\"_comment\\":\\"t1\\",\\"_date\\":\\"2018-09-09 16:03\\",\\"_amount\\":\\"1\\",\\"_categoryId\\":1536436773424,\\"_category\\":null}"],"categories":["{\\"_name\\":\\"Food\\",\\"_userId\\":\\"testid\\",\\"_color\\":\\"#00c7ff\\",\\"_id\\":1536501760601}","{\\"_name\\":\\"Cat1\\",\\"_userId\\":\\"testid\\",\\"_color\\":\\"#98ff00\\",\\"_id\\":1536436773424}"],"budgets":["{\\"id\\":1536437031017,\\"name\\":\\"Aug\\",\\"startDate\\":\\"2018/09/08\\",\\"endDate\\":\\"2018/10/09\\",\\"spentAmount\\":10,\\"estimate\\":150,\\"categoryIdToEstimateMap\\":{\\"1536436773424\\":150}}"]}';

// DataManager.__clear__();

// function test() {
// 	setTimeout(async () => {
// 		// const res = await DataManager.exportData('testid');
// 		// const res = await DataManager.importData(imData, 'testid');
// 		// console.log('-------------------------test:', res);
// 		const res = await FileSystemManager.loadData('test.tbud');
// 		console.log(res);
// 		FileSystemManager.listDir();
// 	}, 2000);
// }
//
// test();

export default class AppContainer extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		);
	}
}
