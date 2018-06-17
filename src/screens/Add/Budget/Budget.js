import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import BudgetForm from '@components/Form/Budget/Budget';
import { addBudget } from '@redux/actions/budgets/create';

import styles from './_styles';

export class ScreenAddBudget extends Component {
	onSubmit = budget => {
		console.warn(budget);
		this.props
			.dispatch(addBudget(budget))
			.then(() => {
				console.warn('Success');
			})
			.catch(error => {
				console.warn('Something happend!', error);
			});
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
			title: 'Add new budget',
		};
	};
}

ScreenAddBudget.propTypes = {
	dispatch: PropTypes.func,
};

export default connect()(ScreenAddBudget);
