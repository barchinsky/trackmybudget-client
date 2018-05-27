import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme, { createStyle } from 'react-native-theming';
import { PropTypes } from 'prop-types';
import themes from '@utils/themes';

import LoginScreen from '@screens/Login/Login';
import SplashScreen from '@screens/Splash/Splash';
import HomeScreen from '@screens/Home/Home';

import { getUserData } from '@api/local-storage';

import { logIn } from '@redux/actions/account';

export class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoaded: false,
			isLoggedIn: false,
		};
	}

	componentDidMount() {
		themes[0].apply();
		//this.props.dispatch(logIn());
		// fetch locally saved user data
		getUserData()
			.then(userData => {
				this.setState({ isLoaded: true, isLoggedIn: !!userData.userId });
			});
	}

	static getDerivedStateFromProps(props, state) {
		if (props.userData.userId && state.isLoggedIn === false) {
			return { isLoggedIn: true };
		}

		return null;
	}

	renderStartScreen = () => {
		const { isLoaded, isLoggedIn } = this.state;

		if (!isLoaded) {
			return <SplashScreen />;
		} else if (isLoggedIn) {
			return <HomeScreen />;
		} else {
			return <LoginScreen />;
		}
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderStartScreen()}
			</Theme.View>
		);
	}
}

const styles = createStyle({
	container: {
		flex: 1,
	},
});

App.propTypes = {
	dispatch: PropTypes.func,
	userData: PropTypes.object,
};

function mapStateToProps(state) {
	return {
		userData: state.userData,
	};
}

export default connect(mapStateToProps)(App);
