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
		},
		setup = (mod = modWithRating) => {
			const props = {
				mod,
			},

			mechModRow = shallow(<MechModRow {...props} />);

			return {props, mechModRow};
		};

	describe('mods with rating', () => {
		it('should render a SelectRatingComponent and display stats based off rating', () => {
			const { mechModRow, props } = setup();

			expect(mechModRow.find('.mech-mod--name').text()).to.equal(props.mod.name);
			expect(mechModRow.find('.mech-mod--rating').find(SelectRating)).lengthOf(1);
			expect(mechModRow.find('.mech-mod--slot').text()).to.equal('4');
			expect(mechModRow.find('.mech-mod--avail').text()).to.equal('6');
			expect(mechModRow.find('.mech-mod--cost').text()).to.equal('10000¥');
			expect(mechModRow.find('.mech-mod--ref').text()).to.equal('R5 154p');
		});
	});
});
