import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import { FlatList } from 'react-native';

import TransactionCard from '@components/Transaction/Card/Card';

import styles from './_styles';

export default class TransactionList extends Component {
	transactionSelected = transaction => {
		console.log('TransactionList:: transaction selected:', transaction);
	};

	renderList = () => {
		console.log('renderList()');
		const { transactions } = this.props;
		console.log('tranasctions:', transactions.length);
		return (
			<FlatList
				data={transactions}
				keyExtractor={this._keyExtractor}
				renderItem={this.renderTransactionCard}
			/>
		);
	};

	_keyExtractor = item => '' + item.id;

	renderTransactionCard = item => {
		console.log('renderTransactionCard()');
		const transaction = item.item;

		return (
			<TransactionCard
				transaction={transaction}
				onPress={this.transactionSelected}
			/>
		);
	};

	render() {
		return (
			<Theme.View style={styles.container}>{this.renderList()}</Theme.View>
		);
	}
}

TransactionList.propTypes = {
	transactions: PropTypes.array,
};
