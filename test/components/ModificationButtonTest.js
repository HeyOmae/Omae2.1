import React from 'react';
import { shallow } from 'enzyme';

import ModificationButton from 'components/ModificationButton';

describe('ModificationButton', () => {
	const setup = (
		buttonClass = 'btn-success',
		symbol = '+',
		pointsLeft = 3,
	) => {
		const props = {
			attName: 'agi',
			buttonClass,
			maxPoints: 6,
			pointsLeft,
			modificationFunction: sinon.spy(),
			attType: 'baseSpent',
			symbol,
		};

		const modificationButton = shallow(<ModificationButton {...props} />);

		return { modificationButton, props };
	};

	it('should have a button with the default class', () => {
		const { modificationButton } = setup();
		expect(modificationButton.find('button.btn').length)
			.to.equal(1);
	});

	it('should have a button with the passed class', () => {
		const { modificationButton } = setup('buttonTest');

		expect(modificationButton.find('button.btn.buttonTest').length)
			.to.equal(1);
	});

	it('should have a button with the passed in symbol', () => {
		const { modificationButton } = setup(undefined, '&');

		expect(modificationButton.find('button.btn').text())
			.to.equal('&');
	});

	it('should call modificationFunction when clicked and pointsLeft is 1', () => {
		const { modificationButton, props } = setup(undefined, undefined, 1);

		modificationButton.find('button.btn').simulate('click');
		expect(props.modificationFunction.calledOnce).to.be.true;
	});

	it('should not call modificationFunction when clicked and pointsLeft is 0', () => {
		const { modificationButton, props } = setup(undefined, undefined, 0);

		modificationButton.find('button.btn').simulate('click');
		expect(props.modificationFunction.calledOnce).to.be.false;
	});
});
