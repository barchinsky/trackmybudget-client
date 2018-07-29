import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import moment from 'moment';

import TransactionForm from '@components/Transaction/Form/Form';

import Transaction from '@models/transaction';
import { createTransaction } from '@redux/actions/transactions/create';

import { dateFormat } from '@utils/dateFormats';

import styles from './_styles';

export class AddTransactionScreen extends Component {
	onSave = ({ id, comment, amount, category, date }) => {
		// console.warn('category:', category);
		const categoryId = category.id;
		const { userId } = this.props;
		const t = new Transaction({
			_id: id,
			_userId: userId,
			_amount: amount,
			_comment: comment,
			_categoryId: categoryId,
			_date: date,
		});
		// console.warn('transaction to save:', t);

		this.props.dispatch(createTransaction(t));
	};

	render() {
		const { categories } = this.props;
		const amount = 0;
		const date = moment()
			.format(dateFormat);
		const category = categories[0];

		const defaultTransaction = new Transaction({
			_date: date,
			_amount: amount,
		});
		defaultTransaction.category = category;

		return (
			<Theme.View style={styles.container}>
				<TransactionForm
					transaction={defaultTransaction}
					categories={categories}
					onSubmit={this.onSave}
				/>
			</Theme.View>
		);
	}
}

AddTransactionScreen.navigationOptions = () => {
	return {
		title: 'New Transaction',
	};
};

AddTransactionScreen.propTypes = {
	userId: PropTypes.string,
	categories: PropTypes.array,
	dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return {
		userId: state.userData.userId,
		categories: state.categories.data,
	};
}

export default connect(mapStateToProps)(AddTransactionScreen);
