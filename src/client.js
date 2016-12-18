import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from 'containers/App.js';

const store = configureStore(),
	rootElement = document.getElementById('app');

ReactDOM.render(
	<AppContainer>
		<Provider store={store}>
			<App />
		</Provider>
	</AppContainer>,
	rootElement
);

if (module.hot) {
	module.hot.accept('./containers/App', () => {
		const NextApp = require('./containers/App').default; // eslint-disable-line global-require
		ReactDOM.render(
			<AppContainer>
				<Provider store={store}>
					<NextApp />
				</Provider>
			</AppContainer>,
			rootElement
		);
	});
}
