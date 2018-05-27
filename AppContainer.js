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
//clearLocalCreds();

//store.dispatch(logIn('test', '12345', true));

store.subscribe(() => {
	console.log(store.getState());
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
