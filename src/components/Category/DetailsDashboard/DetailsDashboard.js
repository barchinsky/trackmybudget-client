import React from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';

import styles from './_styles';

const CategoryDetailsDashboard = props => {
	const { name, amountText } = props;
	return (
		<Theme.View style={styles.container}>
			<Theme.Text style={styles.categoryName}>{name}</Theme.Text>
			<Theme.Text style={styles.categoryAmount}>{amountText}</Theme.Text>
		</Theme.View>
	);
};

CategoryDetailsDashboard.propTypes = {
	name: PropTypes.string,
	amountText: PropTypes.string,
};

export default CategoryDetailsDashboard;
