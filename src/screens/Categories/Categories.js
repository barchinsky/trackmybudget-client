import React, { Component } from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import CategoryList from '@components/Category/List/List';

import styles from './_styles';

export class CategoriesScreen extends Component {
	categorySelected = category => {
		let params = { category };
		this.props.navigation.navigate('EditCategoryScreen', params);
	};

	renderCategoryList() {
		const { categories } = this.props;

		return (
			<CategoryList
				categories={categories}
				onItemPressed={this.categorySelected}
			/>
		);
	}

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderCategoryList()}
			</Theme.View>
		);
	}

	static navigationOptions = () => {
		return {
			title: 'Categories',
		};
	};
}

CategoriesScreen.propTypes = {
	categories: PropTypes.array,
	navigation: PropTypes.object,
};

CategoriesScreen.defaultProps = {
	categories: [],
};

function mapStateToProps(state) {
	return {
		categories: state.categories.data,
	};
}

export default connect(mapStateToProps)(CategoriesScreen);
