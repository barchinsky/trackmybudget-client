import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import TransactionForm from '@components/Transaction/Form/Form';
import { updateTransaction } from '@redux/actions/transactions/update';
import { deleteTransaction } from '@redux/actions/transactions/delete';

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
				onSubmit={this.onTransactionUpdate}
				onDelete={this.onTransactionDelete}
			/>
		);
	};

	onTransactionUpdate = ({ amount, comment, category, date }) => {
		const tranToUpdate = this.props.navigation.getParam('transaction');
		tranToUpdate.amount = amount;
		tranToUpdate.comment = comment;
		tranToUpdate.categoryId = category.id;
		tranToUpdate.date = date;

		// console.log('onTransactionUpdate:updated:', tranToUpdate);

		this.props.dispatch(updateTransaction(tranToUpdate));
	};

	onTransactionDelete = t => {
		this.props.dispatch(deleteTransaction(t));
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
	dispatch: PropTypes.func,
};

function mapStateToProps(state) {
	return {
		categories: state.categories.data,
	};
}

export default connect(mapStateToProps)(EditTransaction);
