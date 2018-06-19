import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';

import InputLabel from '@components/InputLabel/InputLabel';
import TextInput from '@components/TextInput/TextInput';

import styles from './_styles';

export default class CategoryForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			color: '',
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

	renderColorSelector = () => {};

	render() {
		return (
			<Theme.View style={styles.container}>{this.renderTitle()}</Theme.View>
		);
	}
}

CategoryForm.propTypes = {
	onSubmit: PropTypes.func,
	category: PropTypes.object,
};
