import React from 'react';
import Theme from 'react-native-theming';

import styles from './_styles';

const CategoryDetailsDashboardPlaceholder = () => {
	return (
		<Theme.View style={styles.container}>
			<Theme.Text style={styles.categoryName} />
			<Theme.Text style={styles.categoryAmount} />
		</Theme.View>
	);
};

export default CategoryDetailsDashboardPlaceholder;
