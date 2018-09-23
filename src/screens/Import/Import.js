import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, ScrollView } from 'react-native';
import moment from 'moment';

import DataManager from '@utils/AsyncStorageManager/AsyncStorageManager';
import FSManager from '@utils/FileSystemManager/FileSystemManager';
import ImportFileCard from '@components/Card/ImportFile/ImportFile';

import { datetime as dateTimeFormat } from '@utils/dateFormats';

import styles from './_styles.js';

const TAG = 'ImportScreen';
export class ImportScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			availableImportFiles: [],
		};
	}

	componentDidMount() {
		FSManager.listDir()
			.then(res => {
				if (!res.status) {
					console.warn(`${TAG}:componentDidMount(): res = ${res.msg}`);
					return;
				}
				const btFiles = this._prepareFiles(res.payload);
				console.log(`${TAG}:componentDidMount():btFiles:`, btFiles);
				this.setState({ availableImportFiles: btFiles });
			});
	}

	_prepareFiles = rawFileData => {
		/*
		Raw data format is next
		{ ctime: null,
			mtime: Sun Sep 09 2018 20:47:38 GMT+0200 (CEST),
			name: 'test.tbud',
			path: '/data/user/0/com.trackmybudget/files/test.tbud',
			size: 5,
			isFile: [Function: isFile],
			isDirectory: [Function: isDirectory]
		}
		*/
		// console.log(rawFileData);
		const formattedList = rawFileData.map(item => {
			const adaptedFile = {};
			adaptedFile.ctime = moment(item.mtime)
				.format(dateTimeFormat);
			adaptedFile.name = item.name;
			adaptedFile.size = item.size;

			return adaptedFile;
		});

		// get only budget tracker files
		const btFiles = formattedList.filter(item => {
			return item.name.contains('BudgetTracker');
		});

		return btFiles;
	};

	renderImportFileList = () => {
		const { availableImportFiles } = this.state; // list of strings

		return availableImportFiles.length ? (
			<FlatList
				data={availableImportFiles}
				renderItem={this._renderItem}
				keyExtractor={this._keyExtractor}
			/>
		) : (
			this.renderListPlaceholder()
		);
	};

	_renderItem = listItem => {
		const file = listItem.item;
		// TODO: Add formatting for size
		const size = '' + file.size;
		return (
			<ImportFileCard
				fileName={file.name}
				size={size}
				ctime={file.ctime}
				onPress={this.onImportFileSelected}
			/>
		);
	};

	onImportFileSelected = async fileName => {
		console.log(`${TAG}.onImportFileSelected(): fileName:${fileName}`);

		try {
			const result = await FSManager.loadData(fileName);

			if (!result.status) {
				console.warn(
					`${TAG}:onImportFileSelected(): Import failed: ${result.msg}`
				);
				return;
			}

			const importedData = result.payload;
			const { userId } = this.props;

			const importResult = await DataManager.importData(importedData, userId);

			if (!importResult.status) {
				console.warn(
					`${TAG}:onImportFileSelected(): Import result: ${importResult.msg}`
				);
				return;
			}

			console.log(`${TAG}.onImportFileSelected(): Import Done!`);
		} catch (e) {
			console.log(`${TAG}: Import failed: ${e.message}`);
		}
	};

	_keyExtractor = item => item.name;

	renderListPlaceholder = () => {
		const sampleData = Array.from({ length: 20 }, (_, id) => ({ id }));
		return (
			<ScrollView style={styles.placeholderContainer}>
				{sampleData.map(i => this.renderListItemPlaceholder(i))}
			</ScrollView>
		);
	};

	renderListItemPlaceholder = obj => {
		return (
			<Theme.View key={obj.id} style={styles.listItemContainer}>
				<Theme.Text style={styles.listItemTextPlaceholder} />
			</Theme.View>
		);
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderImportFileList()}
			</Theme.View>
		);
	}

	static navigationOptions = () => ({ title: 'Import' });
}

ImportScreen.propTypes = {
	userId: PropTypes.string,
};

function mapStateToProps(state) {
	return {
		userId: state.userData.userId,
	};
}

export default connect(mapStateToProps)(ImportScreen);
