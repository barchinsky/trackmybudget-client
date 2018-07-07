import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Touchable from '@components/Touchable/Touchable';

import styles from './_styles';

export default class MenuCard extends Component {
	onPress = obj => {
		if (this.props.onPress) this.props.onPress(obj);
	};

	render() {
		return (
			<Touchable style={styles.container} onPress={this.onPress}>
				{this.props.children}
			</Touchable>
		);
	}
}

MenuCard.propTypes = {
	children: PropTypes.any,
	onPress: PropTypes.func,
};
