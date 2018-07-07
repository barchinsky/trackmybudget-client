import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';

import CategoryForm from '@components/Category/Form/Form';

import {
	updateCategory,
	updateCategorySuccess,
} from '@redux/actions/categories/update';

import styles from './_styles';

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

	onCategorySave = ({ name, color }) => {
		console.log('onCategoryUpdate name:', name, ' color:', color);
		const { category } = this.state;

		category.name = name;
		category.color = color;

		this.props.dispatch(updateCategorySuccess(category));
	};

	renderForm = () => {
		const { category } = this.state;

		return <CategoryForm category={category} onSave={this.onCategorySave} />;
	};

	render() {
		return (
			<Theme.View style={styles.container}>
				<Theme.Text>Im the EditCategoryScreen component</Theme.Text>
				{this.renderForm()}
			</Theme.View>
		);
	}
}

EditCategoryScreen.propTypes = {
	navigation: PropTypes.object,
};

export default connect()(EditCategoryScreen);
