import React from 'react';
import { shallow } from 'enzyme';

import ArmorDisplayTableRow from 'components/gear/armor/ArmorDisplayTableRow';

describe('<ArmorDisplayTableRow />', () => {
	const setup = () => {
		const props = {
			armor: {
				name: 'Zoot suit',
				armor: '9',
				armorcapacity: '8',
				avail: '10',
				cost: '1000',
				source: 'FAKE',
				page: '40'
			},
			button: <button>+</button>,
			mod: null
		},
			armorDisplayTableRow = shallow(<ArmorDisplayTableRow {...props} />);

		return { armorDisplayTableRow, props };
	};

	it('should display armor stats based off props', () => {
		const { armorDisplayTableRow, props } = setup();

		expect(armorDisplayTableRow.find('button')).to.have.lengthOf(1);
		expect(armorDisplayTableRow.find('.armor-name').text()).to.equal(props.armor.name);
		expect(armorDisplayTableRow.find('.armor-value').text()).to.equal(props.armor.armor);
		expect(armorDisplayTableRow.find('.armor-capacity').text()).to.equal(props.armor.armorcapacity);
		expect(armorDisplayTableRow.find('.armor-avail').text()).to.equal(props.armor.avail);
		expect(armorDisplayTableRow.find('.armor-cost').text()).to.equal(props.armor.cost);
		expect(armorDisplayTableRow.find('.armor-ref').text()).to.equal(`${props.armor.source} p${props.armor.page}`);
	});
});
