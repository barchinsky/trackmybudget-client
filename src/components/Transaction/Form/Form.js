import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { Picker } from 'react-native';

import InputLabel from '@components/InputLabel/InputLabel';
import TextInput from '@components/TextInput/TextInput';
import Button from '@components/Button/Button';

import Category from '@models/category';
import { datetime as datetimeFormat } from '@utils/dateFormats';

import styles from './_styles';

const TAG = 'TransactionForm';
export default class TransactionForm extends Component {
	constructor(props) {
		super(props);

		this.defaultCategory = new Category({
			_name: 'Please, select category',
			_id: -1,
			_color: '#fff',
		});

		this.state = {
			id: null,
			comment: null,
			date: null,
			amount: 0,
			category: this.defaultCategory,
			categories: [],
		};
	}

	// static getDerivedStateFromProps(props, state) {
	// 	const { category, amount, comment, date } = props.transaction;
	// 	// console.log('category:', category);
	// 	if (
	// 		category != state.category ||
	// 		amount != state.amount ||
	// 		comment != state.comment ||
	// 		date != state.date
	// 	) {
	// 		// console.log('getDerivedStateFromProps;', props);
	// 		return {
	// 			category: category
	// 				? category
	// 				: { name: 'Please, add category', id: -1 },
	// 			amount,
	// 			comment,
	// 			date: moment(date, datetimeFormat)
	// 				.format(datetimeFormat),
	// 		};
	// 	}
	//
	// 	return null;
	// }

	componentDidMount() {
		// console.log(`${TAG}::componentDidMount():this.props:`, this.props);
		const { transaction, categories } = this.props;

		const id = transaction.id || Date.now();
		const comment = transaction.comment || '';
		const tranDate = transaction.date || new Date();
		const date = moment(tranDate)
			.format(datetimeFormat);
		const amount = transaction.amount || '';

		// display prompt to select category in case no category passed in
		const categoriesList = transaction.category
			? categories
			: [this.defaultCategory, ...categories];
		const category = transaction.category || this.defaultCategory;

		// console.log(`${TAG}:category:`, category);

		this.setState({
			id,
			comment,
			date,
			amount,
			categories: categoriesList,
			category,
		});
	}

	renderDateInput = () => {
		const { date } = this.state;

		return (
			<Theme.View style={styles.dateContainer}>
				<InputLabel text="Date:" />
				<DatePicker
					style={styles.datePicker}
					customStyles={{
						dateInput: {
							borderWidth: 0,
						},
					}}
					date={date}
					mode="datetime"
					placeholder="Choose transaction date"
					format={datetimeFormat}
					confirmBtnText="Confirm"
					cancelBtnText="Cancel"
					onDateChange={date => {
						this.setState({ date: date });
					}}
				/>
			</Theme.View>
		);
	};

	renderAmountInput = () => {
		const { amount } = this.state;
		const { transactionAmountPlaceholder } = this.props;

		return (
			<Theme.View>
				<InputLabel text="Amount:" />
				<TextInput
					onChangeText={this.onChangeAmount}
					value={'' + amount}
					numberOfLines={1}
					keyboardType={'numeric'}
					placeholder={transactionAmountPlaceholder}
				/>
			</Theme.View>
		);
	};

	onChangeAmount = amount => {
		if (!amount) this.setState({ amount });
		if (Number.parseFloat(amount)) {
			this.setState({ amount });
		}
	};

	renderDescriptionInput = () => {
		const { comment } = this.state;
		const { transactionDescPlaceholder } = this.props;

		return (
			<Theme.View>
				<InputLabel text="Description:" />
				<TextInput
					onChangeText={this.onChangeDescription}
					value={comment}
					numberOfLines={1}
					placeholder={transactionDescPlaceholder}
				/>
			</Theme.View>
		);
	};

	onChangeDescription = comment => {
		this.setState({ comment });
	};

	renderCategoryInput = () => {
		// console.log('renderCategoryInput():', this.state.category);
		const currentCategory = this.state.category;
		// console.log(`${TAG}:currentCategory:`, currentCategory);

		return (
			<Theme.View>
				<InputLabel text="Category:" />
				<Picker
					selectedValue={currentCategory}
					style={{
						height: 50,
						width: '100%',
						backgroundColor: currentCategory.color,
					}}
					onValueChange={itemValue => {
						this.setState({ category: itemValue });
					}}
				>
					{this.renderCategoryPickerItems()}
				</Picker>
			</Theme.View>
		);
	};

	renderCategoryPickerItems = () => {
		const { categories } = this.state;
		// categories.unshift({ name: 'Please, select a category' });

		return categories.map(category => (
			<Picker.Item key={category.id} label={category.name} value={category} />
		));
	};

	renderSubmitButton = () => {
		return (
			<Theme.View style={styles.buttonContainer}>
				<Button onPress={this.onPressSubmit} title="Save" />
			</Theme.View>
		);
	};

	onPressSubmit = () => {
		if (this.props.onSubmit) this.props.onSubmit(this.state);
	};

	renderDeleteButton = () => {
		if (!this.props.onDelete) return null;

		return (
			<Theme.View style={styles.buttonContainer}>
				<Button
					onPress={this.onPressDelete}
					color="@deleteButtonColor"
					title="Delete"
				/>
			</Theme.View>
		);
	};

	onPressDelete = () => {
		if (this.props.onDelete) this.props.onDelete(this.props.transaction);
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderDescriptionInput()}
				{this.renderAmountInput()}
				{this.renderCategoryInput()}
				{this.renderDateInput()}
				{this.renderSubmitButton()}
				{this.renderDeleteButton()}
			</Theme.View>
		);
	}
}

TransactionForm.propTypes = {
	transaction: PropTypes.object,
	categories: PropTypes.array,
	onSubmit: PropTypes.func,
	onDelete: PropTypes.func,
	transactionDescPlaceholder: PropTypes.string,
	transactionAmountPlaceholder: PropTypes.string,
};

TransactionForm.defaultProps = {
	transactionDescPlaceholder: 'Transaction details',
	transactionAmountPlaceholder: 'Transaction amount',
};
