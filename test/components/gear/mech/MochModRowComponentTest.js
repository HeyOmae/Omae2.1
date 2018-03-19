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
		setup = (mod = modWithRating) => {
			const props = {
				mod,
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
		});

	});
});
