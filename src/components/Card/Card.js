import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import Image from '@components/Image/Image';
import Touchable from '@components/Touchable/Touchable';

import ProgressBarAnimated from 'react-native-progress-bar-animated';
import styles from './_styles';

export default class MenuCard extends Component {
	renderIcon = () => {
		const { icon } = this.props;

		return (
			<Theme.View style={styles.iconContainer}>
				<Image source={icon} style={styles.icon} />
			</Theme.View>
		);
	};

	renderTitle = () => {
		const { title } = this.props;
		return (
			<Theme.View style={styles.titleContainer}>
				<Theme.Text style={styles.title}>{title}</Theme.Text>
			</Theme.View>
		);
	};

	renderAmount = () => {
		const { amount } = this.props;

		if (!amount) return null;

		return (
			<Theme.View style={styles.amountContainer}>
				<Theme.Text style={styles.amount}>{amount}</Theme.Text>
			</Theme.View>
		);
	};

	renderProgressBar = () => {
		const { progress } = this.props;

		if (progress === null) return null;

		const barWidth = Dimensions.get('screen').width;
		return (
			<Theme.View style={styles.progressBarContainer}>
				<ProgressBarAnimated width={barWidth} value={progress} />
			</Theme.View>
		);
	};

	onPress = () => {
		const { title } = this.props;
		if (this.props.onPress) this.props.onPress(title);
	};

	render() {
		return (
			<Touchable style={styles.container} onPress={this.onPress}>
				{this.renderProgressBar()}
				{this.renderIcon()}
				{this.renderTitle()}
				{this.renderAmount()}
			</Touchable>
		);
	}
}

MenuCard.propTypes = {
	icon: PropTypes.number,
	title: PropTypes.string,
	amount: PropTypes.string,
	onPress: PropTypes.func,
	progress: PropTypes.number,
};

MenuCard.defaultProps = {
	icon: require('@media/defaultCategory.png'),
	title: 'Dummy Title',
	progress: null,
};
