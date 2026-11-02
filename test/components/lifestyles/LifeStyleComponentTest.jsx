import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LifeStyleComponent from 'components/lifestyles/LifeStyleComponent';
import { renderWithStore } from '../../helpers/render';

describe('<LifeStyleComponent />', () => {
	const purchasedLifestyles = [{
		id: '559653df-a9af-44e2-9e04-3044c1d1b421',
		name: 'Street',
		cost: '0',
		dice: '1',
		freegrids: {
			freegrid: {
				_select: 'Public Grid',
				__text: 'Grid Subscription',
			},
		},
		lp: '2',
		costforarea: '50',
		costforcomforts: '50',
		costforsecurity: '50',
		multiplier: '20',
		source: 'SR5',
		page: '369',
	}, {
		id: '9cb0222c-14c1-4bea-bf83-055513a1f33e',
		name: 'Medium',
		cost: '5000',
		dice: '4',
		freegrids: {
			freegrid: [
				{
					_select: 'Local Grid',
					__text: 'Grid Subscription',
				},
				{
					_select: 'Public Grid',
					__text: 'Grid Subscription',
				},
			],
		},
		lp: '4',
		multiplier: '100',
		source: 'SR5',
		page: '369',
	}];

	const setup = (purchased) => {
		const props = {
			purchasedLifestyles: purchased,
			sellGear: sinon.spy(),
		};

		renderWithStore(<LifeStyleComponent {...props} />);

		return { props };
	};

	it('should open a modal with the lifestyles to purchase', async () => {
		setup();

		expect(screen.queryByRole('heading', { name: 'Lifestyles', level: 4 })).to.be.null;

		await userEvent.click(screen.getByRole('button', { name: 'Lifestyles' }));

		expect(screen.getByRole('heading', { name: 'Lifestyles', level: 4 })).to.exist;
		expect(screen.getByPlaceholderText('Filter the table')).to.exist;
		expect(screen.getByRole('cell', { name: 'Luxury' })).to.exist;
	});

	it('should not display a display table if there are no purchased lifestyles', () => {
		setup();

		expect(screen.queryByRole('table')).to.be.null;
	});

	it('should display a row for each purchased lifestyle', () => {
		setup(purchasedLifestyles);

		const rows = within(screen.getByRole('table')).getAllByRole('row').slice(1);

		expect(rows.map((row) => within(row).getAllByRole('cell')[1].textContent))
			.to.eql(['Street', 'Medium']);
	});

	it('should sell the lifestyle in the clicked row', async () => {
		const { props } = setup(purchasedLifestyles);

		const mediumRow = screen.getByRole('cell', { name: 'Medium' }).closest('tr');
		await userEvent.click(within(mediumRow).getByRole('button', { name: '-' }));

		expect(props.sellGear).to.have.been.calledOnceWith({ index: 1, category: 'lifestyles' });
	});
});
