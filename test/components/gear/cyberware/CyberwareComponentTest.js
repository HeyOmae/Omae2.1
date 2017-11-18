import React from 'react';
import { shallow } from 'enzyme';

import {CyberwareComponent} from 'components/gear/cyberware/CyberwareComponent';
import WareGradeComponent from 'components/gear/cyberware/WareGradeComponent';
import CyberwareHeader from 'components/gear/cyberware/CyberwareHeader';
import CyberwareRow from 'components/gear/cyberware/CyberwareRowComponent';
import DisplayTableComponent from 'components/DisplayTableComponent';

describe('CyberwareComponent', () => {
	const cyberwareArray = [
		{
			id: "47c48542-48c3-417e-91f0-b5a456183f05",
			name: "Datajack",
			category: "Headware",
			ess: "0.1",
			capacity: "0",
			avail: "2",
			cost: "1000",
			source: "SR5",
			page: "452"
		},
		{
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
		},
		{
			id: "e9136c81-f8d5-4e7f-be2d-3be7ff6d1673",
			name: "Olfactory Booster",
			category: "Headware",
			ess: "0.2",
			capacity: "0",
			avail: "Rating * 3",
			cost: "Rating * 4000",
			source: "SR5",
			page: "452",
			rating: "6"
		},
		{
			id: "ed88f785-7d61-43ec-b4ed-0ebb94736f5e",
			name: "Simrig",
			category: "Headware",
			ess: "0.2",
			capacity: "0",
			avail: "12R",
			cost: "4000",
			source: "SR5",
			page: "452"
		}
	];
	const setup = (cyberwares = cyberwareArray) => {
		const props = {cyberwares},
			cyberwareComponent = shallow(<CyberwareComponent {...props} />);

		return { cyberwareComponent, props };
	};

	it('display a WareGradeComponent', () => {
		const {cyberwareComponent} = setup();

		expect(cyberwareComponent.find(WareGradeComponent).length).to.equal(1);
	});

	describe('table of cyberware', () => {
		it('should have a display table with cyberware header and rows', () => {
			const {cyberwareComponent} = setup();

			expect(cyberwareComponent.find(DisplayTableComponent).props().header).to.deep.equal(<CyberwareHeader />);
		});

		it('should render CyberwareRow for each cyberware passed in', () => {
			const {cyberwareComponent} = setup();

			expect(cyberwareComponent.find(CyberwareRow)).lengthOf(cyberwareArray.length);
		});
	});
});