import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';

import TransactionList from '@components/Transaction/List/List';

import styles from './_styles';

export class TransactionsScreen extends Component {
	renderNoTransactions = () => {
		return (
			<Theme.View>
				<Theme.Text>No transaction found!</Theme.Text>
			</Theme.View>
		);
	};

	renderTransactions = transactions => {
		return (
			<TransactionList
				transactions={transactions}
				onTransactionSelected={this.transactionSelected}
			/>
		);
	};

	renderContent = () => {
		const { transactions, categories } = this.props;

		const transactionsArray = transactions.data;
		const categoriesArray = categories.data;

		const transactionsWithCategories = transactionsArray.map(transaction => {
			const tranCategory = categoriesArray.find(
				category => category.id === transaction.categoryId
			);

			transaction.category = tranCategory;
			return transaction;
		});

		if (!transactions.data.length) return this.renderNoTransactions();

		return this.renderTransactions(transactionsWithCategories);
	};

	transactionSelected = transaction => {
		console.log('TransactionsScreen::transaction slected:', transaction);
	};

	render() {
		return (
			<Theme.View style={styles.container}>{this.renderContent()}</Theme.View>
		);
	}

	static navigationOptions = navigation => {
		return {
			title: 'Transactions',
		};
	};
}

TransactionsScreen.propTypes = {
	transactions: PropTypes.object,
	categories: PropTypes.object,
};

function mapStateToProps(state) {
	return {
		transactions: state.transactions,
		categories: state.categories,
	};
}

export default connect(mapStateToProps)(TransactionsScreen);
