import React from 'react';
import { shallow } from 'enzyme';

import {CyberwareComponent} from 'components/gear/cyberware/CyberwareComponent';
import WareGradeComponent from 'components/gear/cyberware/WareGradeComponent';
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

	
});