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
	},	dataLock = {
		id: "eb9e691a-8002-4138-ac8d-d9714d398b1e",
		name: "Data Lock",
		category: "Headware",
		ess: "0.1",
		capacity: "[1]",
		avail: "Rating * 2",
		cost: "Rating * 1000",
		source: "SR5",
		page: "452",
		rating: "12"
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
		expect(cyberwareRowComponent.find('.cyberware--ref').text()).to.equal(`${datajack.source} p${datajack.page}`);
	});

	describe('rating', () => {
		it('should display N/A if there is no rating', () => {
			const { cyberwareRowComponent } = setup();

			expect(cyberwareRowComponent.find('.cyberware--rating').text()).to.equal('N/A');
		});

		it('should display a select box if there is a rating', () => {
			const { cyberwareRowComponent } = setup(dataLock);
			
			expect(cyberwareRowComponent.find('select')).lengthOf(1);

			expect(cyberwareRowComponent.find('option')).lengthOf(12);
		});

		it('should change state Rating on change event', () => {
			const {cyberwareRowComponent} = setup(dataLock);

			cyberwareRowComponent.find('select').simulate('change', {target: { value: '3'}});

			expect(cyberwareRowComponent.state('Rating')).to.equal(3);
		});
	});
});