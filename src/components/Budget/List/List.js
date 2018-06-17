import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import { FlatList } from 'react-native';

import BudgetCard from '@components/Budget/Card/Card';

import styles from './_styles';

export default class BudgetList extends Component {
	renderBudgetCard = item => {
		const budget = item.item;

		return <BudgetCard budget={budget} />;
	};

	renderList = () => {
		const { budgets } = this.props;

		return <FlatList data={budgets} renderItem={this.renderBudgetCard} />;
	};
	render() {
		return (
			<Theme.View style={styles.container}>{this.renderList()}</Theme.View>
		);
	}
}

BudgetList.propTypes = {
	budgets: PropTypes.array,
};

BudgetList.defaultProps = {
	budgets: [],
};
