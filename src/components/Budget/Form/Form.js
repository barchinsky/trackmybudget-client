import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { Button, ScrollView } from 'react-native';
import { PropTypes } from 'prop-types';

import DateInput from '@components/DateInput/DateInput';
import TextInput from '@components/TextInput/TextInput';
import BudgetCategoryCard from '@components/Budget/CategoryCard/CategoryCard';

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
		const { name, startDate, endDate, estimate } = this.props;

		this.setState({ name, startDate, endDate, estimate });
	}

	onNameChange = name => {
		this.setState({ name });
	};

	onStartDateChange = startDate => {
		const date = startDate.setDate(0, 0, 0, 0);
		this.setState({ startDate: date });
	};

	onEndDateChange = endDate => {
		const date = endDate.setDate(23, 59, 59, 999);
		this.setState({ endDate: date });
	};

	onEstimateChange = estimate => {
		this.setState({ estimate });
	};

	onSubmit = () => {
		if (this.props.onSubmit) this.props.onSubmit(this.state);
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

	renderStartDateInput = () => {
		return <DateInput onChange={this.onStartDateChange} />;
	};

	renderEndDateInput = () => {
		return <DateInput onChange={this.onEndDateChange} />;
	};

	renderEstimateDateInput = () => {
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
		const { categories } = this.props;
		// console.warn('categories:', categories.length);

		const categoryCards = categories.map(c => {
			return (
				<BudgetCategoryCard
					category={c}
					key={c.id}
					readOnly={false}
					onUpdate={this.onBudgetCategoryUpdate}
				/>
			);
		});

		// const test = [...categoryCards, ...categoryCards, ...categoryCards];
		// return test;
		return categoryCards;
	};

	onBudgetCategoryUpdate = (id, newEstimate) => {
		console.log(`id:${id}, estimate: ${newEstimate}`);
		const { categoryIdToEstimateMap } = this.state;
		categoryIdToEstimateMap[id] = newEstimate;

		// console.log('this.categoryIdToEstimateMap:', this.categoryIdToEstimateMap);

		const estimate = Object.keys(categoryIdToEstimateMap)
			.reduce((acc, key) => {
				return acc + +categoryIdToEstimateMap[key];
			}, 0);

		this.setState({ estimate, categoryIdToEstimateMap });
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
					{this.renderEstimateDateInput()}
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
	name: PropTypes.string,
	startDate: PropTypes.object,
	endDate: PropTypes.object,
	estimate: PropTypes.number,
	onSubmit: PropTypes.func,
	categories: PropTypes.array,
};

BudgetForm.defaultProps = {
	name: '',
	startDate: null,
	endDate: null,
	estimate: 0,
};

function mapStateToProps(state) {
	return {
		categories: state.categories.data,
	};
}

export default connect(mapStateToProps)(BudgetForm);
