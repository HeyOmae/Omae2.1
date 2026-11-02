import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CyberlimbAttribute from 'components/gear/cyberware/CyberlimbAttributeComponent';

describe('CyberlimbAttribute', () => {
	const setup = (
		attributeName = 'Test',
		attributeValue = 3,
	) => {
		const props = {
			incrementAttribute: sinon.spy(),
			decrementAttribute: sinon.spy(),
			attributeName,
			attributeValue,
		};

		render(<CyberlimbAttribute {...props} />);

		return { props };
	};

	it('should display the attribute name and value', () => {
		setup('Agility', 5);

		expect(screen.getByRole('heading', { name: 'Agility' })).to.exist;
		expect(screen.getByText('5')).to.exist;
	});

	it('should have a button with + and a button with -', () => {
		setup();

		expect(screen.getAllByRole('button').map((button) => button.textContent))
			.to.eql(['+', '-']);
	});

	it('should call incrementAttribute with the attribute name when + is clicked', async () => {
		const { props } = setup();

		await userEvent.click(screen.getByRole('button', { name: '+' }));

		expect(props.incrementAttribute).to.have.been.calledOnceWith({ attribute: 'Test', max: 999, spend: 'not used' });
		expect(props.decrementAttribute).to.not.have.been.called;
	});

	it('should call decrementAttribute with the attribute name when - is clicked', async () => {
		const { props } = setup();

		await userEvent.click(screen.getByRole('button', { name: '-' }));

		expect(props.decrementAttribute).to.have.been.calledOnceWith({ attribute: 'Test', max: 999, spend: 'not used' });
		expect(props.incrementAttribute).to.not.have.been.called;
	});
});
