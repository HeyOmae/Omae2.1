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
		droneSensor = {
			id: '3389093b-869e-4a83-884e-05d2d439d41f',
			name: 'Sensor (Drone)',
			page: '123',
			source: 'R5',
			avail: 'Rating * 2',
			category: 'Sensor',
			cost: 'Rating * 1000',
			rating: '8',
			slots: 'Rating',
			bonus: {
				sensor: 'Rating',
			},
			minrating: 'Sensor + 1',
			required: {
				vehicledetails: {
					category: {
						'-operation': 'contains',
						'#text': 'Drones',
					},
				},
			},
		},
		dronePilot = {
			id: 'ed241716-0d10-4493-83c6-aa141a854ec3',
			name: 'Pilot Program (Drone)',
			page: '126',
			source: 'R5',
			avail: 'FixedValues(4,0,8R,12R,16F,24F)',
			category: 'All',
			cost: 'FixedValues(100,400,1800,3200,10000,20000)',
			rating: '6',
			slots: '0',
			bonus: {
				pilot: 'Rating',
			},
			required: {
				vehicledetails: {
					category: {
						'-operation': 'contains',
						'#text': 'Drones',
					},
				},
			},
		},
		droneCustom = {
			id: 'a7c9a0a4-bec5-4a01-a695-5b843e581123',
			name: 'Customized (Drone)',
			page: '125',
			source: 'R5',
			avail: '0',
			category: 'All',
			cost: 'Variable(10-10000)',
			rating: '0',
			slots: '0',
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
		proletarian = {
			id: 'd9157390-2003-4238-8738-6a24efc770f0',
			name: 'Evo Proletarian (Small)',
			page: '132',
			source: 'R5',
			accel: '1',
			armor: '0',
			avail: '6',
			body: '2',
			category: 'Drones: Small',
			cost: '4000',
			handling: '4/2',
			pilot: '2',
			sensor: '2',
			speed: '2',
			gears: {
				gear: [{
					'-rating': '2',
					'-maxrating': '3',
					'#text': 'Sensor Array',
				},
				{
					'-rating': '2',
					'-select': 'Automotive Mechanic',
					'#text': 'Skill Autosoft',
				},
				{
					'-select': 'Automotive Mechanic',
					'#text': 'Tool Kit',
				}],
			},
			mods: {
				name: 'Drone Arm',
			},
			modslots: '1',
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

		it('should display avail with fixedValues and the restriction type', () => {
			const { droneModRow } = setup(dronePilot);

			expect(droneModRow.find('.mech-mod--avail').text()).to.equal('4');

			droneModRow.setState({ rating: 4 });

			expect(droneModRow.find('.mech-mod--avail').text()).to.equal('12R');

			droneModRow.setState({ rating: 6 });

			expect(droneModRow.find('.mech-mod--avail').text()).to.equal('24F');
		});
	});

	describe('customize drone', () => {
		it('should display an number input for price', () => {
			const { droneModRow } = setup(droneCustom);

			expect(droneModRow.instance().variableCost.min).to.equal(10);
			expect(droneModRow.instance().variableCost.max).to.equal(10000);
			expect(droneModRow.find('.mech-mod--cost input').length).to.equal(1);
		});

		it('should update state.cost on change', () => {
			const { droneModRow } = setup(droneCustom);
			expect(droneModRow.find('.mech-mod--cost input').props().value).to.equal('');

			droneModRow.find('.mech-mod--cost input').simulate('change', { target: { value: '200' } });
			expect(droneModRow.state('cost')).to.equal(200);
			expect(droneModRow.find('.mech-mod--cost input').props().value).to.equal(200);
		});
	});

	describe('setting state', () => {
		describe('handling mod', () => {
			it('should set min and max rating', () => {
				const { droneModRow } = setup(droneHandling);

				const selectRatingProps = droneModRow.find(SelectRating).props();

				expect(selectRatingProps.minRating).to.equal(6);
				expect(selectRatingProps.item).to.deep.equal({ name: 'Handling (Drone)', rating: 10 });
			});

			it('should set the min/max based off the highest value', () => {
				const { droneModRow } = setup(droneHandling, proletarian);

				const selectRatingProps = droneModRow.find(SelectRating).props();

				expect(selectRatingProps.minRating).to.equal(5);
				expect(selectRatingProps.item).to.deep.equal({ name: 'Handling (Drone)', rating: 8 });
			});
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

		it('should set min and max rating for sensor mod', () => {
			const { droneModRow } = setup(droneSensor);

			const selectRatingProps = droneModRow.find(SelectRating).props();

			expect(selectRatingProps.minRating).to.equal(4);
			expect(selectRatingProps.item).to.deep.equal({ name: 'Sensor (Drone)', rating: 6 });
		});

		it('should set min and max rating for armor mod', () => {
			const { droneModRow } = setup(droneArmor);

			const selectRatingProps = droneModRow.find(SelectRating).props();

			expect(selectRatingProps.minRating).to.equal(7);
			expect(selectRatingProps.item).to.deep.equal({ name: 'Armor (Drone)', rating: 8 });
		});

		it('should set max rating to 1 when stat base is 0', () => {
			const { droneModRow } = setup(droneArmor, proletarian);

			const selectRatingProps = droneModRow.find(SelectRating).props();

			expect(selectRatingProps.minRating).to.equal(1);
			expect(selectRatingProps.item).to.deep.equal({ name: 'Armor (Drone)', rating: 1 });
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
});
