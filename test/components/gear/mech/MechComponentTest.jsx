import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MechComponent } from 'components/gear/mech/MechComponent';
import { renderWithStore } from '../../../helpers/render';

describe('Mech Component', () => {
	const dodgeScoot = {
		id: 'c0d3e7fd-d5fd-48c4-b49d-0c7dea26895d',
		name: 'Dodge Scoot (Scooter)',
		page: '462',
		source: 'SR5',
		accel: '1',
		armor: '4',
		avail: '0',
		body: '4',
		category: 'Bikes',
		cost: '3000',
		handling: '4/3',
		pilot: '1',
		sensor: '1',
		speed: '3',
		gears: {
			gear: {
				'-rating': '1',
				'-maxrating': '6',
				'#text': 'Sensor Array',
			},
		},
		mods: {
			name: 'Improved Economy',
		},
		seats: '1',
	};

	const setup = (purchasedMech) => {
		const props = {
			classOfMechs: 'Vehicles',
			mechsByType: {
				bikes: [dodgeScoot],
				cars: [],
				boats: [],
			},
			mechMods: {},
			purchasedMech,
			purchaseMechAction: sinon.spy(),
			sellMechAction: sinon.spy(),
		};

		renderWithStore(<MechComponent {...props} />);

		return { props };
	};

	it('should render the class of the mech as a heading', () => {
		setup();

		expect(screen.getByRole('heading', { name: 'Vehicles', level: 3 })).to.exist;
	});

	it('should render a modal button for each item in mechsByType', () => {
		setup();

		expect(screen.getAllByRole('button').map((button) => button.textContent))
			.to.eql(['bikes', 'cars', 'boats']);
	});

	it('should purchase a mech from the modal', async () => {
		const { props } = setup();

		await userEvent.click(screen.getByRole('button', { name: 'bikes' }));

		const scootRow = screen.getByRole('cell', { name: dodgeScoot.name }).closest('tr');
		await userEvent.click(within(scootRow).getByRole('button', { name: '+' }));

		expect(props.purchaseMechAction).to.have.been.calledOnceWith({ gear: dodgeScoot, category: 'Vehicles' });
	});

	it('should sell a purchased mech', async () => {
		const { props } = setup([dodgeScoot]);

		const scootRow = screen.getByRole('cell', { name: dodgeScoot.name }).closest('tr');
		await userEvent.click(within(scootRow).getByRole('button', { name: '-' }));

		expect(props.sellMechAction).to.have.been.calledOnceWith({ index: 0, category: 'Vehicles' });
	});
});
