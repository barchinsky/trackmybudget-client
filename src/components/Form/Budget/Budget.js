import React, { Component } from 'react';
import Theme from 'react-native-theming';
import TextInput from '@components/TextInput/TextInput';
import { Button } from 'react-native';
import DateInput from '@components/DateInput/DateInput';

import { PropTypes } from 'prop-types';

import styles from './_styles';

export default class BudgetForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			startDate: null,
			endDate: null,
			estimate: 0,
		};
	}

	componentDidMount() {
		const { name, startDate, endDate, estimate } = this.props;

		this.setState({ name, startDate, endDate, estimate });
	}

	onNameChange = name => {
		this.setState({ name });
	};

	onStartDateChange = startDate => {
		this.setState({ startDate });
	};

	onEndDateChange = endDate => {
		this.setState({ endDate });
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

	render() {
		const { name, startDate, endDate, estimate } = this.state;
		return (
			<Theme.View style={styles.container}>
				{this.renderLabel('Budget name')}
				<TextInput
					numberOfLines={1}
					onChangeText={this.onNameChange}
					value={name}
				/>
				{this.renderLabel('Start date')}
				<DateInput onChange={this.onStartDateChange} />
				{this.renderLabel('End date')}
				<DateInput onChange={this.onEndDateChange} />
				{this.renderLabel('Estimate')}
				<TextInput
					numberOfLines={1}
					onChangeText={this.onEstimateChange}
					value={estimate}
				/>
				<Button onPress={this.onSubmit} title="Save" />
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
};

BudgetForm.defaultProps = {
	name: '',
	startDate: null,
	endDate: null,
	estimate: 0,
};
