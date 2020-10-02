import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './stores';

const store = configureStore();

export default (
	<AppContainer>
		<Provider store={store}>
			<App />
		</Provider>
	</AppContainer>
);
