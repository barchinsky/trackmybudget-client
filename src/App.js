import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme, { createStyle } from 'react-native-theming';
import { PropTypes } from 'prop-types';
import themes from '@utils/themes';

import { logIn } from '@redux/actions/account';

export class App extends Component {
	componentDidMount() {
		themes[0].apply();
		//this.props.dispatch(logIn());
	}

	render() {
		return (
			<Theme.View style={styles.container}>
				<Theme.Text style={styles.welcome}>Welcome to React Native!</Theme.Text>
				<Theme.Text style={styles.instructions}>
					To get started, edit App.js
				</Theme.Text>
			</Theme.View>
		);
	}
}

const styles = createStyle({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

App.propTypes = {
	dispatch: PropTypes.func
};

export default connect()(App);
