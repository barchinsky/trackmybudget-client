import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';

import CategoryForm from '@components/Category/Form/Form';

import { updateCategory } from '@redux/actions/categories/update';
import { deleteCategory } from '@redux/actions/categories/delete';

import styles from './_styles';

const TAG = 'EditCategoryScreen';
export class EditCategoryScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			category: null,
		};
	}

	componentDidMount() {
		const category = this.props.navigation.getParam('category');

		// console.log('category edit:', category);
		this.setState({ category });
	}

	shouldComponentUpdate(prevProps, prevState) {
		if (prevState.category !== this.state.category) return true;

		return false;
	}

	onCategorySave = async ({ name, color }) => {
		const { category } = this.state;

		category.name = name;
		category.color = color;

		const result = await this.props.dispatch(updateCategory(category));

		if (result.status) {
			console.log(`${TAG}::onCategorySave(): Category update done!`);
		} else {
			console.error(`${TAG}::onCategorySave(): Category update failed!`);
		}

		console.log(`${TAG}::onCategorySave():: result=${result}`);
	};

	onCategoryDelete = async category => {
		const result = await this.props.dispatch(deleteCategory(category));

		console.log(`${TAG}::onCategoryDelete(): result=${result}`);
		if (result.status) {
			this.props.navigation.goBack();
		} else {
			console.error(
				`${TAG}::onCategoryDelete():: Deletion failed: ${result.msg}`
			);
		}
	};

	renderForm = () => {
		const { category } = this.state;

		return (
			<CategoryForm
				category={category}
				onSave={this.onCategorySave}
				onDelete={this.onCategoryDelete}
			/>
		);
	};

	render() {
		return (
			<Theme.View style={styles.container}>{this.renderForm()}</Theme.View>
		);
	}
}

EditCategoryScreen.propTypes = {
	navigation: PropTypes.object,
	dispatch: PropTypes.func,
};

export default connect()(EditCategoryScreen);
