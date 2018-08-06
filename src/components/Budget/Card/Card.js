import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import { Dimensions } from 'react-native';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

import { date, datetime } from '@utils/dateFormats';

import Touchable from '@components/Touchable/Touchable';

import styles from './_styles';

export default class BudgetCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			progress: 20,
		};
	}
	renderLeftColumn = () => {
		return (
			<Theme.View style={styles.leftContainer}>
				<Theme.Text>B</Theme.Text>
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
			.format(date);

		const formattedTo = moment(endDate, datetime)
			.format(date);
		return (
			<Theme.View style={styles.budgetDatesContainer}>
				<Theme.Text style={styles.dateTitle}>From:{formattedFrom}</Theme.Text>
				<Theme.Text style={styles.dateTitle}>To:{formattedTo}</Theme.Text>
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
				<Theme.Text numberOfLines={2}>{data}</Theme.Text>
			</Theme.View>
		);
	};

	renderProgressBar = () => {
		const { progress } = this.state;

		if (progress === null) return null;

		const barWidth = Dimensions.get('screen').width;
		return (
			<Theme.View style={styles.progressBarContainer}>
				<ProgressBarAnimated
					width={barWidth}
					value={progress}
					borderColor="white"
					borderRadius={0}
				/>
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
