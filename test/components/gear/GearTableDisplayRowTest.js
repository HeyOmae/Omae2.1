import React from 'react';
import {shallow} from 'enzyme';

import GearTableDislayRow from 'components/gear/GearTableDislayRow';

describe('<GearTableDisplayRow />', () => {
	const setup = () => {
		const props = {},
			gearTableDislayRow = shallow(<GearTableDislayRow {...props} />);

		return { gearTableDislayRow, props };
	};

	it('should display gear stats', () => {
		const { gearTableDislayRow, props } = setup();

		
	});
});
