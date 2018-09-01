import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { Button, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';

import DateInput from '@components/DateInput/DateInput';
import DatePicker from 'react-native-datepicker';
import TextInput from '@components/TextInput/TextInput';
import BudgetCategoryCard from '@components/Budget/CategoryCard/CategoryCard';

import DataManager from '@utils/AsyncStorageManager/AsyncStorageManager';

import {
	date as dateFormat,
	datetime as datetimeFormat,
} from '@utils/dateFormats';

import moment from 'moment';

import styles from './_styles';

export class BudgetForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			startDate: null,
			endDate: null,
			estimate: 0,
			categoryIdToEstimateMap: {},
		};

		// this.categoryIdToEstimateMap = {};
	}

	componentDidMount() {
		const {
			name,
			startDate,
			endDate,
			estimate,
			categoryIdToEstimateMap,
		} = this.props.budget;

		this.setState({
			name,
			startDate,
			endDate,
			estimate,
			categoryIdToEstimateMap,
		});
	}

	onNameChange = name => {
		this.setState({ name });
	};

	// onStartDateChange = startDate => {
	// 	const date = startDate.setDate(0, 0, 0, 0);
	// 	this.setState({ startDate: date });
	// };

	// onEndDateChange = endDate => {
	// 	const date = endDate.setDate(23, 59, 59, 999);
	// 	this.setState({ endDate: date });
	// };

	onEstimateChange = estimate => {
		this.setState({ estimate });
	};

	onSubmit = () => {
		if (this.props.onSubmit) {
			const { budget } = this.props;
			const {
				name,
				startDate,
				endDate,
				estimate,
				categoryIdToEstimateMap,
			} = this.state;
			budget.name = name;
			budget.startDate = startDate;
			budget.endDate = endDate;
			budget.estimate = estimate;
			budget.categoryIdToEstimateMap = categoryIdToEstimateMap;

			this.props.onSubmit(budget);
		}
	};

	renderLabel = text => {
		return <Theme.Text style={styles.label}>{text}</Theme.Text>;
	};

	renderBudgetNameInput = () => {
		const { name } = this.state;
		return (
			<TextInput
				numberOfLines={1}
				onChangeText={this.onNameChange}
				value={name}
			/>
		);
	};

	renderDateInput = (date, dateDest) => {
		// console.log(`dateDest: ${dateDest} date:${date}`);
		return (
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
					this.setState({ [dateDest]: date });
				}}
			/>
		);
	};

	renderStartDateInput = () => {
		const startDate = this.state.startDate
			? this.state.startDate
			: moment()
				.format(dateFormat);

		// if form oppented for new budget creation
		// set default start date
		if (!this.state.startDate) {
			this.setState({ startDate });
		}

		return this.renderDateInput(startDate, 'startDate');
	};

	renderEndDateInput = () => {
		console.log('renderEndDateInput()::state.endDate:', this.state.endDate);
		const endDate = this.state.endDate
			? this.state.endDate
			: moment()
				.add(1, 'months')
				.format(dateFormat);

		// console.log('renderEndDateInput()::', endDate, this.state.endDate);
		// if form oppented for new budget creation
		// set default end date
		if (!this.state.endDate) {
			this.setState({ endDate });
		}

		return this.renderDateInput(endDate, 'endDate');
	};

	renderEstimateInput = () => {
		const { estimate } = this.state;

		return (
			<TextInput
				numberOfLines={1}
				onChangeText={this.onEstimateChange}
				value={'' + estimate}
				editable={false}
			/>
		);
	};

	renderBudgetCategories = () => {
		const { categories, budget, readOnly } = this.props;

		const { categoryIdToEstimateMap } = budget;
		// console.warn('categories:', categories.length);

		const categoryCards = categories.map(c => {
			return (
				<BudgetCategoryCard
					category={c}
					key={c.id}
					readOnly={readOnly}
					displayProgress={readOnly}
					progress={50}
					estimate={categoryIdToEstimateMap[c.id]}
					onUpdate={this.onBudgetCategoryUpdate}
					onPress={this.onBudgetCategoryPress}
				/>
			);
		});

		// const test = [...categoryCards, ...categoryCards, ...categoryCards];
		// return test;
		return categoryCards;
	};

	onBudgetCategoryUpdate = (id, newEstimate) => {
		console.log(`id:${id}, estimate: ${newEstimate}`, this.state);
		const { categoryIdToEstimateMap } = this.state;
		categoryIdToEstimateMap[id] = newEstimate;

		// console.log('this.categoryIdToEstimateMap:', this.categoryIdToEstimateMap);

		const estimate = Object.keys(categoryIdToEstimateMap)
			.reduce((acc, key) => {
				return acc + +categoryIdToEstimateMap[key];
			}, 0);

		this.setState({ estimate, categoryIdToEstimateMap });
	};

	onBudgetCategoryPress = async id => {
		console.log('onBudgetCategoryPress()::' + id);
		const { budget } = this.props;
		const transactions = await DataManager.getTransactionsByBudgetAndCategory(
			budget,
			id
		);

		console.log('onBudgetCategoryPress()::transactions::', transactions);
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				<ScrollView style={{ flex: 1 }}>
					{this.renderLabel('Budget name')}
					{this.renderBudgetNameInput()}
					{this.renderLabel('Start date')}
					{this.renderStartDateInput()}
					{this.renderLabel('End date')}
					{this.renderEndDateInput()}
					{this.renderLabel('Estimate')}
					{this.renderEstimateInput()}
					{this.renderBudgetCategories()}
					<Theme.View style={styles.saveButtonContainer}>
						<Button
							onPress={this.onSubmit}
							title="Save"
							style={styles.saveButton}
						/>
					</Theme.View>
				</ScrollView>
			</Theme.View>
		);
	}
}

BudgetForm.propTypes = {
	budget: PropTypes.object,
	categories: PropTypes.array,
	readOnly: PropTypes.bool,
	onSubmit: PropTypes.func,
};

BudgetForm.defaultProps = {
	budget: {
		name: '',
		startDate: null,
		endDate: null,
		estimate: 0,
		categoryIdToEstimateMap: {},
	},
};

function mapStateToProps(state) {
	return {
		categories: state.categories.data,
	};
}

export default connect(mapStateToProps)(BudgetForm);
