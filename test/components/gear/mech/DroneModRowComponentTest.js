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
		droneHandling = {
			id: '17da9812-5264-4ac6-a31c-3e8b7ddb6212',
			name: 'Handling (Drone)',
			page: '123',
			source: 'R5',
			avail: 'Rating * 2',
			category: 'Handling',
			cost: 'Body * Rating * 200',
			rating: '99',
			slots: 'Rating',
			bonus: {
				handling: 'Rating',
				offroadhandling: 'Rating',
			},
			minrating: 'Handling + 1',
			required: {
				vehicledetails: {
					category: {
						'-operation': 'contains',
						'#text': 'Drones',
					},
				},
			},
		},
		droneSpeed = {
			id: '4ee2420c-1fad-415a-83e3-7f9e72b5df11',
			name: 'Speed (Drone)',
			page: '123',
			source: 'R5',
			avail: 'Rating * 2',
			category: 'Speed',
			cost: 'Body * Rating * 400',
			rating: '99',
			slots: 'Rating',
			bonus: {
				offroadspeed: 'Rating',
				speed: 'Rating',
			},
			minrating: 'Speed + 1',
			required: {
				vehicledetails: {
					category: {
						'-operation': 'contains',
						'#text': 'Drones',
					},
				},
			},
		},
		droneAcc = {
			id: '426b1bb7-31ec-4656-aa89-332d6877e590',
			name: 'Acceleration (Drone)',
			page: '123',
			source: 'R5',
			avail: 'Rating * 4',
			category: 'Acceleration',
			cost: 'Body * Rating * 200',
			rating: '99',
			slots: 'Rating',
			bonus: {
				accel: 'Rating',
				offroadaccel: 'Rating',
			},
			minrating: 'Acceleration + 1',
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

	describe('displays', () => {
		it('mod stats', () => {
			const { droneModRow, props } = setup();

			expect(droneModRow.find('.mech-mod--name').text()).to.equal(props.mod.name);
			expect(droneModRow.find('.mech-mod--rating').find(SelectRating)).lengthOf(1);
			expect(droneModRow.find('.mech-mod--slot').text()).to.equal(props.mod.slots);
			expect(droneModRow.find('.mech-mod--avail').text()).to.equal(props.mod.avail);
			expect(droneModRow.find('.mech-mod--cost').text()).to.equal('600¥');
			expect(droneModRow.find('.mech-mod--ref').text()).to.equal('R5 125p');
		});
	});

	describe('setting state', () => {
		it('should set min and max rating for handling mod', () => {
			const { droneModRow } = setup(droneHandling);

			const selectRatingProps = droneModRow.find(SelectRating).props();

			expect(selectRatingProps.minRating).to.equal(6);
			expect(selectRatingProps.item).to.deep.equal({ name: 'Handling (Drone)', rating: 10 });
		});

		it('should set min and max rating for speed mod', () => {
			const { droneModRow } = setup(droneSpeed);

			const selectRatingProps = droneModRow.find(SelectRating).props();

			expect(selectRatingProps.minRating).to.equal(4);
			expect(selectRatingProps.item).to.deep.equal({ name: 'Speed (Drone)', rating: 6 });
		});

		it('should set min and max rating for Acceleration mod', () => {
			const { droneModRow } = setup(droneAcc);

			const selectRatingProps = droneModRow.find(SelectRating).props();

			expect(selectRatingProps.minRating).to.equal(2);
			expect(selectRatingProps.item).to.deep.equal({ name: 'Acceleration (Drone)', rating: 2 });
		});
	});

	describe('slots', () => {
		it('should not require use any slots until its over 1 over the min rating', () => {
			const { droneModRow } = setup(droneHandling);
			expect(droneModRow.find('.mech-mod--slot').text()).to.equal('0');
		});

		it('setting the rating above the minRating should eat up slot points', () => {
			const { droneModRow } = setup(droneHandling);
			droneModRow.setState({ rating: 10 });
			expect(droneModRow.find('.mech-mod--slot').text()).to.equal('4');
		});
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
