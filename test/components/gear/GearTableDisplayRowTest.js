import React from 'react';
import {shallow} from 'enzyme';

import GearTableDislayRow from 'components/gear/GearTableDisplayRow';

describe('<GearTableDisplayRow />', () => {
	const setup = () => {
		const props = {
			gear: {
				name: 'Banana',
				avail: '3R',
				source: 'BK',
				page: '1337'
			}
		},
			gearTableDislayRow = shallow(<GearTableDislayRow {...props} />);

		return { gearTableDislayRow, props };
	};

	it('should display gear stats', () => {
		const { gearTableDislayRow, props } = setup();

		expect(gearTableDislayRow.find('.gear-name').text()).to.equal('Banana');
		expect(gearTableDislayRow.find('.gear-avail').text()).to.equal('3R');
		expect(gearTableDislayRow.find('.gear-ref').text()).to.equal('BK p1337');
	});
});
