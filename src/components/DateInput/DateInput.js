import React, { Component } from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import TextInput from '@components/TextInput/TextInput';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import { Keyboard } from 'react-native';

import styles from './_styles';

export default class DateInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			date: '',
			isDateTimePickerVisible: false,
		};
	}

	_showDateTimePicker = () => {
		Keyboard.dismiss();
		this.setState({ isDateTimePickerVisible: true });
	};

	_hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

	_handleDatePicked = date => {
		console.log('A date has been picked: ', date);
		this.setState({ date: date.toLocaleString() });
		this._hideDateTimePicker();

		if (this.props.onChange) this.props.onChange(date);
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				<TextInput
					numberOfLines={1}
					value={this.state.date}
					onFocus={this._showDateTimePicker}
					onBlur={this._hideDateTimePicker}
				/>
				<DateTimePicker
					isVisible={this.state.isDateTimePickerVisible}
					onConfirm={this._handleDatePicked}
					onCancel={this._hideDateTimePicker}
				/>
			</Theme.View>
		);
	}
}

DateInput.propTypes = {
	onChange: PropTypes.func,
};
