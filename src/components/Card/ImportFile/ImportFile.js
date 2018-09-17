import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import Touchable from '@components/Touchable/Touchable';

import styles from './_styles';

export default class ImportFileCard extends Component {
	renderFileName = () => {
		const { fileName } = this.props;

		return (
			<Theme.View style={styles.fileNameContainer}>
				<Theme.Text style={styles.fileNameText}>{fileName}</Theme.Text>
			</Theme.View>
		);
	};

	renderDetails = () => {
		const { ctime } = this.props;
		const { size } = this.props;

		return (
			<Theme.View style={styles.detailsContainer}>
				<Theme.Text style={styles.ctimeText}>Created: {ctime}</Theme.Text>
				<Theme.Text style={styles.sizeText}>Size: {size}</Theme.Text>
			</Theme.View>
		);
	};

	onPress = () => {
		if (this.props.onPress) this.props.onPress(this.props.fileName);
	};

	render() {
		return (
			<Touchable onPress={this.onPress} style={styles.container}>
				{this.renderFileName()}
				{this.renderDetails()}
			</Touchable>
		);
	}
}

ImportFileCard.propTypes = {
	fileName: PropTypes.string,
	ctime: PropTypes.string,
	size: PropTypes.string,
	onPress: PropTypes.func,
};
