import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import TransactionForm from '@components/Transaction/Form/Form';

import styles from './_styles';

export class EditTransaction extends Component {
	renderForm = () => {
		const { categories } = this.props;
		const transaction = this.props.navigation.getParam('transaction');
		console.log('transationtoedit:', transaction);
		const { amount, comment, categoryId, date } = transaction;

		const category = categories.filter(category => category.id === categoryId);

		return (
			<TransactionForm
				amount={amount}
				comment={comment}
				category={category[0]}
				date={date}
				categories={categories}
				onSubmit={this.onTransacitonUpdate}
			/>
		);
	};

	render() {
		return (
			<Theme.View style={styles.container}>{this.renderForm()}</Theme.View>
		);
	}
}

EditTransaction.propTypes = {
	transaction: PropTypes.object,
	categories: PropTypes.array,
	navigation: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
	return {
		categories: state.categories.data,
	};
}

export default connect(mapStateToProps)(EditTransaction);
