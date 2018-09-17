/* @flow */

import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { SectionList } from 'react-native';
import { PropTypes } from 'prop-types';

import Touchable from '@components/Touchable/Touchable';

import styles from './_styles';

const SETTINGS_ROUTES = {
	themes: 'Themes',
	currency: 'Currency',
	personal: 'Personal Data',
	notifications: 'Notifications',
	sync: 'Sync',
	import: 'Import',
	export: 'Export',
};

const TAG = 'Settings';
export default class Settings extends Component {
	constructor(props) {
		super(props);

		this.settingsItems = [
			{
				title: 'General',
				data: [
					this._buildSettingItem(SETTINGS_ROUTES.themes, false),
					this._buildSettingItem(SETTINGS_ROUTES.currency, false),
				],
			},
			{
				title: 'Account',
				data: [
					this._buildSettingItem(SETTINGS_ROUTES.personal, false),
					this._buildSettingItem(SETTINGS_ROUTES.notifications, false),
					this._buildSettingItem(SETTINGS_ROUTES.sync, false),
				],
			},
			{
				title: 'Data',
				data: [
					this._buildSettingItem(SETTINGS_ROUTES.import, true),
					this._buildSettingItem(SETTINGS_ROUTES.export, true),
				],
			},
		];
	}

	_buildSettingItem = (name, enabled = true) => ({ name, enabled });

	_renderSectionHeader = ({ section: { title } }) => {
		return (
			<Theme.View style={styles.sectionHeaderContainer}>
				<Theme.Text style={styles.sectionHeaderText}>{title}</Theme.Text>
			</Theme.View>
		);
	};

	_renderItem = ({ item, index, section }) => {
		return item.enabled
			? this._renderEnabledItem(item, index)
			: this._renderDisabledItem(item, index);
	};

	_renderEnabledItem = (item, index) => {
		return (
			<Touchable
				style={styles.listItemContainer}
				onPress={() => this._settingsItemPressed(item)}
				key={index}
			>
				<Theme.Text style={styles.listItemText}>{item.name}</Theme.Text>
			</Touchable>
		);
	};

	_settingsItemPressed = item => {
		// console.warn(`${TAG}:_settingsItemPress(): items: ${item.name}`);
		switch (item.name) {
		case SETTINGS_ROUTES.export:
			this.props.navigation.navigate('ExportScreen');
			break;
		case SETTINGS_ROUTES.import:
			this.props.navigation.navigate('ImportScreen');
			break;
		default:
			return;
		}
	};

	_renderDisabledItem = (item, index) => {
		return (
			<Theme.View
				style={[styles.listItemContainer, styles.disabled]}
				key={index}
			>
				<Theme.Text style={styles.listItemText}>{item.name}</Theme.Text>
			</Theme.View>
		);
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				<SectionList
					renderItem={this._renderItem}
					renderSectionHeader={this._renderSectionHeader}
					sections={this.settingsItems}
					keyExtractor={(item, index) => item + index}
				/>
			</Theme.View>
		);
	}

	static navigationOptions = () => ({ title: 'Settings' });
}

Settings.propTypes = {
	navigation: PropTypes.object,
};
