import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'stores';

// Row components render <tr>s, which need a table around them to be valid DOM
export const inTable = (ui) => (
	<table>
		<tbody>{ui}</tbody>
	</table>
);

export const renderRow = (ui) => render(inTable(ui));

export const renderWithStore = (ui, store = configureStore()) => ({
	store,
	...render(<Provider store={store}>{ui}</Provider>),
});
