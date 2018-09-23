import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import { Modal } from 'react-native';
import { ColorPicker, toHsv } from 'react-native-color-picker';

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
		const { name } = this.props;

		return (
			<Theme.View style={styles.titleContainer}>
				<Theme.Text style={styles.title}>{name}</Theme.Text>
			</Theme.View>
		);
	};

	renderCard = () => {
		const { color } = this.props;

		return (
			<Touchable
				style={[styles.container, { backgroundColor: color }]}
				onPress={this.onPress}
			>
				{this.renderTitle()}
			</Touchable>
		);
	};

	onPress = () => {
		this.setState({ displayPicker: true });
	};

	renderPicker = () => {
		const { color, displayPicker } = this.state;
		const { pickerBgColor } = this.props;

		return (
			<Modal
				animationType="slide"
				transparent={false}
				visible={displayPicker}
				onRequestClose={() => {
					this.closeModal();
				}}
			>
				<Theme.View style={styles.pickerContainer}>
					<ColorPicker
						color={color}
						onColorSelected={this.onColorSelected}
						onColorChange={this.onColorChange}
						style={{ flex: 1, backgroundColor: pickerBgColor }}
					/>
				</Theme.View>
			</Modal>
		);
	};

	onColorSelected = newColor => {
		this.setState({ displayPicker: false });

		if (!this.props.onColorSelected) return;

		this.props.onColorSelected(newColor);
	};

	onColorChange = color => {
		this.setState({ color });
	};

	closeModal = () => {
		this.setState({ displayPicker: false });
	};

	render() {
		const { displayPicker } = this.state;

		return displayPicker ? this.renderPicker() : this.renderCard();
	}
}

ColorPickerInput.propTypes = {
	name: PropTypes.string,
	color: PropTypes.string,
	pickerBgColor: PropTypes.string,
	onColorSelected: PropTypes.func,
};

ColorPicker.defaultProps = {
	color: { h: 1, s: 1, v: 1 },
};
