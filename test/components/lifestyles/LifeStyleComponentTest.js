import React from 'react';
import { shallow } from 'enzyme';

import LifeStyleComponent from 'components/lifestyles/LifeStyleComponent';

describe('<LifeStyleComponent />', () => {
	const setup = () => {
		const props = {},
			lifeStyle = shallow(<LifeStyleComponent {...props} />);

		return { lifeStyle, props };
	};

	it('should exist', () => {
		const { lifeStyle } = setup();

		expect(lifeStyle).to.be.not.undefined;
	});
});
