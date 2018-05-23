import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import TextInput from '@components/TextInput/TextInput';

import { Button } from 'react-native';

import { logIn } from '@redux/actions/account';
import styles from './_styles';

export class LoginScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			login: '',
			password: ''
		};
	}

	renderLogo = () => {
		return (
			<Theme.View style={styles.logoContainer}>
				<Theme.Text> TrackMyBudet </Theme.Text>
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
		this.props.dispatch(logIn(login, password, true));
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderLogo()}
				{this.renderLoginForm()}
			</Theme.View>
		);
	}
}

export default connect()(LoginScreen);
