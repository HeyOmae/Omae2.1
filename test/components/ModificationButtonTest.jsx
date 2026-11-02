import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

		render(<ModificationButton {...props} />);

		return { button: screen.getByRole('button'), props };
	};

	it('should have a button with the default class', () => {
		const { button } = setup();

		expect(button.classList.contains('btn')).to.be.true;
	});

	it('should have a button with the passed class', () => {
		const { button } = setup('buttonTest');

		expect(button.className).to.equal('btn buttonTest');
	});

	it('should have a button with the passed in symbol', () => {
		const { button } = setup(undefined, '&');

		expect(button.textContent).to.equal('&');
	});

	it('should call modificationFunction when clicked and pointsLeft is 1', async () => {
		const { button, props } = setup(undefined, undefined, 1);

		await userEvent.click(button);

		expect(props.modificationFunction).to.have.been.calledOnceWith({
			attribute: 'agi',
			max: 6,
			spend: 'baseSpent',
		});
	});

	it('should not call modificationFunction when clicked and pointsLeft is 0', async () => {
		const { button, props } = setup(undefined, undefined, 0);

		await userEvent.click(button);

		expect(props.modificationFunction).to.not.have.been.called;
	});
});
