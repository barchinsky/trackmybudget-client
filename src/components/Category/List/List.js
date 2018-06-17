import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import { FlatList } from 'react-native';

import CategoryCard from '@components/Category/Card/Card';

import styles from './_styles';

export default class CategoryList extends Component {
	renderCategoryCard = item => {
		const category = item.item;
		console.log('category:', category);

		return <CategoryCard category={category} />;
	};

	_keyExtractor = item => item.id;

	renderList = () => {
		const { categories } = this.props;

		return (
			<FlatList
				data={categories}
				renderItem={this.renderCategoryCard}
				keyExtractor={this._keyExtractor}
			/>
		);
	};

	render() {
		return (
			<Theme.View style={styles.container}>{this.renderList()}</Theme.View>
		);
	}
}

CategoryList.propTypes = {
	categories: PropTypes.array,
};

CategoryList.defaultProps = {
	categories: [],
};
