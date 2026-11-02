import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './stores';

const store = configureStore();

createRoot(document.getElementById('app')).render(
	<Provider store={store}>
		<App />
	</Provider>,
);
