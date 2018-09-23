import React, { Component } from 'react';
import Theme, { getCurrentTheme } from 'react-native-theming';
import { Button, Switch } from 'react-native';
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
		const { categoryNamePlaceholder } = this.props;

		return (
			<Theme.View styles={styles.titleContainer}>
				<InputLabel text={'Name:'} />
				<TextInput
					onChangeText={this.onChangeName}
					value={name}
					placeholder={categoryNamePlaceholder}
				/>
			</Theme.View>
		);
	};

	renderCategoryTypeInput = () => {
		return (
			<Theme.View style={styles.categoryTypeContainer}>
				<InputLabel text={'Is income?'} />
				<Switch
					onValueChange={this.props.onCategoryTypeChange}
					value={this.props.isIncome}
				/>
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
		const theme = getCurrentTheme();
		const backgroundColor = theme.def['backgroundColor'];
		// console.log('color:', color);
		return (
			<Theme.View style={styles.colorInputContainer}>
				<InputLabel text={'Color:'} />
				<ColorInput
					onColorSelected={this.onColorSelected}
					name={color}
					color={color}
					pickerBgColor={backgroundColor}
				/>
			</Theme.View>
		);
	};

	onPressSave = () => {
		// const { name, color } = this.state;
		if (this.props.onSave) {
			this.props.onSave({ ...this.state });
		}
	};

	renderSubmitButton = () => {
		return <Button onPress={this.onPressSave} title="Save" />;
	};

	renderDeleteButton = () => {
		return this.props.onDelete ? (
			<Button
				style={styles.deleteButton}
				onPress={this.onDelete}
				title="Delete"
			/>
		) : null;
	};

	onDelete = () => {
		this.props.onDelete(this.props.category);
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderTitle()}
				{this.renderColorSelector()}
				{this.renderCategoryTypeInput()}
				{this.renderSubmitButton()}
				{this.renderDeleteButton()}
			</Theme.View>
		);
	}
}

CategoryForm.propTypes = {
	onSave: PropTypes.func,
	onDelete: PropTypes.func,
	category: PropTypes.object,
	categoryNamePlaceholder: PropTypes.string,
	isIncome: PropTypes.bool,
	onCategoryTypeChange: PropTypes.func,
};

CategoryForm.defaultProps = {
	categoryNamePlaceholder: 'Category name',
};
