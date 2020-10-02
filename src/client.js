import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './stores';

const store = configureStore(),
	rootElement = document.getElementById('app'),
	render = (Component) => {
		ReactDOM.render(
			<AppContainer>
				<Provider store={store}>
					<Component />
				</Provider>
			</AppContainer>,
			rootElement,
		);
	};

render(App);

if (module.hot) {
	module.hot.accept('./containers/App', () => {
		const NextApp = require('./containers/App').default; // eslint-disable-line global-require
		render(NextApp);
	});
}

export default (
	<AppContainer>
		<Provider store={store}>
			<App />
		</Provider>
	</AppContainer>
);
