import React from 'react';
import { shallow } from 'enzyme';

import LifeStyleComponent from 'components/lifestyles/LifeStyleComponent';

describe('<LifeStyleComponent />', () => {
	const setup = () => {
		const props = {},
			lifeStyle = shallow(<LifeStyleComponent {...props} />);

		return { lifeStyle, props };
	};

	it('should display the lifestyles', () => {
		const { lifeStyle } = setup();

		const lifestyleItems = lifeStyle.find('.lifestyle--item');

		expect(lifestyleItems.length).to.equal(11);
	});
});
