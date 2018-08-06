import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import BudgetForm from '@components/Form/Budget/Budget';
import { addBudget } from '@redux/actions/budgets/create';

import Budget from '@models/budget';

import styles from './_styles';

export class ScreenAddBudget extends Component {
	onSubmit = async budgetInfo => {
		const budget = new Budget(budgetInfo);
		const isSuccess = await this.props.dispatch(addBudget(budget));

		console.warn('isSuccess:', isSuccess);
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				<BudgetForm onSubmit={this.onSubmit} />
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
};

export default connect()(ScreenAddBudget);
