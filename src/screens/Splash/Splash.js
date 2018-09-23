import React, { Component } from 'react';
import Theme from 'react-native-theming';

import styles from './_styles.js';

export default class SplashScreen extends Component {
	render() {
		return (
			<Theme.View style={styles.container}>
				<Theme.Text style={styles.splashLogoText}>Track My Budget</Theme.Text>
			</Theme.View>
		);
	}
}
