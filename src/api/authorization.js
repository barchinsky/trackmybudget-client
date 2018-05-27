import axios from '@utils/axios';

export function signUp(login, pass, firstName, secondName) {
	const uri = '/signup';

	const body = {
		login: login,
		password: pass,
		firstName: firstName,
		secondName: secondName
	};

	return axios.post(uri, body);
}

export function login(login, pass) {
	const uri = '/login';

	const body = {
		email: login,
		password: pass
	};

	return axios.post(uri, body)
		.then(response => response.data);
}
