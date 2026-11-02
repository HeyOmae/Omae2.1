import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from 'containers/App';
import { renderWithStore } from '../helpers/render';

describe('<App />', () => {
	it('should render every section of the character generator', () => {
		renderWithStore(<App />);

		['Priority Table', 'Metatype', 'Attributes', 'Qualities', 'Magic/Resonance', 'Skills', 'Street Gear', 'Lifestyles']
			.forEach((section) => {
				// the character summary repeats some of these headings
				expect(screen.getAllByRole('heading', { name: section, level: 2 })).to.not.be.empty;
			});
	});

	it('should buy and sell a lifestyle through the store', async () => {
		const { store } = renderWithStore(<App />),
			startingNuyen = store.getState().purchaseGear.nuyen;
		const lifestyleSection = screen.getByRole('heading', { name: 'Lifestyles', level: 2 }).closest('.lifestyle');

		await userEvent.click(within(lifestyleSection).getByRole('button', { name: 'Lifestyles' }));
		const modal = screen.getAllByRole('heading', { name: 'Lifestyles', level: 4 })
			.map((heading) => heading.closest('.modal'))
			.find(Boolean);
		const lowRow = within(modal).getByRole('cell', { name: 'Low' }).closest('tr');
		await userEvent.click(within(lowRow).getByRole('button', { name: '+' }));

		expect(store.getState().purchaseGear.lifestyles.map((lifestyle) => lifestyle.name)).to.eql(['Low']);
		// nuyen tracks what has been spent
		expect(store.getState().purchaseGear.nuyen).to.equal(startingNuyen + 2000);

		await userEvent.click(within(modal).getAllByRole('button', { name: 'Close' })[0]);
		const purchasedRow = within(lifestyleSection).getByRole('cell', { name: 'Low' }).closest('tr');
		await userEvent.click(within(purchasedRow).getByRole('button', { name: '-' }));

		// selling the last item of a category removes the category
		expect(store.getState().purchaseGear.lifestyles).to.be.undefined;
		expect(store.getState().purchaseGear.nuyen).to.equal(startingNuyen);
		expect(within(lifestyleSection).queryByRole('table')).to.be.null;
	});
});
