import React from 'react';
import { shallow } from 'enzyme';

import ArmorModRow from 'components/gear/armor/ArmorModRow';

describe('<ArmorModRow/>', () => {
	const setup = (cost = '200') => {
		const props = {
			armorName: 'Blue Suede Shoes',
			mod: {
				name: 'Rock',
				maxrating: '6',
				avail: '12',
				cost
			},
			selectedMod: true,
			index: 0,
			modArmor: sinon.spy(),
			demodArmor: sinon.spy()
		},
			armorModRow = shallow(<ArmorModRow {...props} />);
		return {armorModRow, props};
	};

	it('should display "N/A" if the mod does not have a rating', () => {
		const {armorModRow} = setup();
		expect(armorModRow.find('.armor-mod--rating').text()).to.equal('N/A');
	});

	it('should display an input field if the mod has a rating', () => {
		const { armorModRow } = setup('Rating * 100'),
			ratingInput = armorModRow.find('.armor-mod--rating input');

		expect(ratingInput.props().type).to.equal('number');
		expect(ratingInput.props().placeholder).to.equal('1-6');
	});
});
