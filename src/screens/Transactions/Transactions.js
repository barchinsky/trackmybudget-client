import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';

import TransactionList from '@components/Transaction/List/List';

import styles from './_styles';

export class TransactionsScreen extends Component {
	state = {
		transactions: []
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.updateStateTransactions();
	}

	componentDidUpdate(prevProps) {
		if (
			this.props.transactions.data.length != prevProps.transactions.data.length
		) {
			this.updateStateTransactions();
		}
	}

	updateStateTransactions = () => {
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

		this.setState({ transactions: transactionsWithCategories });
	};

	renderNoTransactions = () => {
		return (
			<Theme.View
				style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
			>
				<Theme.Text>No transactions found!</Theme.Text>
			</Theme.View>
		);
	};

	renderTransactions = () => {
		const { transactions } = this.state;
		return transactions.length ? (
			<TransactionList
				transactions={transactions}
				onTransactionSelected={this.transactionSelected}
			/>
		) : (
			this.renderNoTransactions()
		);
	};

	renderContent = () => {
		// const { transactions, categories } = this.props;
		// const transactionsArray = transactions.data;
		// const categoriesArray = categories.data;
		// if (!transactionsArray.length) return this.renderNoTransactions();
		// const transactionsWithCategories = transactionsArray.map(transaction => {
		// 	const tranCategory = categoriesArray.find(
		// 		category => category.id === transaction.categoryId
		// 	);
		// 	transaction.category = tranCategory;
		// 	return transaction;
		// });
		// return this.renderTransactions(transactionsWithCategories);
	};

	transactionSelected = transaction => {
		console.log('TransactionsScreen::transaction selected:', transaction);
		this.props.navigation.navigate('EditTransactionScreen', { transaction });
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderTransactions()}
			</Theme.View>
		);
	}

	static navigationOptions = () => {
		return {
			title: 'Transactions'
		};
	};
}

TransactionsScreen.propTypes = {
	transactions: PropTypes.object,
	categories: PropTypes.object,
	navigation: PropTypes.object
};

function mapStateToProps(state) {
	return {
		transactions: state.transactions,
		categories: state.categories
	};
}

export default connect(mapStateToProps)(TransactionsScreen);
