import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MechModRow from 'components/gear/mech/MechModRowComponent';
import { renderRow } from '../../../helpers/render';

describe('Mech Mod Row Component', () => {
	const modWithRating = {
			id: '6ac249ee-84c0-498f-9377-149ccbc2f959',
			name: 'Acceleration Enhancement',
			page: '154',
			source: 'R5',
			avail: '6',
			category: 'Powertrain',
			cost: 'FixedValues(Acceleration * 10000,Acceleration * 25000)',
			rating: '2',
			slots: 'FixedValues(4,8)',
			bonus: {
				accel: '+Rating',
				offroadaccel: '+Rating',
			},
		},
		modWRatingAvail = {
			id: '956a20f7-64f3-4160-88a0-d6d6b29b0bd1',
			name: 'Handling Enhancement',
			page: '154',
			source: 'R5',
			avail: 'FixedValues(6,8,10)',
			category: 'Powertrain',
			cost: 'FixedValues(Handling*2000,Handling*5000,Handling*12000)',
			rating: '3',
			slots: 'FixedValues(4,10,18)',
			bonus: {
				handling: '+Rating',
				offroadhandling: '+Rating',
			},
		},
		scoot = {
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
		},
		falcon = {
			id: 'cfafdbac-509e-49f3-a62a-5cfa8e987e0f',
			name: 'Evo Falcon-EX',
			page: '43',
			source: 'R5',
			accel: '1/2',
			armor: '9',
			avail: '0',
			body: '7',
			category: 'Bikes',
			cost: '10000',
			handling: '3/5',
			pilot: '1',
			sensor: '1',
			speed: '2/3',
			gears: {
				gear: {
					'-rating': '1',
					'-maxrating': '6',
					'#text': 'Sensor Array',
				},
			},
			mods: {
				name: 'Tracked Propulsion',
			},
			seats: '2',
		},
		speedEnhance = {
			id: 'ecc73836-9110-4f5f-9464-cb6ae6e954d2',
			name: 'Speed Enhancement',
			page: '157',
			source: 'R5',
			avail: 'FixedValues(6,8,12)',
			category: 'Powertrain',
			cost: 'FixedValues(Speed * 2000,Speed * 5000,Speed * 12000)',
			rating: '3',
			slots: 'FixedValues(5,14,20)',
			bonus: {
				offroadspeed: '+Rating',
				speed: '+Rating',
			},
		},
		geckoTip = {
			id: '06940788-ad0b-453c-bc8a-e54e6221c185',
			name: 'Gecko Tips',
			page: '154',
			source: 'R5',
			avail: '6',
			category: 'Powertrain',
			cost: '1000 + 4000*number(Body >= 4)',
			rating: '0',
			slots: '1 + 3*number(Body >= 4)',
			required: {
				vehicledetails: {
					body: {
						'-operation': 'lessthanequals',
						'#text': '6',
					},
				},
			},
		},
		terrier = {
			id: 'be4aa3ae-6725-4082-a5d2-8fa8d1e91640',
			name: 'Ares-Segway Terrier',
			page: '42',
			source: 'R5',
			accel: '1',
			armor: '2',
			avail: '0',
			body: '2',
			category: 'Bikes',
			cost: '4500',
			handling: '5/2',
			pilot: '2',
			sensor: '2',
			speed: '2',
			gears: {
				gear: {
					'-rating': '2',
					'-maxrating': '6',
					'#text': 'Sensor Array',
				},
			},
			mods: {
				name: 'Gyro-Stabilization',
			},
			seats: '1',
		},
		multifuel = {
			id: 'b242a897-74d6-44da-9922-b0b1f4537609',
			name: 'Multifuel Engine',
			page: '155',
			source: 'R5',
			avail: '10',
			category: 'Powertrain',
			cost: 'Body * 1000',
			rating: '0',
			slots: '4',
		},
		offroad = {
			id: '5acc99df-ffaf-4c43-93bc-07b552fc4c1c',
			name: 'Off-Road Suspension',
			page: '155',
			source: 'R5',
			avail: '4',
			category: 'Powertrain',
			cost: 'Vehicle Cost * 0.25',
			rating: '0',
			slots: '2',
			bonus: {
				handling: '-1',
				offroadhandling: '+1',
			},
		},
		nanomaintenance = {
			id: '74756635-ad88-437a-8123-599019aafa6c',
			name: 'Nanomaintenance System',
			page: '165',
			source: 'R5',
			avail: '(Rating * 5)R',
			category: 'Body',
			cost: 'Rating * 5000',
			rating: '4',
			slots: 'Rating',
		},
		ecm = {
			id: '518a5fdc-3b2c-42a6-a3fb-3cb88918fe72',
			name: 'ECM',
			page: '166',
			source: 'R5',
			avail: '(Rating * 3)F',
			category: 'Electromagnetic',
			cost: 'Rating * 500',
			rating: '6',
			slots: '2',
		},
		armor = {
			id: '85a85cfd-7703-48f6-9745-d0a2b64c8b9e',
			name: 'Armor (Concealed)',
			page: '159',
			source: 'R5',
			avail: '12R',
			category: 'Protection',
			cost: 'Rating * 3000',
			rating: 'body',
			slots: 'Rating * 3',
			bonus: {
				armor: 'Rating',
			},
		},
		adjustment = {
			id: 'a586e8b6-2737-4baa-a343-f366d33fe57a',
			name: 'Metahuman Adjustment',
			page: '170',
			source: 'R5',
			avail: '4',
			category: 'Cosmetic',
			cost: 'Rating * 500',
			rating: 'Seats',
			slots: '0',
			required: {
				vehicledetails: {
					seats: {
						'-operation': 'greaterthanequals',
						'#text': '1',
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
		};

	const setup = (mod = modWithRating, mech = scoot, selectedMod = false) => {
		const props = {
			mod,
			mech,
			mechIndex: 1,
			modAction: sinon.spy(),
			demodAction: sinon.spy(),
			selectedMod,
		};

		const { container } = renderRow(<MechModRow {...props} />);

		const cell = (name) => container.querySelector(`.mech-mod--${name}`).textContent;
		const selectRating = (rating) => userEvent.selectOptions(screen.getByRole('combobox'), String(rating));
		const ratingOptions = () => screen.getAllByRole('option').map((option) => option.value);

		return { props, cell, selectRating, ratingOptions };
	};

	describe('mods with rating', () => {
		it('should start at rating 1', () => {
			setup();

			expect(screen.getByRole('combobox').value).to.equal('1');
		});

		it('should render a rating select and display stats based off rating', () => {
			const { cell, ratingOptions } = setup();

			expect(cell('name')).to.equal('Acceleration Enhancement');
			expect(ratingOptions()).to.eql(['1', '2']);
			expect(cell('slot')).to.equal('4');
			expect(cell('avail')).to.equal('6');
			expect(cell('cost')).to.equal('10000¥');
			expect(cell('ref')).to.equal('R5 154p');
		});

		it('should calculate stats based off rating', async () => {
			const { cell, selectRating } = setup(nanomaintenance);

			expect(cell('cost')).to.equal('5000¥');
			expect(cell('slot')).to.equal('1');
			expect(cell('avail')).to.equal('5R');

			await selectRating(4);

			expect(cell('avail')).to.equal('20R');
			expect(cell('cost')).to.equal('20000¥');
			expect(cell('slot')).to.equal('4');
		});

		it('should calculate forbidden gear based off rating', () => {
			const { cell } = setup(ecm);

			expect(cell('avail')).to.equal('3F');
		});

		describe('max rating', () => {
			it('should go up to the body of the mech if rating is equal to body', () => {
				const { ratingOptions } = setup(armor);

				expect(ratingOptions()).to.eql(['1', '2', '3', '4']);
			});

			it('should go up to the number of seats of the mech', () => {
				const { ratingOptions } = setup(adjustment);

				expect(ratingOptions()).to.have.lengthOf(Number(scoot.seats));
			});
		});

		describe('fixedValues', () => {
			it('should change slot and cost', async () => {
				const { cell, selectRating } = setup();

				expect(cell('slot')).to.equal('4');
				expect(cell('cost')).to.equal('10000¥');

				await selectRating(2);

				expect(cell('slot')).to.equal('8');
				expect(cell('cost')).to.equal('25000¥');
			});

			it('should change avail', async () => {
				const { cell, selectRating } = setup(modWRatingAvail);

				expect(cell('slot')).to.equal('4');
				expect(cell('avail')).to.equal('6');
				expect(cell('cost')).to.equal('8000¥');

				await selectRating(3);

				expect(cell('slot')).to.equal('18');
				expect(cell('avail')).to.equal('10');
				expect(cell('cost')).to.equal('48000¥');
			});

			it('should find the highest handling', async () => {
				const { cell, selectRating } = setup(modWRatingAvail, falcon);

				expect(cell('cost')).to.equal('10000¥');

				await selectRating(3);

				expect(cell('cost')).to.equal('60000¥');
			});

			it('should calculate stats based off of speed', async () => {
				const { cell, selectRating } = setup(speedEnhance);

				expect(cell('cost')).to.equal('6000¥');

				await selectRating(3);

				expect(cell('cost')).to.equal('36000¥');
			});
		});
	});

	describe('conditional values', () => {
		const bigBodyMod = {
			...geckoTip,
			name: 'Big Body Test Mod',
			cost: 'Body * 3000 + (Body * 1000)*number(Body > 12)',
			avail: '(12 + 4*number(Body > 12))R',
		};

		it('should use the first value if the condition is false', () => {
			const { cell } = setup(geckoTip, terrier);

			expect(cell('slot')).to.equal('1');
			expect(cell('cost')).to.equal('1000¥');
		});

		it('should raise extra stats based off body if the condition is true', () => {
			const { cell } = setup(geckoTip);

			expect(cell('slot')).to.equal('4');
			expect(cell('cost')).to.equal('5000¥');
		});

		it('should calculate the value based off body', () => {
			const { cell } = setup(bigBodyMod);

			expect(cell('cost')).to.equal('12000¥');
		});

		it('should keep the restriction level of an item', () => {
			const { cell } = setup(bigBodyMod);

			expect(cell('avail')).to.equal('12R');
		});
	});

	describe('calculate stats', () => {
		it('should calculate stats based off of body', () => {
			const { cell } = setup(multifuel);

			expect(cell('cost')).to.equal('4000¥');
		});

		it('should calculate stats based off body and rating', () => {
			const { cell } = setup(droneSpeed, doberman);

			expect(cell('cost')).to.equal('1600¥');
		});

		it('should calculate stats based off of vehicle cost', () => {
			const { cell } = setup(offroad);

			expect(cell('cost')).to.equal('750¥');
		});
	});

	describe('mod checkbox', () => {
		describe('modAction', () => {
			it('should be called when the mod checkbox is checked', async () => {
				const { props } = setup(offroad);

				await userEvent.click(screen.getByRole('checkbox', { name: offroad.name }));

				expect(props.modAction).to.have.been.calledOnceWith({ index: 1, category: 'Vehicles', mod: { ...offroad, currentCost: 750, currentSlot: 2 } });
			});

			it('should add the cost and slots for the selected rating', async () => {
				const { props, selectRating } = setup(modWithRating);

				await selectRating(2);
				await userEvent.click(screen.getByRole('checkbox', { name: modWithRating.name }));

				expect(props.modAction).to.have.been.calledOnceWith({ index: 1, category: 'Vehicles', mod: { ...modWithRating, currentCost: 25000, currentSlot: 8 } });
			});
		});

		it('should call demodAction when the mod checkbox is unchecked', async () => {
			const { props } = setup(offroad, undefined, true);

			await userEvent.click(screen.getByRole('checkbox', { name: offroad.name }));

			expect(props.demodAction).to.have.been.calledOnceWith({ index: props.mechIndex, category: 'Vehicles', demodName: offroad.name, type: offroad.category });
			expect(props.modAction).to.not.have.been.called;
		});

		describe('checked', () => {
			it('should be checked if the mod is selected', () => {
				setup(offroad, undefined, true);

				expect(screen.getByRole('checkbox', { name: offroad.name }).checked).to.be.true;
			});

			it('should not be checked if the mod is not selected', () => {
				setup(offroad);

				expect(screen.getByRole('checkbox', { name: offroad.name }).checked).to.be.false;
			});
		});
	});
});
