import React from 'react';
import Theme from 'react-native-theming';
import { PropTypes } from 'prop-types';

import ProgressBarAnimated from 'react-native-progress-bar-animated';

import styles from './_styles';

const ProgressBar = props => {
	const progressStyles = {
		backgroundColor: props.backgroundColor,
		borderRadius: props.borderRadius,
		borderColor: props.borderColor,
		borderWidth: 0,
		height: props.height,
		backgroundColorOnComplete: props.backgroundColorOnComplete,
	};

	return (
		<Theme.View style={styles.container}>
			<ProgressBarAnimated
				{...progressStyles}
				width={props.barWidth}
				value={props.progress}
			/>
		</Theme.View>
	);
};

ProgressBar.propTypes = {
	barWidth: PropTypes.number,
	progress: PropTypes.number,
	backgroundColorOnComplete: PropTypes.string,
	backgroundColor: PropTypes.string,
	borderRadius: PropTypes.number,
	borderColor: PropTypes.string,
	borderWidth: PropTypes.number,
	height: PropTypes.number,
};

ProgressBar.defaultProps = {
	backgroundColorOnComplete: '#c64444',
	backgroundColor: '#5858e6',
	borderColor: 'transparent',
	borderRadius: 0,
	borderWidth: 0,
	height: 5,
};

export default ProgressBar;
