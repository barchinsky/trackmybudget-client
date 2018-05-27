import { login } from '@api/authorization';
import { getUserData, saveUserLoginAndToken } from '@api/local-storage';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';

export function loging() {
	return {
		type: LOGIN
	};
}

export function loginSuccess(accessToken) {
	return {
		type: LOGIN_SUCCESS,
		payload: accessToken
	};
}

export function loginFailed(err) {
	console.log('login failed!', err);
	return {
		type: LOGIN_FAILED,
		payload: err
	};
}

export function logIn(user, pass, rememberMe = false) {
	return dispatch => {
		dispatch(loging());

		getUserData()
			.then(data => {
			//console.log('<------------>', data);
				const { userId, token } = data;
				if (userId && token) {
				// if creds saved locally
					console.log('creds saved locally. Retrieving...');
					return dispatch(loginSuccess(data));
				} else {
				// else
				//console.log('----------->>');
					login(user, pass) // do request to api
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
