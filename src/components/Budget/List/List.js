import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import { FlatList } from 'react-native';

import BudgetCard from '@components/Budget/Card/Card';

import styles from './_styles';

export default class BudgetList extends Component {
	renderBudgetCard = item => {
		const budget = item.item;

		return <BudgetCard budget={budget} onPress={this.onBudgetPress} />;
	};

	onBudgetPress = budget => {
		if (this.props.onBudgetPress) this.props.onBudgetPress(budget);
	};

	renderList = () => {
		const { budgets } = this.props;

		return (
			<FlatList
				data={budgets}
				renderItem={this.renderBudgetCard}
				keyExtractor={this._keyExtractor}
			/>
		);
	};

	_keyExtractor = item => '' + item.id;

	render() {
		return (
			<Theme.View style={styles.container}>{this.renderList()}</Theme.View>
		);
	}
}

BudgetList.propTypes = {
	budgets: PropTypes.array,
	onBudgetPress: PropTypes.func,
};

BudgetList.defaultProps = {
	budgets: [],
};
