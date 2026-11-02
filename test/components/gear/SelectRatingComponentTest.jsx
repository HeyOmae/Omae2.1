import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SelectRating from 'components/gear/SelectRatingComponent';

describe('Select Rating Component', () => {
	const setup = (rating, minRating) => {
		const props = {
			item: {
				rating,
				name: 'taco',
			},
			// read the value while the event is live; React 16 pools synthetic events
			updateRating: sinon.spy((event) => event.target.value),
			minRating,
		};

		const { container } = render(<SelectRating {...props} />);

		return { props, container };
	};

	it('should render N/A if rating is undefined', () => {
		const { container } = setup();

		expect(container.textContent).to.equal('N/A');
	});

	it('should render rating number of options', () => {
		setup('6');

		expect(screen.getAllByRole('option').map((option) => option.value))
			.to.eql(['1', '2', '3', '4', '5', '6']);
	});

	it('should render N/A if rating is 0', () => {
		const { container } = setup('0');

		expect(container.textContent).to.equal('N/A');
	});

	it('should fire updateRating prop when the select is changed', async () => {
		const { props } = setup('6');

		await userEvent.selectOptions(screen.getByRole('combobox'), '4');

		expect(props.updateRating).to.have.been.calledOnce;
		expect(props.updateRating.firstCall.returnValue).to.equal('4');
	});

	it('should be able to set the minimum rating', () => {
		setup('6', 4);

		expect(screen.getAllByRole('option').map((option) => option.value))
			.to.eql(['4', '5', '6']);
	});
});
