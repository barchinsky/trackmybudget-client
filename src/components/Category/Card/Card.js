import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import Image from '@components/Image/Image';
import Touchable from '@components/Touchable/Touchable';

import styles from './_styles';

export default class CategoryCard extends Component {
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

	renderColor = () => {
		return <Theme.View style={styles.colorContainer} />;
	};

	onPress = () => {
		const { title } = this.props;
		if (this.props.onPress) this.props.onPress(title);
	};

	render() {
		return (
			<Touchable style={styles.container} onPress={this.onPress}>
				{this.renderIcon()}
				{this.renderTitle()}
				{this.renderAmount()}
			</Touchable>
		);
	}
}

CategoryCard.propTypes = {
	title: PropTypes.string,
	color: PropTypes.string,
	onPress: PropTypes.func,
};

CategoryCard.defaultProps = {
	title: 'Dummy Title',
	color: '##72c454',
};
