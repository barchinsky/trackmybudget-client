import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';

import BudgetForm from '@components/Budget/Form/Form';
import { addBudget } from '@redux/actions/budgets/create';

import Budget from '@models/budget';

import styles from './_styles';

export class ScreenAddBudget extends Component {
	onSubmit = async budgetInfo => {
		const id = Date.now();
		const budget = new Budget(budgetInfo);
		budget.id = id;
		const isSuccess = await this.props.dispatch(addBudget(budget));

		if (isSuccess.status) {
			this.props.navigation.navigate('Budgets');
		}

		console.warn('isSuccess:', isSuccess);
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				<BudgetForm onSubmit={this.onSubmit} readOnly={false} />
			</Theme.View>
		);
	}

	static navigationOptions = () => {
		return {
			title: 'New Budget',
		};
	};
}

ScreenAddBudget.propTypes = {
	dispatch: PropTypes.func,
	navigation: PropTypes.object,
};

export default connect()(ScreenAddBudget);
