const React = require('react');
const { AppContainer } = require('react-hot-loader');
const { Provider } = require('react-redux');
const App = require('./containers/App');
const configureStore = require('./stores');

const store = configureStore();

export default (
	<AppContainer>
		<Provider store={store}>
			<App />
		</Provider>
	</AppContainer>
);
