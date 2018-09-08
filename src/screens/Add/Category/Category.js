import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';

import CategoryForm from '@components/Category/Form/Form';
import Category from '@models/category';

import { createCategory } from '@redux/actions/categories/create';

import styles from './_styles';

const TAG = 'ScreenAddCategory';
export class ScreenAddCategory extends Component {
	saveCategory = async ({ name, color }) => {
		console.log(`${TAG}::saveCategory(): name=${name}, color=${color}`);

		const { userId } = this.props.user;
		const id = Date.now();
		const categoryToSave = new Category({
			_name: name,
			_color: color,
			_userId: userId,
			_id: id,
		});

		const result = await this.props.dispatch(createCategory(categoryToSave));

		console.log(`${TAG}.saveCategory()::result=${result}`);
		if (result.status) {
			this.props.navigation.navigate('CategoryStack');
		} else {
			console.error(`${TAG}::saveCategory()::Error:${result.msg}`);
		}
	};

	renderCategoryForm = () => {
		return <CategoryForm onSave={this.saveCategory} />;
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				{this.renderCategoryForm()}
			</Theme.View>
		);
	}
}

ScreenAddCategory.navigationOptions = () => {
	return { title: 'New Category' };
};

ScreenAddCategory.propTypes = {
	dispatch: PropTypes.func,
	user: PropTypes.object,
	navigation: PropTypes.object,
};

function mapStateToProps(state) {
	return {
		user: state.userData,
	};
}

export default connect(mapStateToProps)(ScreenAddCategory);
