import React, { Component } from 'react';
import { connect } from 'react-redux';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';

import styles from './_styles';

export class TransactionsScreen extends Component {
	render() {
		return <Theme.View style={styles.container} />;
	}
}

TransactionsScreen.propTypes = {
	transactions: PropTypes.object,
};

function mapStateToProps(state) {
	return {
		transactions: state.transactions,
	};
}

export default connect(mapStateToProps)(TransactionsScreen);
