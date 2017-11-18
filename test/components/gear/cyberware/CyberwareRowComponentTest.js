import React from 'react';
import { shallow } from 'enzyme';

import CyberwareRowComponent from 'components/gear/cyberware/CyberwareRowComponent';

describe('CyberwareRowComponent', () => {
	const datajack = {
		id: "47c48542-48c3-417e-91f0-b5a456183f05",
		name: "Datajack",
		category: "Headware",
		ess: "0.1",
		capacity: "0",
		avail: "2",
		cost: "1000",
		source: "SR5",
		page: "452"
	};

	const setup = (ware = datajack) => {
		const props = {
			ware
		},
			cyberwareRowComponent = shallow(<CyberwareRowComponent {...props} />);
		return {cyberwareRowComponent, props};
	}

	it('should display stats about cyberware', () => {
		const { cyberwareRowComponent } = setup();

		expect(cyberwareRowComponent.find('.cyberware--name').text()).to.equal(datajack.name);
		expect(cyberwareRowComponent.find('.cyberware--ess').text()).to.equal(datajack.ess);
		expect(cyberwareRowComponent.find('.cyberware--avail').text()).to.equal(datajack.avail);
		expect(cyberwareRowComponent.find('.cyberware--cost').text()).to.equal(`${datajack.cost}¥`);
		expect(cyberwareRowComponent.find('.cyberware--ref').text()).to.equal(`${datajack.source} ${datajack.page}`);
	});
});