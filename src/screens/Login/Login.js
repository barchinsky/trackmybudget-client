import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { Button } from 'react-native';
import PropTypes from 'prop-types';

import TextInput from '@components/TextInput/TextInput';

import { logIn } from '@redux/actions/account';
import styles from './_styles';

const TAG = 'LoginScreen';
export class LoginScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login: '',
			password: '',
			error: null,
		};
	}

	renderError = () => {
		const { error } = this.props;
		const { error: localError } = this.state;

		const errorMessage = error || localError;
		console.log(`${TAG}.renderError: Error: ${errorMessage}`);

		return error || localError ? (
			<Theme.View style={styles.errorContainer}>
				<Theme.Text style={styles.errorText}>{errorMessage}</Theme.Text>
			</Theme.View>
		) : null;
	};

	renderLogo = () => {
		return (
			<Theme.View style={styles.logoContainer}>
				<Theme.Text style={styles.logoText}>Track My Budget</Theme.Text>
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

	doLogin = async () => {
		const { login, password } = this.state;
		const result = await this.props.dispatch(logIn(login, password, true));
		console.log(`${TAG}.doLogin(): result: ${result.status}`);
		if (result.status) {
			this.props.navigation.navigate('App');
		} else {
			this.setState({ error: result.msg });
		}
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
