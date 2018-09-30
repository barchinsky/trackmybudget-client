import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { Dimensions } from 'react-native';

import ProgressBar from '@components/ProgressBar/ProgressBar';

import { date, datetime, humanDate } from '@utils/dateFormats';

import Touchable from '@components/Touchable/Touchable';

import styles from './_styles';

export default class BudgetCard extends Component {
	constructor(props) {
		super(props);
	}
	renderLeftColumn = () => {
		const { name } = this.props.budget;
		const firstLetter = name[0];
		return (
			<Theme.View style={styles.leftContainer}>
				<Theme.Text style={styles.budgetNameFirstLetter}>
					{firstLetter}
				</Theme.Text>
			</Theme.View>
		);
	};

	renderBudgetName = () => {
		const { name } = this.props.budget;
		return (
			<Theme.View style={styles.budgetNameContainer}>
				<Theme.Text style={styles.budgetName}>{name}</Theme.Text>
			</Theme.View>
		);
	};

	renderBudgetDates = () => {
		const { startDate, endDate } = this.props.budget;
		const formattedFrom = moment(startDate, datetime)
			.format(humanDate);

		const formattedTo = moment(endDate, datetime)
			.format(humanDate);
		return (
			<Theme.View style={styles.budgetDatesContainer}>
				<Theme.Text style={styles.dateTitle}>{formattedFrom}</Theme.Text>
				<Theme.Text style={styles.dateTitle}>{' - '}</Theme.Text>
				<Theme.Text style={styles.dateTitle}>{formattedTo}</Theme.Text>
			</Theme.View>
		);
	};

	renderMiddleColumn = () => {
		return (
			<Theme.View style={styles.middleContainer}>
				{this.renderBudgetName()}
				{this.renderBudgetDates()}
			</Theme.View>
		);
	};

	renderRightColumn = () => {
		const { spentAmount, estimate } = this.props.budget;
		const data = `${spentAmount}/${estimate}`;
		return (
			<Theme.View style={styles.rightContainer}>
				<Theme.Text
					adjustsFontSizeToFit={true}
					style={styles.amountText}
					numberOfLines={2}
				>
					{data}
				</Theme.Text>
			</Theme.View>
		);
	};

	renderProgressBar = () => {
		// const { progress } = this.state;
		const { spentAmount, estimate } = this.props.budget;
		const safeEstimate = estimate === 0 ? 1 : estimate;
		const progress = Math.floor((spentAmount / safeEstimate) * 100);

		if (progress === null) return null;

		const barWidth = Dimensions.get('screen').width;
		return (
			<Theme.View style={styles.progressBarContainer}>
				<ProgressBar barWidth={barWidth} progress={progress} />
			</Theme.View>
		);
	};

	onPress = () => {
		if (this.props.onPress) this.props.onPress(this.props.budget);
	};

	render() {
		return (
			<Touchable onPress={this.onPress} style={styles.container}>
				{this.renderLeftColumn()}
				{this.renderMiddleColumn()}
				{this.renderRightColumn()}
				{this.renderProgressBar()}
			</Touchable>
		);
	}
}

BudgetCard.propTypes = {
	budget: PropTypes.object,
	onPress: PropTypes.func,
};
