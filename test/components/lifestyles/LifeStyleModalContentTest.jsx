import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LifeStyleModalContent } from 'components/lifestyles/LifeStyleModalContent';
import { renderWithStore } from '../../helpers/render';

describe('<LifeStyleModalContent />', () => {
	const setup = () => {
		const props = {
			purchaseLifestyle: sinon.spy(),
		};

		renderWithStore(<LifeStyleModalContent {...props} />);

		const lifestyleNames = () => screen.getAllByRole('row')
			.slice(1) // header row
			.map((row) => within(row).getAllByRole('cell')[1].textContent.trim());

		return { props, lifestyleNames };
	};

	it('should display a row for each lifestyle, without "ID ERROR. Re-add life style to fix"', () => {
		const { lifestyleNames } = setup();

		expect(lifestyleNames()).to.eql([
			'Street',
			'Squatter',
			'Low',
			'Medium',
			'High',
			'Luxury',
			'Commercial',
			'Bolt Hole',
			'Hospitalized, Basic',
			'Hospitalized, Intensive',
			'Traveler',
		]);
	});

	it('should filter the lifestyles from the filter input', async () => {
		const { lifestyleNames } = setup();

		await userEvent.type(screen.getByPlaceholderText('Filter the table'), 'hospital');

		expect(lifestyleNames()).to.eql(['Hospitalized, Basic', 'Hospitalized, Intensive']);
	});

	it('should purchase a lifestyle when its buy button is clicked', async () => {
		const { props } = setup();

		const lowRow = screen.getByRole('cell', { name: 'Low' }).closest('tr');
		await userEvent.click(within(lowRow).getByRole('button', { name: '+' }));

		expect(props.purchaseLifestyle).to.have.been.calledOnce;
		expect(props.purchaseLifestyle.firstCall.args[0].gear.name).to.equal('Low');
		expect(props.purchaseLifestyle.firstCall.args[0].category).to.equal('lifestyles');
	});
});
