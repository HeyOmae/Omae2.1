import { AppContainer } from 'react-hot-loader';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './stores';
import App from './containers/App';

const store = configureStore(),
	rootEl = document.getElementById('app');

render(
	<AppContainer>
		<Provider store={store}>
			<App />
		</Provider>
	</AppContainer>,
	rootEl
);

if(module.hot) {
		module.hot.accept('./containers/App', ()=> {
			const NextApp = require('./containers/App').default;
			render(
					<AppContainer>
						<Provider store={store}>
							<NextApp />
						</Provider>
					</AppContainer>,
					rootEl
				);
		});
}