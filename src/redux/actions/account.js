import { login } from '@api/authorization';
import { getUserData, saveUserLoginAndToken } from '@api/local-storage';
import { success, failed } from '@utils/task_statuses';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export function loging() {
	return {
		type: LOGIN,
	};
}

export function loginSuccess(userData) {
	return {
		type: LOGIN_SUCCESS,
		payload: userData,
	};
}

export function loginFailed(err) {
	//console.log('login failed!', err);
	return {
		type: LOGIN_FAILED,
		payload: err,
	};
}

export function _logIn(user, pass, rememberMe = false) {
	return dispatch => {
		dispatch(loging());

		return getUserData()
			.then(data => {
				console.log('<------------>', data);
				const { userId, token } = data;
				if (userId && token) {
				// if creds saved locally
					console.log('creds saved locally. Retrieving...');
					dispatch(loginSuccess(data));
					return;
				} else {
				// else
				//console.log('----------->>');
					return login(user, pass) // do request to api
						.then(response => {
						//console.log('------------>>>', response);
							const { data, error } = response;
							if (!error) {
							// if user wants to save creads locally
								if (rememberMe) {
									saveUserLoginAndToken(data.userId, data.token); // save to local storage
								}
								return dispatch(loginSuccess(data));
							} else {
							//console.log('error received', error);
								return dispatch(loginFailed(error));
							}
						})
						.catch(err => {
						//console.log('----------->>>>', err);
							return dispatch(loginFailed(err));
						});
				}
			});
	};
}

export function logIn(userId, token) {
	return async dispatch => {
		try {
			await saveUserLoginAndToken(userId, token); // save to local storage
			dispatch(loginSuccess({ userId, token }));
			return success();
		} catch (e) {
			console.log(`redux::logIn():: Error: ${e.message}`);
			dispatch(loginFailed(e.message));
			return failed(e.message);
		}
	};
}
