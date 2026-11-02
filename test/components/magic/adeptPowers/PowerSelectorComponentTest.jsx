import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PowerSelectorComponent } from 'components/magic/adeptPowers/PowerSelectorComponent';
import powerData from 'data/powers.json';
import { renderWithStore } from '../../../helpers/render';

describe('PowerSelectorComponent', () => {
	const [adrenalineBoost, astralPerception] = powerData;

	const setup = (args = {}) => {
		const {
			selectedPowers = [],
			pointsSpent = 0,
			maxPoints = 6,
			isMystic = false,
			karmaSpent = 0,
		} = args;

		const props = {
			selectedPowers,
			pointsSpent,
			maxPoints,
			isMystic,
			karmaSpent,
			actions: {
				addPower: sinon.spy(),
				decrementAugmented: sinon.spy(),
				incrementAugmented: sinon.spy(),
				lowerPower: sinon.spy(),
				raisePower: sinon.spy(),
				removePower: sinon.spy(),
			},
		};

		const { container } = renderWithStore(<PowerSelectorComponent {...props} />);

		return { props, container };
	};

	const selectedPowerNames = () => {
		const selected = screen.getByRole('heading', { name: 'Powers' }).closest('.selected-powers');
		return within(selected).getAllByRole('row').slice(1)
			.map((row) => within(row).getAllByRole('cell')[2].textContent);
	};

	it('should not display selected powers if none are selected', () => {
		setup();

		expect(screen.queryByRole('heading', { name: 'Powers' })).to.be.null;
	});

	describe('When isMystic is false', () => {
		it('should have rows matching powers passed in', () => {
			setup({ selectedPowers: [adrenalineBoost, astralPerception] });

			expect(selectedPowerNames()).to.eql([adrenalineBoost.name, astralPerception.name]);
		});

		it('should display power points but not Karma Spent info', () => {
			const { container } = setup({ pointsSpent: 2, selectedPowers: [adrenalineBoost] });

			expect(container.querySelector('.powers > p').textContent).to.equal('Power Points: 2');
		});
	});

	describe('When isMystic is true', () => {
		it('should have rows matching powers passed in', () => {
			setup({ isMystic: true, karmaSpent: 5, selectedPowers: [adrenalineBoost] });

			expect(selectedPowerNames()).to.eql([adrenalineBoost.name]);
		});

		it('should display Karma Spent info', () => {
			const { container } = setup({ isMystic: true, pointsSpent: 2, karmaSpent: 5, selectedPowers: [adrenalineBoost] });

			expect(container.querySelector('.powers > p').textContent).to.equal('Power Points: 2 Karma Spent: 5');
		});
	});

	it('should list every power in the powers modal', async () => {
		setup();

		await userEvent.click(screen.getByRole('button', { name: 'Powers' }));

		const modal = screen.getByRole('heading', { name: 'Powers', level: 4 }).closest('.modal');
		expect(within(modal).getAllByRole('row')).to.have.lengthOf(powerData.length + 1);
	});
});
