import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { Button } from 'react-native';
import { PropTypes } from 'prop-types';

import InputLabel from '@components/InputLabel/InputLabel';
import TextInput from '@components/TextInput/TextInput';

import ColorInput from '@components/ColorInput/ColorInput';

import styles from './_styles';

export default class CategoryForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			color: '#98ff00',
		};
	}

	renderTitle = () => {
		const { name } = this.state;

		return (
			<Theme.View styles={styles.titleContainer}>
				<InputLabel text={'Name'} />
				<TextInput onChangeText={this.onChangeName} value={name} />
			</Theme.View>
		);
	};

	onColorSelected = newColor => {
		console.log('onColorSelected:', newColor);
		this.setState({ color: newColor });
	};

	renderColorSelector = () => {
		const { color } = this.state;
		console.log('color:', color);
		return (
			<Theme.View style={styles.colorInputContainer}>
				<ColorInput
					onColorSelected={this.onColorSelected}
					name={color}
					color={color}
				/>
			</Theme.View>
		);
	};

	onSubmit = () => {
		console.warn('Pressed');
		if (this.props.onSubmit) this.props.onSubmit(this.state);
	};

	renderSubmitButton = () => {
		return <Button onPress={this.onSubmit} title="Save" />;
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderTitle()}
				{this.renderColorSelector()}
				{this.renderSubmitButton()}
			</Theme.View>
		);
	}
}

CategoryForm.propTypes = {
	onSubmit: PropTypes.func,
	category: PropTypes.object,
};
