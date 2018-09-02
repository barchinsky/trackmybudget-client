import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import BudgetForm from '@components/Budget/Form/Form';
import DataManager from '@utils/AsyncStorageManager/AsyncStorageManager';

import { updateBudget } from '@redux/actions/budgets/update';

import styles from './_styles';

export class BudgetOverviewScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			budget: null,
			categoryIdTotalAmountMap: {},
			categoryIdTransactionsMap: {},
		};
	}

	componentDidMount() {
		this.prepareData();
	}

	prepareData = async () => {
		this.setState({ loading: true });
		const categoryIdTotalAmountMap = {};
		const categoryIdTransactionsMap = {};

		const budget = this.props.navigation.getParam('budget');
		const { categoryIdToEstimateMap } = budget;

		for (let categoryId in categoryIdToEstimateMap) {
			const transactions = await DataManager.getTransactionsByBudgetAndCategory(
				budget,
				categoryId
			);

			categoryIdTransactionsMap[categoryId] = transactions;
			const totalAmount = transactions.reduce(
				(accum, t) => accum + +t.amount,
				0
			);
			categoryIdTotalAmountMap[categoryId] = totalAmount;
		}
		// console.log(categoryIdTotalAmountMap, categoryIdTransactionsMap);

		this.setState({
			budget,
			categoryIdTotalAmountMap,
			categoryIdTransactionsMap,
		});
	};

	renderBudgetForm = () => {
		// const budget = this.props.navigation.getParam('budget');
		// console.warn('budget:', budget);
		// return null;
		const { budget, categoryIdTotalAmountMap } = this.state;

		if (!budget) return null;

		console.log(
			'---------------------------categoryIdTotalAmountMap:-----------------------------',
			categoryIdTotalAmountMap
		);

		return (
			<BudgetForm
				budget={budget}
				categoryIdTotalAmountMap={categoryIdTotalAmountMap}
				onSubmit={this.onSubmit}
				readOnly={true}
				onBudgetCategoryPress={this.onBudgetCategoryPress}
			/>
		);
	};

	onSubmit = async budget => {
		console.log('BudgetOverviewScreen::onSubmit:', budget);

		try {
			const isSuccess = await this.props.dispatch(updateBudget(budget));
			console.warn('BudgetOverviewScreen:budget update::isSuccess:', isSuccess);
		} catch (e) {
			console.error(e);
		}
	};

	onBudgetCategoryPress = async category => {
		// const budget = this.props.navigation.getParam('budget');
		// const { categoryIdToEstimateMap } = budget;
		// const categoryEstimate = categoryIdToEstimateMap[category.id];
		// const transactions = await DataManager.getTransactionsByBudgetAndCategory(
		// 	budget,
		// 	category.id
		// );
		const { budget, categoryIdTransactionsMap } = this.state;
		const { categoryIdToEstimateMap } = budget;
		const categoryId = category.id;
		const transactions = categoryIdTransactionsMap[categoryId];
		const categoryEstimate = categoryIdToEstimateMap[categoryId];

		this.props.navigation.navigate('TransactionsOverviewByCategory', {
			category,
			transactions,
			categoryEstimate,
		});

		console.log(
			'BudgetOverviewScreen::onBudgetCategoryPress:tranasctions:',
			transactions
		);
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderBudgetForm()}
			</Theme.View>
		);
	}
}

BudgetOverviewScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
};

export default connect()(BudgetOverviewScreen);
