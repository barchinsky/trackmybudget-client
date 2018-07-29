import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { Button, Picker } from 'react-native';

import InputLabel from '@components/InputLabel/InputLabel';
import TextInput from '@components/TextInput/TextInput';

import {
	date as dateFormat,
	datetime as datetimeFormat,
} from '@utils/dateFormats';

import styles from './_styles';

export default class TransactionForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: Date.now(),
			comment: '',
			date: moment()
				.format(dateFormat),
			amount: '0',
			category: null,
		};
	}

	static getDerivedStateFromProps(props, state) {
		const { category, amount, comment, date } = props.transaction;
		console.log('category:', category);
		if (
			category != state.category ||
			amount != state.amount ||
			comment != state.comment ||
			date != state.date
		) {
			// console.log('getDerivedStateFromProps;', props);
			return {
				category: category
					? category
					: { name: 'Please, add category', id: -1 },
				amount,
				comment,
				date: moment(date, datetimeFormat)
					.format(dateFormat),
			};
		}

		return null;
	}

	renderDateInput = () => {
		const { date } = this.state;
		// console.log('date:', date);

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
					mode="date"
					placeholder="Choose transaction date"
					format={dateFormat}
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

		return (
			<Theme.View>
				<InputLabel text="Amount:" />
				<TextInput
					onChangeText={this.onChangeAmount}
					value={'' + amount}
					numberOfLines={1}
					keyboardType={'number-pad'}
				/>
			</Theme.View>
		);
	};

	onChangeAmount = amount => {
		if (amount == '') this.setState({ amount });
		if (Number.parseFloat(amount)) {
			this.setState({ amount });
		}
	};

	renderCommentInput = () => {
		const { comment } = this.state;

		return (
			<Theme.View>
				<InputLabel text="Description:" />
				<TextInput
					onChangeText={this.onChangeDescription}
					value={comment}
					numberOfLines={1}
					keyboardType={'number-pad'}
				/>
			</Theme.View>
		);
	};

	onChangeDescription = comment => {
		this.setState({ comment });
	};

	renderCategoryInput = () => {
		console.log('renderCategoryInput():', this.state.category);
		return (
			<Theme.View>
				<InputLabel text="Category:" />
				<Picker
					selectedValue={this.state.category}
					style={{ height: 50, width: '100%' }}
					onValueChange={(itemValue, itemIndex) => {
						this.setState({ category: itemValue });
					}}
				>
					{this.renderCategoryPickerItems()}
				</Picker>
			</Theme.View>
		);
	};

	renderCategoryPickerItems = () => {
		const { categories } = this.props;
		// categories.unshift({ name: 'Please, select a category' });

		return categories.map(category => (
			<Picker.Item key={category.id} label={category.name} value={category} />
		));
	};

	renderSubmitButton = () => {
		return <Button onPress={this.onPressSubmit} title="Save" />;
	};

	onPressSubmit = () => {
		if (this.props.onSubmit) this.props.onSubmit(this.state);
	};

	renderDeleteButton = () => {
		if (!this.props.onDelete) return null;

		return <Button onPress={this.onPressDelete} title="Delete" />;
	};

	onPressDelete = () => {
		if (this.props.onDelete) this.props.onDelete(this.props.transaction);
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderCommentInput()}
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
};

TransactionForm.defaultProps = {
	categories: [{ name: 'Please, add category', id: -1 }],
};
