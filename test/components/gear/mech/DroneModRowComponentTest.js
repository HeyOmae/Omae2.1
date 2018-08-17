import React from 'react';
import { shallow } from 'enzyme';

import DroneModRow from 'components/gear/mech/DroneModRowComponent';
import SelectRating from 'components/gear/SelectRatingComponent';

describe('Drone Mod Row Component', () => {
	const geckoGrip = {
			id: '1a626185-b826-466c-aa73-32c02bae4bef',
			name: 'Gecko Grips (Drone)',
			page: '125',
			source: 'R5',
			avail: '4R',
			category: 'All',
			cost: 'Body * 150',
			rating: '0',
			slots: '1',
			required: {
				vehicledetails: {
					category: {
						'-operation': 'contains',
						'#text': 'Drones',
					},
				},
			},
		},
		droneArmor = {
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
			required: {
				vehicledetails: {
					category: {
						'-operation': 'contains',
						'#text': 'Drones',
					},
				},
			},
		},
		doberman = {
			id: '9186a0a7-635f-4242-a0e8-238f48b17ca2',
			name: 'GM-Nissan Doberman (Medium)',
			page: '466',
			source: 'SR5',
			accel: '1',
			armor: '4',
			avail: '4R',
			body: '4',
			category: 'Drones: Medium',
			cost: '5000',
			handling: '5',
			pilot: '3',
			sensor: '3',
			speed: '3',
			gears: {
				gear: {
					'-rating': '3',
					'-maxrating': '4',
					'#text': 'Sensor Array',
				},
			},
			weaponmounts: {
				weaponmount: {
					size: 'Standard [SR5]',
					visibility: 'External',
					flexibility: 'Fixed',
					control: 'Remote',
				},
			},
		},
		setup = (mod = geckoGrip, mech = doberman, selectedMod = false) => {
			const props = {
					mod,
					mech,
					mechIndex: 1,
					modAction: sinon.spy(),
					demodAction: sinon.spy(),
					selectedMod,
				},
				droneModRow = shallow(<DroneModRow {...props} />);

			return { props, droneModRow };
		};
	it('should exist', () => {
		const { droneModRow } = setup();

		expect(droneModRow.text()).to.equal('Drone stuff');
	});

	xdescribe('Range values are dumb so', () => {
		it('should display armor rating for avail', () => {
			const { mechModRow } = setup(droneArmor, doberman);

			expect(mechModRow.find('.mech-mod--avail').text()).to.equal(doberman.armor);
		});
		it('should set the min state rating to armor', () => {
			const { mechModRow } = setup(droneArmor, doberman);

			expect(mechModRow.instance().minRating).to.equal(+doberman.armor);
		});
	});
});
