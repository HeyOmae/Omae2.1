import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LifeStylePurchasedRowComponent from 'components/lifestyles/LifeStylePurchasedRowComponent';
import { renderRow } from '../../helpers/render';

describe('<LifeStylePurchasedRowComponent />', () => {
	const setup = () => {
		const props = {
			lifestyle: {
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
			},
			index: 2,
			sellLifestyle: sinon.spy(),
		};

		renderRow(<LifeStylePurchasedRowComponent {...props} />);

		return { props };
	};

	it('should display stats on the lifestyle', () => {
		setup();

		const cells = screen.getAllByRole('cell').map((cell) => cell.textContent.trim());

		expect(cells).to.eql(['-', 'Medium', '5000¥', 'SR5 369p']);
	});

	it('should call sellLifestyle when clicking sell button', async () => {
		const { props } = setup();

		await userEvent.click(screen.getByRole('button', { name: '-' }));

		expect(props.sellLifestyle).to.have.been.calledOnceWith({ index: 2, category: 'lifestyles' });
	});
});
