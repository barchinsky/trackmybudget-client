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

	static getDerivedStateFromProps(props, state) {
		if (
			props.category &&
			(props.category.name !== state.name ||
				props.category.color !== state.color)
		) {
			return {
				name: props.category.name,
				color: props.category.color,
			};
		}

		return null;
	}

	renderTitle = () => {
		const { name } = this.state;

		return (
			<Theme.View styles={styles.titleContainer}>
				<InputLabel text={'Name:'} />
				<TextInput onChangeText={this.onChangeName} value={name} />
			</Theme.View>
		);
	};

	onChangeName = name => {
		this.setState({ name });
	};

	onColorSelected = newColor => {
		// console.log('onColorSelected:', newColor);
		this.setState({ color: newColor });
	};

	renderColorSelector = () => {
		const { color } = this.state;
		// console.log('color:', color);
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

	onPressSave = () => {
		const { name, color } = this.state;
		if (this.props.onSave) {
			this.props.onSave({ name, color });
		}
	};

	renderSubmitButton = () => {
		return <Button onPress={this.onPressSave} title="Save" />;
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
	onSave: PropTypes.func,
	category: PropTypes.object,
};
