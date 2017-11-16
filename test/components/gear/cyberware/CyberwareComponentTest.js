import React from 'react';
import { shallow } from 'enzyme';

import {CyberwareComponent} from 'components/gear/cyberware/CyberwareComponent';
import WareGradeComponent from 'components/gear/cyberware/WareGradeComponent';
import CyberwareHeader from 'components/gear/cyberware/CyberwareHeader';
import DisplayTableComponent from 'components/DisplayTableComponent';

describe('CyberwareComponent', () => {
	const setup = () => {
		const props = {},
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
	});
});