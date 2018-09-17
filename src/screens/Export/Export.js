/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import moment from 'moment';

import Button from '@components/Button/Button';
import TextInput from '@components/TextInput/TextInput';
import DataManager from '@utils/AsyncStorageManager/AsyncStorageManager';
import FSManager from '@utils/FileSystemManager/FileSystemManager';

import { exportDatetime as dateTimeFormat } from '@utils/dateFormats';

import styles from './_styles';

const TAG = 'Export';
export class ExportScreen extends Component {
	constructor(props) {
		super(props);

		const currentDate = moment()
			.format(dateTimeFormat);
		console.log(
			`${TAG}::dateTimeFormat:${dateTimeFormat}, currentDate:${currentDate}`
		);
		this.initialFileName = `BudgetTracker_${currentDate}_export.json`;

		this.state = {
			fileName: this.initialFileName,
		};
	}

	renderFileNameInput = () => {
		const { fileName } = this.state;
		return <TextInput onChange={this._onFileNameChange} value={fileName} />;
	};

	_onFileNameChange = newValue => {
		this.setState({ fileName: newValue });
	};

	renderExportButton = () => {
		return <Button title="Export" onPress={this._exportButtonPressed} />;
	};

	_exportButtonPressed = async () => {
		let { fileName } = this.state;
		const { userId } = this.props;

		if (!fileName) fileName = this.initialFileName;

		const exportResult = await DataManager.exportData(userId);

		if (!exportResult.status) {
			console.warn(`${TAG}:Export data failed:${exportResult.msg}`);
			return;
		}

		const exportData = exportResult.payload;

		const saveResult = await FSManager.saveData(exportData, fileName);

		if (!saveResult.status) {
			console.warn(`${TAG}:Store export data failed:${saveResult.msg}`);
			return;
		}

		console.warn(`${TAG}:Export done!`);
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderFileNameInput()}
				{this.renderExportButton()}
			</Theme.View>
		);
	}

	static navigationOptions = () => ({ title: 'Export' });
}

ExportScreen.propTypes = {
	userId: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
	return {
		userId: state.userData.userId,
	};
}

export default connect(mapStateToProps)(ExportScreen);
