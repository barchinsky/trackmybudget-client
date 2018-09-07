import { AsyncStorage } from 'react-native';

export function getUserData() {
	//AsyncStorage.setItem('userId', '5adb7ab3ee93b8143273d7ce');
	// AsyncStorage.setItem(
	// 	'token',
	// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1YWRiN2FiM2VlOTNiODE0MzI3M2Q3Y2UiLCJpYXQiOjE1MjY5MTM5NDN9.kXy4dfKvB9CLVorSMUAi0LjvDweRIo6KlmSoiZETETo'
	// );
	console.log('------');
	return new Promise(resolve => {
		AsyncStorage.multiGet(['userId', 'token'], (err, stores) => {
			if (err !== null) {
				console.log(err);
			} else {
				console.log('data received');
				const userDataArray = stores.map((res, i, stores) => {
					let key = stores[i][0];
					let value = stores[i][1];
					return { [key]: value };
				});
				const userData = Object.assign({}, userDataArray[0], userDataArray[1]);
				resolve(userData);
			}
		});
	});
}

export function saveUserLoginAndToken(userId, token) {
	console.log('Saving user data to local storage:', userId, token);
	return AsyncStorage.multiSet([['userId', userId], ['token', token]], err => {
		if (err) {
			console.log('error while saving creds', err);
		}
	});
}

export function clearLocalCreds() {
	return AsyncStorage.multiRemove(['userId', 'token'], err => {
		console.log('error while removing:', err);
	});
}
