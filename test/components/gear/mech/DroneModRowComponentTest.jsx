import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DroneModRow from 'components/gear/mech/DroneModRowComponent';
import { renderRow } from '../../../helpers/render';

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
		droneFrigile = {
			id: '3ffae49d-1b3d-4214-95da-96a25f8a65f2',
			name: 'Fragile (Drone)',
			page: '123',
			source: 'R5',
			avail: 'Rating * 3',
			category: 'All',
			cost: '0',
			rating: '99',
			slots: '-Rating',
			bonus: {
				body: '-Rating',
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
		handlingDowngrade = {
			id: 'f56c3103-e5e7-4b7c-8cdf-7d74d7196f35',
			name: 'Handling Downgrade (Drone)',
			page: '123',
			source: 'R5',
			avail: '0',
			category: 'Handling',
			cost: '0',
			rating: '0',
			slots: '-1',
			bonus: {
				handling: '-1',
				offroadhandling: '-1',
			},
			required: {
				vehicledetails: {
					category: {
						'-operation': 'contains',
						'#text': 'Drones',
					},
				},
			},
		};

	const setup = (mod = geckoGrip, mech = doberman, selectedMod = false) => {
		const props = {
			mod,
			mech,
			mechIndex: 1,
			modAction: sinon.spy(),
			demodAction: sinon.spy(),
			selectedMod,
		};

		const { container } = renderRow(<DroneModRow {...props} />);

		const cell = (name) => container.querySelector(`.mech-mod--${name}`).textContent;
		const costInput = () => container.querySelector('.mech-mod--cost input');
		const selectRating = (rating) => userEvent.selectOptions(screen.getByRole('combobox'), String(rating));
		const ratingOptions = () => screen.getAllByRole('option').map((option) => option.value);
		const toggle = () => userEvent.click(screen.getByRole('checkbox', { name: mod.name }));

		return { props, cell, costInput, selectRating, ratingOptions, toggle };
	};

	const change = (input, value) => fireEvent.change(input, { target: { value } });

	describe('displays', () => {
		it('mod stats', () => {
			const { cell, props } = setup();

			expect(cell('name')).to.equal(props.mod.name);
			expect(cell('rating')).to.equal('N/A');
			expect(cell('slot')).to.equal(props.mod.slots);
			expect(cell('avail')).to.equal(props.mod.avail);
			expect(cell('cost')).to.equal('600¥');
			expect(cell('ref')).to.equal('R5 125p');
		});

		it('should display avail with fixedValues and the restriction type', async () => {
			const { cell, selectRating } = setup(dronePilot);

			expect(cell('avail')).to.equal('4');

			await selectRating(4);

			expect(cell('avail')).to.equal('12R');

			await selectRating(6);

			expect(cell('avail')).to.equal('24F');
		});
	});

	describe('armor mod', () => {
		it('should be restricted if avail is between 6 and 12', () => {
			const { cell } = setup(droneArmor);

			expect(cell('avail')).to.equal('7R');
		});

		it('should have no restriction if avail is lower then 6', () => {
			const { cell } = setup(droneArmor, proletarian);

			expect(cell('avail')).to.equal('1');
		});

		it('should be forbidden if avail is over 12', () => {
			const { cell } = setup(droneArmor, { ...doberman, armor: '10' });

			expect(cell('avail')).to.equal('13F');
		});
	});

	describe('customize drone', () => {
		it('should display an input for price', () => {
			const { costInput } = setup(droneCustom);

			expect(costInput().placeholder).to.equal('10-10000¥');
			expect(costInput().value).to.equal('');
		});

		it('should update the cost on change', () => {
			const { costInput } = setup(droneCustom);

			change(costInput(), '200');

			expect(costInput().value).to.equal('200');
		});

		it('should not allow the cost to be over the max cost', () => {
			const { costInput } = setup(droneCustom);

			change(costInput(), '10001');

			expect(costInput().value).to.equal('10000');
		});
	});

	describe('rating limits', () => {
		describe('handling mod', () => {
			it('should set min and max rating', () => {
				const { ratingOptions } = setup(droneHandling);

				expect(ratingOptions()).to.eql(['6', '7', '8', '9', '10']);
			});

			it('should set the min/max based off the highest value', () => {
				const { ratingOptions } = setup(droneHandling, proletarian);

				expect(ratingOptions()).to.eql(['5', '6', '7', '8']);
			});
		});

		it('should set min and max rating for speed mod', () => {
			const { ratingOptions } = setup(droneSpeed);

			expect(ratingOptions()).to.eql(['4', '5', '6']);
		});

		it('should set min and max rating for Acceleration mod', () => {
			const { ratingOptions } = setup(droneAcc);

			expect(ratingOptions()).to.eql(['2']);
		});

		it('should set min and max rating for sensor mod', () => {
			const { ratingOptions } = setup(droneSensor);

			expect(ratingOptions()).to.eql(['4', '5', '6']);
		});

		it('should set min and max rating for armor mod', () => {
			const { ratingOptions } = setup(droneArmor);

			expect(ratingOptions()).to.eql(['7', '8']);
		});

		it('should set max rating to 1 when stat base is 0', () => {
			const { ratingOptions } = setup(droneArmor, proletarian);

			expect(ratingOptions()).to.eql(['1']);
		});

		describe('Fragile drone mod', () => {
			it('should set the max rating equal to half of the body', () => {
				const { ratingOptions } = setup(droneFrigile);

				expect(ratingOptions()).to.eql(['1', '2']);
			});
		});
	});

	describe('slots', () => {
		it('should not use any slots at the min rating', () => {
			const { cell } = setup(droneHandling);

			expect(cell('slot')).to.equal('0');
		});

		it('setting the rating above the min rating should eat up slot points', async () => {
			const { cell, selectRating } = setup(droneHandling);

			await selectRating(10);

			expect(cell('slot')).to.equal('4');
		});
	});

	describe('checkbox', () => {
		describe('when purchasing', () => {
			it('should set the current rating, slots, and currentCost', async () => {
				const { props, selectRating, toggle } = setup(droneHandling);

				await selectRating(10);
				await toggle();

				expect(props.modAction).to.have.been.calledOnceWith({
					index: 1,
					category: 'Drones',
					mod: {
						...droneHandling,
						currentCost: 8000,
						currentSlot: 4,
						currentRating: 10,
					},
				});
			});

			it('should use the entered cost for a custom cost', async () => {
				const { props, costInput, toggle } = setup(droneCustom);

				change(costInput(), '200');
				await toggle();

				expect(props.modAction).to.have.been.calledOnceWith({
					index: 1,
					category: 'Drones',
					mod: {
						...droneCustom,
						currentCost: 200,
						currentSlot: 0,
					},
				});
			});

			it('should set the custom cost to the min cost if not set', async () => {
				const { props, toggle } = setup(droneCustom);

				await toggle();

				expect(props.modAction).to.have.been.calledOnceWith({
					index: 1,
					category: 'Drones',
					mod: {
						...droneCustom,
						currentCost: 10,
						currentSlot: 0,
					},
				});
			});

			it('should set the custom cost to the min cost if value is below min', async () => {
				const { props, costInput, toggle } = setup(droneCustom);

				change(costInput(), '5');
				await toggle();

				expect(props.modAction).to.have.been.calledOnceWith({
					index: 1,
					category: 'Drones',
					mod: {
						...droneCustom,
						currentCost: 10,
						currentSlot: 0,
					},
				});
			});

			describe('downgrade', () => {
				it('should set the rating to 1 level lower then current rating', async () => {
					const { props, toggle } = setup(handlingDowngrade);

					await toggle();

					expect(props.modAction).to.have.been.calledOnceWith({
						index: 1,
						category: 'Drones',
						mod: {
							...handlingDowngrade,
							currentCost: 0,
							currentSlot: -1,
							currentRating: 4,
						},
					});
				});
			});

			describe('Fragile drone mod', () => {
				it('should set rating on purchase to body - rating', async () => {
					const { props, toggle } = setup(droneFrigile);

					await toggle();

					expect(props.modAction).to.have.been.calledOnceWith({
						index: 1,
						category: 'Drones',
						mod: {
							...droneFrigile,
							currentCost: 0,
							currentSlot: -1,
							currentRating: 3,
						},
					});
				});
			});
		});

		it('should fire demod when selling', async () => {
			const { props, toggle } = setup(geckoGrip, doberman, true);

			await toggle();

			expect(props.demodAction).to.have.been.calledOnceWith({
				index: props.mechIndex,
				category: 'Drones',
				demodName: props.mod.name,
				type: props.mod.category,
			});
			expect(props.modAction).to.not.have.been.called;
		});
	});
});
