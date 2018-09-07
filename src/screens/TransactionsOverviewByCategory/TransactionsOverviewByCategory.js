import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';

import TransactionList from '@components/Transaction/List/List';
import CategoryDetailsDashboard from '@components/Category/DetailsDashboard/DetailsDashboard';
import CardDetailsDashboardPlaceholder from '@components/Category/DetailsDashboard/Placeholder/Placeholder';

import styles from './_styles';

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

	componentDidMount() {
		const category = this.props.navigation.getParam('category');
		const transactions = this.props.navigation.getParam('transactions');
		const totalAmountSpent = this.props.navigation.getParam('totalAmount');
		const estimate = this.props.navigation.getParam('categoryEstimate');

		this.setState({ category, transactions, estimate, totalAmountSpent });
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
		console.log('TransactionsOverviewByCategory::onTransactionSelected:', t);
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderHeader()}
				{this.renderTransactionsList()}
			</Theme.View>
		);
	}
}

TransactionsOverviewByCategory.propTypes = {
	navigation: PropTypes.object.isRequired,
};
