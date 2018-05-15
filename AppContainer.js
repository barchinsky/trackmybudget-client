import React from 'react';
import { Provider } from 'react-redux';
import App from './src/App';

import store from '@redux/store';

export default class AppContainer extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<App/>
			</Provider>
		);
	}
}
