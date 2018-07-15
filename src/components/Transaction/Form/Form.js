import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { Button, Picker } from 'react-native';

import InputLabel from '@components/InputLabel/InputLabel';
import TextInput from '@components/TextInput/TextInput';

import styles from './_styles';

export default class TransactionForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: -1,
			description: '',
			date: moment()
				.format('YYYY-MM-DD'),
			amount: 0,
			category: '',
		};
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
					mode="date"
					placeholder="Choose transaction date"
					format="YYYY-MM-DD"
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
					value={amount}
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

	renderDescriptionInput = () => {
		const { description } = this.state;

		return (
			<Theme.View>
				<InputLabel text="Description:" />
				<TextInput
					onChangeText={this.onChangeDescription}
					value={description}
					numberOfLines={1}
					keyboardType={'number-pad'}
				/>
			</Theme.View>
		);
	};

	onChangeDescription = description => {
		this.setState({ description });
	};

	renderCategoryInput = () => {
		return (
			<Theme.View>
				<InputLabel text="Category:" />
				<Picker
					selectedValue={this.state.category}
					style={{ height: 50, width: '100%' }}
					onValueChange={(itemValue, itemIndex) =>
						this.setState({ category: itemValue })
					}
				>
					<Picker.Item label="Java" value="java" />
					<Picker.Item label="JavaScript" value="js" />
				</Picker>
			</Theme.View>
		);
	};

	renderSubmitButton = () => {
		return <Button onPress={this.onSave} title="Save" />;
	};

	onPressSubmit = () => {
		if (this.props.onSubmit) this.props.onSubmit(this.state);
	};

	renderDeleteButton = () => {
		if (!this.props.onDelete) return null;

		return <Button onPress={this.onPressDelete} title="Delete" />;
	};

	onPressDelete = () => {
		if (this.props.onDelete) this.props.onDelete(this.state);
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderDescriptionInput()}
				{this.renderAmountInput()}
				{this.renderCategoryInput()}
				{this.renderDateInput()}
				{this.renderSubmitButton()}
			</Theme.View>
		);
	}
}

TransactionForm.propTypes = {
	onSubmit: PropTypes.func,
	description: PropTypes.string,
	amount: PropTypes.string,
	date: PropTypes.string,
	category: PropTypes.string,
	categories: PropTypes.object,
	onDelete: PropTypes.func,
};
