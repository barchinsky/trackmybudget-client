import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';

import TransactionList from '@components/Transaction/List/List';
import CategoryDetailsDashboard from '@components/Category/DetailsDashboard/DetailsDashboard';
import CardDetailsDashboardPlaceholder from '@components/Category/DetailsDashboard/Placeholder/Placeholder';

import styles from './_styles';

const TAG = 'TransactionsOverviewByCategory';
export default class TransactionsOverviewByCategory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			transactions: [],
			category: null,
			totalAmountSpent: 0,
			estimate: 0,
		};
	}

	// componentDidMount() {
	// 	const category = this.props.navigation.getParam('category');
	// 	const transactions = this.props.navigation.getParam('transactions');
	// 	const totalAmountSpent = this.props.navigation.getParam('totalAmount');
	// 	const estimate = this.props.navigation.getParam('categoryEstimate');
	//
	// 	// assign category data to transaction
	// 	transactions.map(t => {
	// 		t.category = category;
	// 	});
	//
	// 	this.setState({ category, transactions, estimate, totalAmountSpent });
	// }

	static getDerivedStateFromProps(props, state) {
		const category = props.navigation.getParam('category');
		const transactions = props.navigation.getParam('transactions');
		const totalAmountSpent = props.navigation.getParam('totalAmount');
		const estimate = props.navigation.getParam('categoryEstimate');

		console.log(
			`${TAG}.getDerivedStateFromProps():: transactions.length: ${
				transactions.length
			}`
		);

		let newState = {};
		if (category != state.category) {
			newState = { ...newState, category };
		}

		if (transactions.length != state.transactions.length) {
			// assign category data to transaction
			transactions.map(t => {
				t.category = category;
			});

			newState = {
				...newState,
				transactions,
			};
		}

		if (totalAmountSpent != state.totalAmountSpent) {
			newState = { ...newState, totalAmountSpent };
		}

		if (estimate != state.estimate) {
			newState = { ...newState, estimate };
		}

		if (newState != {}) {
			console.log(`${TAG}.getDerivedStateFromProps::newState:`, newState);
			return newState;
		}

		return null;
	}

	componentDidUpdate(prevProps) {
		const transactions = this.props.navigation.getParam('transactions');
		const prevTransactions = prevProps.navigation.getParam('transactions');

		console.log(
			`${TAG}.componentDidUpdate():: transactions.length:${
				transactions.length
			}, prevTransactions.length:${prevTransactions.length}`
		);
	}

	renderHeader = () => {
		const { category, totalAmountSpent, estimate } = this.state;

		if (!(category && totalAmountSpent && estimate))
			return <CardDetailsDashboardPlaceholder />;

		const amountText = `${totalAmountSpent} / ${estimate}`;
		return (
			<CategoryDetailsDashboard name={category.name} amountText={amountText} />
		);
	};

	renderTransactionsList = () => {
		const { transactions } = this.state;

		return (
			<Theme.View style={styles.transactionsContainer}>
				<TransactionList
					transactions={transactions}
					onTransactionSelected={this.onTransactionSelected}
				/>
			</Theme.View>
		);
	};

	onTransactionSelected = t => {
		// console.log('TransactionsOverviewByCategory::onTransactionSelected:', t);
		this.props.navigation.navigate('EditTransactionScreen', { transaction: t });
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderHeader()}
				{this.renderTransactionsList()}
			</Theme.View>
		);
	}

	static navigationOptions = ({ navigation }) => {
		const category = navigation.getParam('category');
		return {
			title: `${category.name}'s transactions`,
		};
	};
}

TransactionsOverviewByCategory.propTypes = {
	navigation: PropTypes.object.isRequired,
};
