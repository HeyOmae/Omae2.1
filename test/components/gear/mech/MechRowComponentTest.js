import React from 'react';
import { shallow } from 'enzyme';

import MechRow from 'components/gear/mech/MechRowComponent';

describe('Mech Row Component', () => {
	const setup = () => {
		const props = {
			mech: {
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
						'#text': 'Sensor Array'
					}
				},
				mods: {
					name: 'Improved Economy'
				},
				seats: '1'
			}
		},
			mechRow = shallow(<MechRow {...props} />);

		return {props, mechRow};
	};

	it('should render a table row', () => {
		const {mechRow} = setup();

		expect(mechRow.find('tr')).lengthOf(1);
	});

	it('should ')
});