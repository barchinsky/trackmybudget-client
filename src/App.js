import React, { Component } from 'react';
import Theme, { createStyle } from 'react-native-theming';
import themes from '@utils/themes';

export default class App extends Component {
	componentDidMount() {
		themes[0].apply();
	}

	render() {
		return (
			<Theme.View style={styles.container}>
				<Theme.Text style={styles.welcome}>Welcome to React Native!</Theme.Text>
				<Theme.Text style={styles.instructions}>To get started, edit App.js</Theme.Text>
			</Theme.View>
		);
	}
}

const styles = createStyle({
	container: {
		flex:1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});
