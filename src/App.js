import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme, { createStyle } from 'react-native-theming';
import { PropTypes } from 'prop-types';
import themes from '@utils/themes';

import LoginScreen from '@screens/Login/Login';

import { logIn } from '@redux/actions/account';

export class App extends Component {
	componentDidMount() {
		themes[0].apply();
		//this.props.dispatch(logIn());
	}

	render() {
		return (
			<Theme.View style={styles.container}>
				<LoginScreen />
			</Theme.View>
		);
	}
}

const styles = createStyle({
	container: {
		flex: 1
	}
});

App.propTypes = {
	dispatch: PropTypes.func
};

export default connect()(App);
