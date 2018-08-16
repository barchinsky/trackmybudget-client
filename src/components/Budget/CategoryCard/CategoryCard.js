import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Theme from 'react-native-theming';

import TextInput from '@components/TextInput/TextInput';

import styles from './_styles';

export default class BudgetCategoryCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			estimate: '',
		};
	}

	renderIcon = () => {
		return <Theme.View style={styles.iconContainer}>{true}</Theme.View>;
	};

	renderTitleContainer = () => {
		return <Theme.View style={styles.titleContainer}>{true}</Theme.View>;
	};

	renderEstimateDateInput = () => {
		const { estimate } = this.state;
		return (
			<Theme.View style={styles.categoryEstimateContainer}>
				<TextInput
					style={styles.estimateInputField}
					onChangeText={this.onEstimateChange}
					value={estimate}
					keyboardType="number-pad"
					placeholder="0"
				/>
			</Theme.View>
		);
	};

	onEstimateChange = estimateAsString => {
		const estimateNumber = Number.parseFloat(estimateAsString) || '';

		if (estimateNumber) {
			this.setState({ estimate: estimateNumber.toString() });
		}
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderIcon()}
				{this.renderTitleContainer()}
				{this.renderEstimateDateInput()}
			</Theme.View>
		);
	}
}

BudgetCategoryCard.propTypes = {
	category: PropTypes.object,
	estimate: PropTypes.string,
	onUpdate: PropTypes.func,
};

BudgetCategoryCard.defaultProps = {
	estimate: '0',
};
