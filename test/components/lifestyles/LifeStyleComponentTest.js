import React from 'react';
import { shallow } from 'enzyme';

import LifeStyleComponent from 'components/lifestyles/LifeStyleComponent';

describe('<LifeStyleComponent />', () => {
	const setup = () => {
		const props = {},
			lifeStyle = shallow(<LifeStyleComponent {...props} />);

		return { lifeStyle, props };
	};

	it('should remove lifestyle "ID ERROR. Re-add life style to fix"', () => {
		const { lifeStyle } = setup(),
			{ lifestyles } = lifeStyle.instance();

		expect(lifestyles.length).to.equal(11);
		expect(lifestyles[0]).to.not.equal({
			id: '00000000-0000-0000-0000-000000000000',
			name: 'ID ERROR. Re-add life style to fix',
			cost: '1',
			dice: '1',
			multiplier: '0',
			source: 'SR5',
			page: '1',
			hide: '',
		});
	});

	it('should display the lifestyles table', () => {
		const { lifeStyle } = setup();

		const lifestyleItems = lifeStyle.find('.lifestyle--item'),
			{ lifestyles } = lifeStyle.instance();

		expect(lifestyleItems.length).to.equal(11);

		lifestyleItems.forEach((item, index) => {
			expect(item.find('.lifestyle--item__select button')).to.have.lengthOf(1);
			expect(item.find('.lifestyle--item__name').text()).to.equal(lifestyles[index].name);
			expect(item.find('.lifestyle--item__cost').text()).to.equal(lifestyles[index].cost);
			expect(item.find('.lifestyle--item__reference').text()).to.equal(`${lifestyles[index].source} ${lifestyles[index].page}p`);
		});
	});
});
