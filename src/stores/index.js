import { createStore } from 'redux';
import reducers from '../reducers';

export default function reduxStore(initialState) {
	const store = createStore(reducers, initialState);

	if (import.meta.hot) {
		// Enable Vite hot module replacement for reducers
		import.meta.hot.accept('../reducers', (nextReducers) => {
			store.replaceReducer(nextReducers.default);
		});
	}

	return store;
}
