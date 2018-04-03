import React from 'react';
import { shallow } from 'enzyme';

import MechModRow from 'components/gear/mech/MechModRowComponent';
import SelectRating from 'components/gear/SelectRatingComponent';

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
				offroadaccel: '+Rating'
			}
		}, modWRatingAvail = {
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
				offroadhandling: '+Rating'
			}
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
					'#text': 'Sensor Array'
				}
			},
			mods: {
				name: 'Improved Economy'
			},
			seats: '1'
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
					'#text': 'Sensor Array'
				}
			},
			mods: {
				name: 'Tracked Propulsion'
			},
			seats: '2'
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
				speed: '+Rating'
			}
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
						'#text': '6'
					}
				}
			}
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
					'#text': 'Sensor Array'
				}
			},
			mods: {
				name: 'Gyro-Stabilization'
			},
			seats: '1'
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
			slots: '4'
		},
		setup = (mod = modWithRating, mech = scoot) => {
			const props = {
				mod,
				mech
			},

			mechModRow = shallow(<MechModRow {...props} />);

			return {props, mechModRow};
		};

	describe('mods with rating', () => {
		it('should set the state rating', () => {
			const { mechModRow } = setup();

			expect(mechModRow.state().rating).to.equal(1);
		});

		it('should render a SelectRatingComponent and display stats based off rating', () => {
			const { mechModRow, props } = setup();

			expect(mechModRow.find('.mech-mod--name').text()).to.equal(props.mod.name);
			expect(mechModRow.find('.mech-mod--rating').find(SelectRating)).lengthOf(1);
			expect(mechModRow.find('.mech-mod--slot').text()).to.equal('4');
			expect(mechModRow.find('.mech-mod--avail').text()).to.equal('6');
			expect(mechModRow.find('.mech-mod--cost').text()).to.equal('10000¥');
			expect(mechModRow.find('.mech-mod--ref').text()).to.equal('R5 154p');
		});

		describe('fixedValues', () => {
			it('should change slot and cost', () => {
				const { mechModRow, props } = setup();
				expect(mechModRow.find('.mech-mod--slot').text()).to.equal('4');
				expect(mechModRow.find('.mech-mod--cost').text()).to.equal('10000¥');
				expect(mechModRow.state().rating).to.equal(1);

				mechModRow.instance().updateRating({target: {value: '2'}});
				mechModRow.update();

				expect(mechModRow.state().rating).to.equal(2);
				expect(mechModRow.find('.mech-mod--slot').text()).to.equal('8');
				expect(mechModRow.find('.mech-mod--cost').text()).to.equal('25000¥');
			});

			it('should change avail', () => {
				const { mechModRow, props } = setup(modWRatingAvail);
				expect(mechModRow.find('.mech-mod--slot').text()).to.equal('4');
				expect(mechModRow.find('.mech-mod--avail').text()).to.equal('6');
				expect(mechModRow.find('.mech-mod--cost').text()).to.equal('8000¥');
				expect(mechModRow.state().rating).to.equal(1);

				mechModRow.instance().updateRating({target: {value: '3'}});
				mechModRow.update();

				expect(mechModRow.state().rating).to.equal(3);
				expect(mechModRow.find('.mech-mod--slot').text()).to.equal('18');
				expect(mechModRow.find('.mech-mod--avail').text()).to.equal('10');
				expect(mechModRow.find('.mech-mod--cost').text()).to.equal('48000¥');
			});

			it('should find the highest handling', () => {
				const { mechModRow, props } = setup(modWRatingAvail, falcon);

				expect(mechModRow.find('.mech-mod--cost').text()).to.equal('10000¥');
				expect(mechModRow.state().rating).to.equal(1);

				mechModRow.instance().updateRating({target: {value: '3'}});
				mechModRow.update();

				expect(mechModRow.state().rating).to.equal(3);
				expect(mechModRow.find('.mech-mod--cost').text()).to.equal('60000¥');
			});

			it('should calculate stats based off of speed', () => {
				const { mechModRow, props } = setup(speedEnhance);

				expect(mechModRow.find('.mech-mod--cost').text()).to.equal('6000¥');

				mechModRow.instance().updateRating({target: {value: '3'}});
				mechModRow.update();

				expect(mechModRow.find('.mech-mod--cost').text()).to.equal('36000¥');
			});

			it('should calculate stats based off of body', () => {
				const { mechModRow, props } = setup(multifuel);

				expect(mechModRow.find('.mech-mod--cost').text()).to.equal('4000¥');
			});

		});

		describe('conditionalValue', () => {
			it('should return the first value if the conditional value is false', () => {
				const { mechModRow, props } = setup(geckoTip, terrier);

				expect(mechModRow.instance().conditionalValue('1 + 3*number(Body >= 4)')).to.equal(1);
			});

			it('should return the calculate the value if the conditional value is true', () => {
				const { mechModRow, props } = setup(geckoTip);

				expect(mechModRow.instance().conditionalValue('1 + 3*number(Body >= 4)')).to.equal(4);
			});

			it('should return the calculate the value based off body if the conditional value is true', () => {
				const { mechModRow, props } = setup(geckoTip);

				expect(mechModRow.instance().conditionalValue('Body * 3000 + (Body * 1000)*number(Body > 12)')).to.equal(12000);
			});

			it('should return an avail string with the restirction level of an item', () => {
				const { mechModRow, props } = setup(geckoTip);

				expect(mechModRow.instance().conditionalValue('(12 + 4*number(Body > 12))R')).to.equal('12R');
			});

			it('should should raise extra stats based off body', () => {
				const { mechModRow, props } = setup(geckoTip);

				expect(mechModRow.find('.mech-mod--cost').text()).to.equal('5000¥');
				expect(mechModRow.find('.mech-mod--slot').text()).to.equal('4');
			});
		});
	});
});
