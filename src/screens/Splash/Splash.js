import React, { Component } from 'react';
import Theme from 'react-native-theming';
import * as pack from 'trackmybudget/package.json';

import styles from './_styles.js';

export default class SplashScreen extends Component {
	renderVersion = () => {
		return <Theme.Text style={styles.versionText}>{pack.version}</Theme.Text>;
	};
	render() {
		return (
			<Theme.View style={styles.container}>
				<Theme.Text style={styles.splashLogoText}>Track My Budget</Theme.Text>
				{this.renderVersion()}
			</Theme.View>
		);
	}
}
