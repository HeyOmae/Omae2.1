import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LifeStyleRowComponent from 'components/lifestyles/LifeStyleRowComponent';
import { renderRow } from '../../helpers/render';

describe('<LifeStyleRowComponent />', () => {
	const setup = () => {
		const props = {
			lifestyle: {
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
			},
			purchaseGear: sinon.spy(),
		};

		renderRow(<LifeStyleRowComponent {...props} />);

		return { props };
	};

	it('should display the lifestyle', () => {
		setup();

		const cells = screen.getAllByRole('cell').map((cell) => cell.textContent.trim());

		expect(cells).to.eql(['+', 'Street', '0¥', 'SR5 369p']);
	});

	it('should fire the purchaseGear prop if the buy button is clicked', async () => {
		const { props } = setup();

		await userEvent.click(screen.getByRole('button', { name: '+' }));

		expect(props.purchaseGear).to.have.been.calledOnceWith({ gear: props.lifestyle, category: 'lifestyles' });
	});
});
