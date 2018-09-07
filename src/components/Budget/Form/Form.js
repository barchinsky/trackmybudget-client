import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { Button, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';

import DatePicker from 'react-native-datepicker';
import TextInput from '@components/TextInput/TextInput';
import BudgetCategoryCard from '@components/Budget/CategoryCard/CategoryCard';

import { date as dateFormat } from '@utils/dateFormats';

import moment from 'moment';

import styles from './_styles';

export class BudgetForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			startDate: null,
			endDate: null,
			estimate: '0',
			categoryIdToEstimateMap: {},
		};
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

	onEstimateChange = estimate => {
		// estimate should be >= 0 and be a valid number
		const e = +estimate;
		if (isNaN(e) || e < 0) return;

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
		const { readOnly } = this.props;
		return (
			<TextInput
				editable={!readOnly}
				numberOfLines={1}
				onChangeText={this.onNameChange}
				value={name}
			/>
		);
	};

	renderDateInput = (date, dateDest) => {
		// console.log(`dateDeost: ${dateDest} date:${date}`);
		const { readOnly } = this.props;
		return (
			<DatePicker
				style={styles.datePicker}
				disabled={readOnly}
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
		// console.log('renderEndDateInput()::state.endDate:', this.state.endDate);
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
		const estimateString = `${estimate}`;
		return (
			<TextInput
				numberOfLines={1}
				onChangeText={this.onEstimateChange}
				value={estimateString}
				editable={false}
			/>
		);
	};

	renderBudgetCategories = () => {
		const {
			categories,
			budget,
			readOnly,
			categoryIdTotalAmountMap,
		} = this.props;
		const { categoryIdToEstimateMap } = budget;
		// console.warn('categories:', categories.length);

		const categoryCards = categories.map(c => {
			const totalSpent = categoryIdTotalAmountMap
				? categoryIdTotalAmountMap[c.id]
				: 0;
			var estimate =
				categoryIdToEstimateMap[c.id] == undefined
					? 0
					: +categoryIdToEstimateMap[c.id];
			var estimateForProgress = estimate > 0 ? estimate : 1;
			const progress = (totalSpent / estimateForProgress) * 100;

			// console.log(
			// 	`renderBudgetCategories:: totalSpent:${totalSpent}, estimate: ${estimate}, progress:${progress}`
			// );
			return (
				<BudgetCategoryCard
					category={c}
					key={c.id}
					readOnly={readOnly}
					displayProgress={readOnly}
					progress={progress}
					estimate={estimate}
					spent={totalSpent}
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
		// console.log(`id:${id}, estimate: ${newEstimate}`, this.state);
		const { categoryIdToEstimateMap } = this.state;
		categoryIdToEstimateMap[id] = newEstimate;

		// console.log('this.categoryIdToEstimateMap:', this.categoryIdToEstimateMap);

		const estimate = Object.keys(categoryIdToEstimateMap)
			.reduce((acc, key) => {
				return acc + +categoryIdToEstimateMap[key];
			}, 0);

		this.setState({ estimate, categoryIdToEstimateMap });
	};

	onBudgetCategoryPress = category => {
		if (this.props.onBudgetCategoryPress) {
			this.props.onBudgetCategoryPress(category);
		}
	};

	renderSaveButton = () => {
		if (this.props.readOnly) return null;

		return (
			<Theme.View style={styles.saveButtonContainer}>
				<Button
					onPress={this.onSubmit}
					title="Save"
					style={styles.saveButton}
				/>
			</Theme.View>
		);
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
					{this.renderSaveButton()}
				</ScrollView>
			</Theme.View>
		);
	}
}

BudgetForm.propTypes = {
	budget: PropTypes.object,
	categories: PropTypes.array,
	categoryIdTotalAmountMap: PropTypes.object, // maping between categoryId and total spent amount
	readOnly: PropTypes.bool,
	onSubmit: PropTypes.func,
	onBudgetCategoryPress: PropTypes.func,
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
