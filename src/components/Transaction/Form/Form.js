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

		this.amountExp = /^[0-9]+(\.[0-9]{0,2})?/;

		this.state = {
			id: null,
			comment: null,
			date: null,
			amount: 0,
			category: this.defaultCategory,
			categories: [],
			isAmountValid: true,
			isDescriptiontValid: true,
			isCategoryValid: true,
		};
	}

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
		const { amount, isAmountValid } = this.state;
		const { transactionAmountPlaceholder } = this.props;

		const amountLable = 'Amount:';
		let invalidHint;

		if (!isAmountValid) {
			invalidHint = this.getAmountHint(amount);
		}
		const lable = !isAmountValid ? (
			this.renderLabelWithHint(amountLable, invalidHint)
		) : (
			<InputLabel text={amountLable} />
		);

		return (
			<Theme.View>
				{lable}
				<TextInput
					style={[styles.input, isAmountValid ? null : styles.invalidInput]}
					underlineColorAndroid="transparent"
					onChangeText={this.onChangeAmount}
					value={'' + amount}
					numberOfLines={1}
					keyboardType={'numeric'}
					placeholder={transactionAmountPlaceholder}
				/>
			</Theme.View>
		);
	};

	getAmountHint = amount => {
		if (!amount.length) {
			return 'Amount can\'t be empty';
		}

		if (!Number.parseFloat(amount)) {
			return 'Amount should be a valid number';
		}

		return '';
	};

	onChangeAmount = amount => {
		console.log(`${TAG}.onChangeAmount():amount: ${amount}`);
		this.isAmountValid(amount);
		const matchRes = this.amountExp.exec(amount);
		const a = matchRes ? matchRes[0] : amount;
		console.log(`${TAG}.onChangeAmount:a:${a}`);
		this.setState({ amount: a });
	};

	isAmountValid = amount => {
		let isAmountValid = false;
		console.log(`${TAG}.isAmountValid(): amount:${amount}`);
		if (!this.amountExp.test(amount)) {
			this.setState({ isAmountValid });
			return isAmountValid;
		}

		isAmountValid = true;
		this.setState({ isAmountValid });
		return isAmountValid;
	};

	renderLabelWithHint = (lable, hint) => {
		return (
			<Theme.View style={styles.lableWithHintContainer}>
				<InputLabel text={lable} />
				<Theme.Text style={styles.invalidHintText}>{hint}</Theme.Text>
			</Theme.View>
		);
	};

	renderDescriptionInput = () => {
		const { comment, isDescriptiontValid } = this.state;
		const { transactionDescPlaceholder } = this.props;

		const descriptionLable = 'Description:';
		const invalidHint = 'Can\'t be empty';

		console.log(`${TAG}.renderDescriptionInput():: isDescriptiontValid: `);

		const lable = !isDescriptiontValid ? (
			this.renderLabelWithHint(descriptionLable, invalidHint)
		) : (
			<InputLabel text={descriptionLable} />
		);

		return (
			<Theme.View>
				{lable}
				<TextInput
					style={[
						styles.input,
						isDescriptiontValid ? null : styles.invalidInput,
					]}
					underlineColorAndroid="transparent"
					onChangeText={this.onChangeDescription}
					value={comment}
					numberOfLines={1}
					placeholder={transactionDescPlaceholder}
				/>
			</Theme.View>
		);
	};

	onChangeDescription = comment => {
		this.isValidDescription(comment);
		this.setState({ comment });
	};

	isValidDescription = description => {
		const isDescriptiontValid = !!description && description.length; // description should not be empty
		console.log(
			`${TAG}.isValidDescription(): ${isDescriptiontValid}`,
			isDescriptiontValid
		);
		this.setState({ isDescriptiontValid });
		return isDescriptiontValid;
	};

	renderCategoryInput = () => {
		const categoryLable = 'Category:';
		const invalidHint = 'Please, select category!';
		// console.log('renderCategoryInput():', this.state.category);
		const { category: currentCategory, isCategoryValid } = this.state;
		// console.log(`${TAG}:currentCategory:`, currentCategory);
		const lable = isCategoryValid ? (
			<InputLabel text={categoryLable} />
		) : (
			this.renderLabelWithHint(categoryLable, invalidHint)
		);

		return (
			<Theme.View>
				{lable}
				<Picker
					selectedValue={currentCategory}
					style={{
						height: 50,
						width: '100%',
						backgroundColor: isCategoryValid
							? currentCategory.color
							: styles.invalidInputBgColor,
					}}
					onValueChange={category => {
						this.isCategoryValid(category);
						this.setState({ category });
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

	isCategoryValid = category => {
		const isCategoryValid = category.id != -1;
		this.setState({ isCategoryValid });

		return isCategoryValid;
	};

	renderSubmitButton = () => {
		return (
			<Theme.View style={styles.buttonContainer}>
				<Button onPress={this.onPressSubmit} title="Save" />
			</Theme.View>
		);
	};

	onPressSubmit = () => {
		console.log(`${TAG}:onPressSubmit:${this.isInputsValid()}`);
		if (this.props.onSubmit && this.isInputsValid()) {
			this.props.onSubmit(this.state);
		}
	};

	isInputsValid = () => {
		const { comment, amount, category } = this.state;
		return (
			this.isValidDescription(comment) &&
			this.isAmountValid(amount) &&
			this.isCategoryValid(category)
		);
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
	transactionDescPlaceholder: 'Details of transaction',
	transactionAmountPlaceholder: 'Amount spent',
};
