import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { Button } from 'react-native';
import PropTypes from 'prop-types';

import TextInput from '@components/TextInput/TextInput';

import { logIn } from '@redux/actions/account';
import styles from './_styles';

export class LoginScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login: '',
			password: '',
		};
	}

	renderError = () => {
		const { error } = this.props;
		console.log('error:', error);
		return error ? (
			<Theme.View style={styles.errorContainer}>
				<Theme.Text style={styles.errorText}>{error.message}</Theme.Text>
			</Theme.View>
		) : null;
	};

	renderLogo = () => {
		return (
			<Theme.View style={styles.logoContainer}>
				<Theme.Text style={styles.logoText}> TrackMyBudet </Theme.Text>
			</Theme.View>
		);
	};

	renderLoginForm = () => {
		return (
			<Theme.View style={styles.loginForm}>
				<TextInput
					style={styles.textInput}
					numberOfLines={1}
					onChangeText={this.onLoginChange}
					placeholder={'Login'}
					placeholderTextColor={'@placeholderTextColor'}
					value={this.state.login}
				/>
				<TextInput
					style={styles.textInput}
					numberOfLines={1}
					onChangeText={this.onPasswordChange}
					placeholder={'Password'}
					placeholderTextColor={'@placeholderTextColor'}
					value={this.state.pass}
					secureTextEntry={true}
				/>
				<Button
					onPress={this.doLogin}
					title={'Login'}
					style={{ backgroundColor: '#3783e7' }}
				/>
			</Theme.View>
		);
	};

	onLoginChange = loginText => {
		this.setState({ login: loginText });
	};

	onPasswordChange = passwordText => {
		this.setState({ password: passwordText });
	};

	doLogin = () => {
		const { login, password } = this.state;
		this.props
			.dispatch(logIn(login, password, true))
			.then(() => {
				if (this.props.error === null)
					this.props.navigation.navigate('HomeScreen');
			})
			.catch(err => {
				console.log('Login failed---------->:', err);
			});
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderLogo()}
				{this.renderLoginForm()}
				{this.renderError()}
			</Theme.View>
		);
	}
}

LoginScreen.navigationOptions = () => {
	return { title: 'Login' };
};

LoginScreen.propTypes = {
	error: PropTypes.object,
	loading: PropTypes.bool,
	dispatch: PropTypes.func,
	navigation: PropTypes.object,
};

function mapStateToProps(state) {
	return {
		error: state.userData.error,
		loading: state.userData.loading,
	};
}

export default connect(mapStateToProps)(LoginScreen);
