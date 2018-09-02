import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import BudgetForm from '@components/Budget/Form/Form';
import DataManager from '@utils/AsyncStorageManager/AsyncStorageManager';

import { updateBudget } from '@redux/actions/budgets/update';

import styles from './_styles';

export class EditBudgetScreen extends Component {
	renderBudgetForm = () => {
		const budget = this.props.navigation.getParam('budget');
		// console.warn('budget:', budget);
		// return null;
		return (
			<BudgetForm
				budget={budget}
				onSubmit={this.onSubmit}
				readOnly={true}
				onBudgetCategoryPress={this.onBudgetCategoryPress}
			/>
		);
	};

	onSubmit = async budget => {
		console.log('EditBudget::onSubmit:', budget);

		try {
			const isSuccess = await this.props.dispatch(updateBudget(budget));
			console.warn('budget update::isSuccess:', isSuccess);
		} catch (e) {
			console.error(e);
		}
	};

	onBudgetCategoryPress = async categoryId => {
		const budget = this.props.navigation.getParam('budget');
		const transactions = await DataManager.getTransactionsByBudgetAndCategory(
			budget,
			categoryId
		);

		console.log(
			'EditBudgetScreen::onBudgetCategoryPress:tranasctions:',
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

EditBudgetScreen.propTypes = {
	navigation: PropTypes.object.isRequired,
	dispatch: PropTypes.func.isRequired,
};

export default connect()(EditBudgetScreen);
