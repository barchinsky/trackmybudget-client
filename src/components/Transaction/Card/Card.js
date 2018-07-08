import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';

import Touchable from '@components/Touchable/Touchable';

import styles from './_styles';

export default class TransactionCard extends Component {
	onPress = () => {
		if (this.props.onPress) this.props.onPress(this.props.transaction);
	};
	renderLeftColumn = () => {
		const { category } = this.props.transaction;
		return (
			<Theme.View
				style={[styles.leftColumn, { backgroundColor: category.color }]}
			>
				<Theme.Text style={styles.leftColumnText}>
					{category.name[0]}
				</Theme.Text>
			</Theme.View>
		);
	};

	renderComment = comment => {
		return (
			<Theme.View style={styles.descriptionContainer}>
				<Theme.Text style={styles.descriptionContainer} numberOfLines={3}>
					{comment}
				</Theme.Text>
			</Theme.View>
		);
	};

	renderDate = date => {
		return (
			<Theme.View style={styles.dateContainer}>
				<Theme.Text style={styles.dateContainer}>{date}</Theme.Text>
			</Theme.View>
		);
	};

	renderMiddleColumn = () => {
		const { transaction } = this.props;
		return (
			<Theme.View style={styles.middleColumn}>
				{this.renderComment(transaction.comment)}
				{this.renderDate(transaction.date)}
			</Theme.View>
		);
	};

	renderRightColumn = () => {
		const { transaction } = this.props;
		return (
			<Theme.View style={styles.rightColumn}>
				<Theme.Text style={styles.amountText}>{transaction.amount}</Theme.Text>
			</Theme.View>
		);
	};

	render() {
		return (
			<Touchable style={styles.container}>
				{this.renderLeftColumn()}
				{this.renderMiddleColumn()}
				{this.renderRightColumn()}
			</Touchable>
		);
	}
}

TransactionCard.propTypes = {
	transaction: PropTypes.object,
	onPress: PropTypes.func,
};

TransactionCard.defaultProps = {
	transaction: {
		category: { name: 'Food', color: '#5288dd' },
		comment:
			'Food from Lidl and anjothe long enough text sdsd adas asgdfgdf gdfgdfg',
		date: '2018/07/12 15:43',
		amount: 2345.44,
	},
};
