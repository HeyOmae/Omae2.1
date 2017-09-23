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
				cost: '5',
				page: '1337'
			}
		},
			gearTableDislayRow = shallow(<GearTableDislayRow {...props} />);

		return { gearTableDislayRow, props };
	};

	it('should display gear stats', () => {
		const { gearTableDislayRow, props } = setup();

		expect(gearTableDislayRow.find('.gear-name').text()).to.equal(props.gear.name);
		expect(gearTableDislayRow.find('.gear-rating').text()).to.equal('N/A');
		expect(gearTableDislayRow.find('.gear-avail').text()).to.equal(props.gear.avail);
		expect(gearTableDislayRow.find('.gear-cost').text()).to.equal(`${props.gear.cost}¥`);
		expect(gearTableDislayRow.find('.gear-ref').text()).to.equal(`${props.gear.source} p${props.gear.page}`);
	});
});
