import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import { ColorPicker } from 'react-native-color-picker';

import Card from '@components/Card/Card';

import styles from './_styles';

export default class ColorCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			displayPicker: false,
		};
	}

	renderTitle = () => {
		const { title } = this.props;

		return (
			<Theme.View style={styles.titleContainer}>
				<Theme.Text style={styles.title}>{title}</Theme.Text>
			</Theme.View>
		);
	};

	renderColorPreview = () => {
		const { color } = this.props;

		return (
			<Theme.View style={[styles.colorContainer, { backgroundColor: color }]} />
		);
	};

	onPress = () => {
		this.setState({ displayPicker: true });
	};

	onColorChanged = newColor => {
		const { color } = this.props;
		this.setState({ displayPicker: false });

		if (!this.props.onColorChanged) return;

		if (newColor != color) {
			this.props.onColorChanged(newColor);
		}
	};

	renderCard = () => {
		return (
			<Card onPress={this.onPress}>
				{this.renderTitle()}
				{this.renderColorPreview()}
			</Card>
		);
	};

	renderPicker = () => {
		return (
			<ColorPicker
				onColorSelected={this.onColorChanged}
				style={{ flex: 1, backgroundColor: 'black' }}
			/>
		);
	};

	render() {
		const { displayPicker } = this.state;
		const { enablePicker } = this.props;

		return displayPicker && enablePicker
			? this.renderPicker()
			: this.renderCard();
	}
}

ColorCard.propTypes = {
	title: PropTypes.string,
	color: PropTypes.string,
	onColorChanged: PropTypes.func,
	enablePicker: PropTypes.bool,
};

ColorCard.defaultProps = {
	enablePicker: false,
};
