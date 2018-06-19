import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';

import styles from './_styles';

export default class InputLabel extends Component {
	render() {
		return (
			<Theme.View style={styles.container}>
				<Theme.Text style={styles.text}>{this.props.text}</Theme.Text>
			</Theme.View>
		);
	}
}

InputLabel.propTypes = {
	text: PropTypes.string,
};
