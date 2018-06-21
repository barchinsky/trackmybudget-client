import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import { ColorPicker, toHsv, fromHsv } from 'react-native-color-picker';

import Touchable from '@components/Touchable/Touchable';

import styles from './_styles';

export default class ColorPickerInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			displayPicker: false,
			color: '',
		};
	}

	componentDidMount() {
		this.setState({ color: toHsv(this.props.color) });
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

	onColorSelected = newColor => {
		console.log('new color:', newColor);
		this.setState({ displayPicker: false });

		if (!this.props.onColorSelected) return;

		this.props.onColorSelected(newColor);
	};

	onColorChange = color => {
		console.log('onColorChange:', color);
		this.setState({ color });
	};

	renderCard = () => {
		return (
			<Touchable style={styles.container} onPress={this.onPress}>
				{this.renderTitle()}
				{this.renderColorPreview()}
			</Touchable>
		);
	};

	renderPicker = () => {
		const { color } = this.state;
		console.log('renderPicker:', color);
		return (
			<ColorPicker
				color={color}
				onColorSelected={this.onColorSelected}
				onColorChange={this.onColorChange}
				style={{ flex: 1, backgroundColor: 'black' }}
			/>
		);
	};

	render() {
		const { displayPicker } = this.state;

		return displayPicker ? this.renderPicker() : this.renderCard();
	}
}

ColorPickerInput.propTypes = {
	title: PropTypes.string,
	color: PropTypes.string,
	onColorSelected: PropTypes.func,
};

ColorPicker.defaultProps = {
	color: { h: 1, s: 1, v: 1 },
};
