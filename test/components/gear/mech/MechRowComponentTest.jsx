import React from 'react';
import { screen } from '@testing-library/react';

import MechRow from 'components/gear/mech/MechRowComponent';
import { renderRow } from '../../../helpers/render';

describe('Mech Row Component', () => {
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

	const moddedSteelLynx = {
		id: 'a8c39fd9-d219-4772-9f8e-49b1d0975733',
		name: 'Steel Lynx Combat Drone (Large)',
		page: '466',
		source: 'SR5',
		accel: '2',
		armor: '12',
		avail: '10R',
		body: '6',
		category: 'Drones: Large',
		cost: '25000',
		handling: '5',
		pilot: '3',
		sensor: '3',
		speed: '4',
		mods: {
			'Armor (Drone)': {
				id: 'dfa7cdcd-5d0e-4c9c-9f0b-90bf29ac5aff',
				name: 'Armor (Drone)',
				page: '123',
				source: 'R5',
				avail: 'Range(6[],12[R],MaxRating[F])',
				category: 'Armor',
				cost: 'Rating * Body * 200',
				rating: '99',
				slots: 'Rating',
				bonus: {
					armor: 'Rating',
				},
				minrating: 'Armor + 1',
				currentCost: 19200,
				currentSlot: 3,
				currentRating: 16,
			},
		},
		currentSlot: 3,
		currentCost: 44200,
		currentArmor: 16,
	};

	const setup = (mech = dodgeScoot, mechMod = null) => {
		const props = {
			mech,
			mechButton: <button type="button" className="btn btn-success">+</button>,
			mechMod,
		};

		renderRow(<MechRow {...props} />);

		return { props, cells: screen.getAllByRole('cell').map((cell) => cell.textContent) };
	};

	it('should display a mechs stats', () => {
		const { cells } = setup();

		expect(cells).to.eql(['+', 'Dodge Scoot (Scooter)', '4/3', '1', '4', '4', '1', '1', '0', '3000¥', 'SR5 462p']);
	});

	it('should show modified stats if they exist', () => {
		const { cells } = setup(moddedSteelLynx);

		expect(cells).to.eql(['+', 'Steel Lynx Combat Drone (Large)', '5', '2', '6', '12(16)', '3', '3', '10R', '44200¥', 'SR5 466p']);
	});

	it('should render the buy/sell button from props', () => {
		setup();

		expect(screen.getByRole('button', { name: '+' }).className).to.equal('btn btn-success');
	});

	it('mech name should be replaced with the mod button if defined', () => {
		setup(dodgeScoot, <button type="button" className="btn btn-info">Mod the Scoot</button>);

		expect(screen.getByRole('button', { name: 'Mod the Scoot' })).to.exist;
		expect(screen.queryByText('Dodge Scoot (Scooter)')).to.be.null;
	});
});
