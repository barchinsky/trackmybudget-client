import React from 'react';
import { ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';

import styles from './_styles';

class AuthLoadingScreen extends React.Component {
	constructor() {
		super();
		this._bootstrapAsync();
	}

	// Fetch the token from storage then navigate to our appropriate place
	_bootstrapAsync = async () => {
		const userToken = await AsyncStorage.getItem('userId');

		// This will switch to the App screen or Auth screen and this loading
		// screen will be unmounted and thrown away.
		setTimeout(() => {
			this.props.navigation.navigate(userToken ? 'App' : 'Auth');
		}, 2000);
	};

	// Render any loading content that you like here
	render() {
		return (
			<Theme.View style={styles.container}>
				<ActivityIndicator size="large" color="#00e0ff" />
				<StatusBar barStyle="default" />
			</Theme.View>
		);
	}
}

AuthLoadingScreen.propTypes = {
	navigation: PropTypes.object,
};

export default AuthLoadingScreen;
