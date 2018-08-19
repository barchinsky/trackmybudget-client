import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Theme from 'react-native-theming';
import { Dimensions } from 'react-native';

import TextInput from '@components/TextInput/TextInput';
import ProgressBar from '@components/ProgressBar/ProgressBar';

import styles from './_styles';

export default class BudgetCategoryCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			estimate: '',
		};
	}

	renderIcon = () => {
		const { category } = this.props;
		const catName = category.name;
		const firstLetter = catName[0];
		const bgColor = category.color;

		return (
			<Theme.View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
				<Theme.Text style={styles.iconFont}>{firstLetter}</Theme.Text>
			</Theme.View>
		);
	};

	renderTitleContainer = () => {
		const { category } = this.props;
		const catName = category.name;
		return (
			<Theme.View style={styles.titleContainer}>
				<Theme.Text style={styles.categoryName}>{catName}</Theme.Text>
			</Theme.View>
		);
	};

	renderEstimateInput = () => {
		const { estimate } = this.state;
		return (
			<Theme.View style={styles.estimateContainer}>
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

	renderEstimate = () => {
		const { estimate, spent } = this.props;

		const spentToEstimate = `${spent} / ${estimate}`;
		return (
			<Theme.View style={styles.estimateContainer}>
				<Theme.Text
					style={styles.estimateText}
					numberOfLines={1}
					adjustsFontSizeToFit={true}
				>
					{spentToEstimate}
				</Theme.Text>
			</Theme.View>
		);
	};

	onEstimateChange = estimateAsString => {
		const { category } = this.props;
		const estimateNumber = Number.parseFloat(estimateAsString) || '';

		this.setState({ estimate: estimateNumber.toString() });

		if (this.props.onUpdate) this.props.onUpdate(category.id, estimateNumber);
	};

	renderProgressBar = () => {
		const { displayProgress, progress } = this.props;
		const { width } = Dimensions.get('screen');

		return displayProgress ? (
			<ProgressBar progress={progress} barWidth={width} />
		) : null;
	};

	render() {
		const { readOnly } = this.props;

		const estimate = readOnly
			? this.renderEstimate()
			: this.renderEstimateInput();

		return (
			<Theme.View style={styles.container}>
				{this.renderIcon()}
				{this.renderTitleContainer()}
				{estimate}
				{this.renderProgressBar()}
			</Theme.View>
		);
	}
}

BudgetCategoryCard.propTypes = {
	category: PropTypes.object.isRequired,
	estimate: PropTypes.string,
	spent: PropTypes.string,
	displayProgress: PropTypes.bool,
	progress: PropTypes.number,
	readOnly: PropTypes.bool,
	onUpdate: PropTypes.func,
};

BudgetCategoryCard.defaultProps = {
	estimate: '0',
	spent: '0',
	displayProgress: false,
	progress: 0,
	readOnly: true,
};
