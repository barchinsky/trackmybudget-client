import React, { Component } from 'react';
import Theme from 'react-native-theming';

import styles from './_styles';

export default class HomeScreen extends Component {
	render() {
		return (
			<Theme.View style={styles.container}>
				<Theme.Text>Im the HomeScreen component</Theme.Text>
			</Theme.View>
		);
	}
}
