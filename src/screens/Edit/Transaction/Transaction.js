import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import TransactionForm from '@components/Transaction/Form/Form';
import { updateTransaction } from '@redux/actions/transactions/update';
import { deleteTransaction } from '@redux/actions/transactions/delete';

import styles from './_styles';

const TAG = 'EditTransaction';
export class EditTransaction extends Component {
	renderForm = () => {
		const { categories } = this.props;
		const transaction = this.props.navigation.getParam('transaction');
		// console.log('transationtoedit:', transaction);
		const { categoryId } = transaction;

		const category = categories.find(category => category.id === categoryId);
		transaction.category = category;

		return (
			<TransactionForm
				transaction={transaction}
				categories={categories}
				onSubmit={this.onTransactionUpdate}
				onDelete={this.onTransactionDelete}
			/>
		);
	};

	onTransactionUpdate = async ({ amount, comment, category, date }) => {
		const tranToUpdate = this.props.navigation.getParam('transaction');
		tranToUpdate.amount = amount;
		tranToUpdate.comment = comment;
		tranToUpdate.categoryId = category.id;
		tranToUpdate.date = date;
		tranToUpdate.category = null;

		// console.log('onTransactionUpdate:updated:', tranToUpdate);

		const res = await this.props.dispatch(updateTransaction(tranToUpdate));

		console.log(`${TAG}::onTransactionUpdate()::result=${res}`);
	};

	onTransactionDelete = async t => {
		try {
			await this.props.dispatch(deleteTransaction(t));
			this.props.navigation.goBack();
		} catch (e) {
			console.log(`${TAG}.onTransactionDelete()::Error:${e.message}`);
		}
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
