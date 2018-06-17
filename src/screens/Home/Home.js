import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import themes from '@utils/themes';

//import LoginScreen from '@screens/Login/Login';
import SplashScreen from '@screens/Splash/Splash';
import Card from '@components/Card/Card';
import BudgetList from '@components/Budget/List/List';
//import HomeScreen from '@screens/Home/Home';

import { getUserData } from '@api/local-storage';
import { fetchBudgets } from '@redux/actions/budgets/fetch';
import { loginSuccess } from '@redux/actions/account';

import styles from './_styles';

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

		this.loadUserData();
	}

	loadUserData = async () => {
		const userData = await getUserData();
		if (!userData.userId) {
			console.log('userData.userId:', userData.userId);
			this.props.navigation.navigate('LoginScreen');
		} else {
			this.props.dispatch(loginSuccess(userData));

			const initStack = [this.props.dispatch(fetchBudgets())];
			await Promise.all(initStack);

			this.setState({ isLoaded: true, isLoggedIn: true });
		}
	};

	static getDerivedStateFromProps(props, state) {
		if (props.userData.userId && state.isLoggedIn === false) {
			return { isLoggedIn: true, isLoaded: true };
		}

		return null;
	}

	renderBudets = () => {
		const { loading, data, error } = this.props.budgets;

		return <BudgetList budgets={data} />;
	};

	renderContent() {
		const { isLoaded } = this.state;

		return isLoaded ? this.renderBudets() : <SplashScreen />;
	}

	render() {
		return (
			<Theme.View style={styles.container}>{this.renderContent()}</Theme.View>
		);
	}
}

App.propTypes = {
	dispatch: PropTypes.func,
	userData: PropTypes.object,
	navigation: PropTypes.object,
	budgets: PropTypes.array,
};

function mapStateToProps(state) {
	return {
		userData: state.userData,
		budgets: state.budgets,
	};
}

export default connect(mapStateToProps)(App);
