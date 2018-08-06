import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import Touchable from '@components/Touchable/Touchable';

import styles from './_styles';

export default class CategoryCard extends Component {
	renderIcon = () => {
		const { category } = this.props;
		const catSymbol = category.name[0];
		return (
			<Theme.View
				style={[styles.iconContainer, { backgroundColor: category.color }]}
			>
				<Theme.Text style={styles.icon}>{catSymbol}</Theme.Text>
			</Theme.View>
		);
	};

	renderTitle = () => {
		const { category } = this.props;
		const catName = category.name;

		return (
			<Theme.View style={styles.titleContainer}>
				<Theme.Text style={styles.title}>{catName}</Theme.Text>
			</Theme.View>
		);
	};

	renderColor = () => {
		return <Theme.View style={styles.colorContainer} />;
	};

	onPress = () => {
		const { category } = this.props;
		if (this.props.onPress) this.props.onPress(category);
	};

	render() {
		return (
			<Touchable style={styles.container} onPress={this.onPress}>
				{this.renderIcon()}
				{this.renderTitle()}
			</Touchable>
		);
	}
}

CategoryCard.propTypes = {
	category: PropTypes.object,
	onPress: PropTypes.func,
};

CategoryCard.defaultProps = {};
