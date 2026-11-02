import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PowerDetailRow from 'components/magic/adeptPowers/PowerDetailRow';
import { renderRow } from '../../../helpers/render';

describe('PowerDetailRow', () => {
	const setup = ({
		power = {},
		add = true,
		pointsSpent = 5,
		maxPoints = 6,
		index = 3,
		isMystic = true,
	} = {}) => {
		const props = {
			power: {
				name: 'TestName',
				levels: 'N/A',
				points: '0.5',
				source: 'Omae',
				page: 'v2',
				...power,
			},
			add,
			index,
			pointsSpent,
			maxPoints,
			isMystic,
			actions: {
				addPower: sinon.spy(),
				decrementAugmented: sinon.spy(),
				incrementAugmented: sinon.spy(),
				lowerPower: sinon.spy(),
				raisePower: sinon.spy(),
				removePower: sinon.spy(),
			},
		};

		renderRow(<PowerDetailRow {...props} />);

		return { props, cells: screen.getAllByRole('cell') };
	};

	describe('When we are making an add row', () => {
		describe('and there is not a bonus', () => {
			it('should display the power details', () => {
				const { cells } = setup();

				expect(cells.map((cell) => cell.textContent))
					.to.eql(['+', 'N/A', 'TestName', '0.5', 'N/A', 'Omae pv2']);
				expect(screen.queryByRole('combobox')).to.be.null;
			});

			it('should add the power when + is clicked', async () => {
				const { props } = setup();

				await userEvent.click(screen.getByRole('button', { name: '+' }));

				expect(props.actions.addPower).to.have.been.calledOnceWith({
					newSpell: { ...props.power, name: 'TestName' },
					isMystic: true,
				});
			});

			it('should not add the power if there are not enough points left', async () => {
				const { props } = setup({ pointsSpent: 5.75 });

				const button = screen.getByRole('button', { name: '+' });
				expect(button.classList.contains('disabled')).to.be.true;

				await userEvent.click(button);

				expect(props.actions.addPower).to.not.have.been.called;
			});

			it('should start a leveled power at level 1', async () => {
				const { props } = setup({ power: { levels: 'yes' } });

				await userEvent.click(screen.getByRole('button', { name: '+' }));

				expect(props.actions.addPower.firstCall.args[0].newSpell.levels).to.equal(1);
			});
		});

		describe('and there is a bonus', () => {
			const bonusPower = {
				name: 'Improved Physical Attribute',
				bonus: {
					selectattribute: {
						attribute: [
							'AGI',
							'STR',
						],
					},
				},
			};

			it('should have a select with a blank option and an option for each attribute', () => {
				setup({ power: bonusPower });

				expect(within(screen.getByRole('combobox')).getAllByRole('option').map((option) => option.textContent))
					.to.eql(['', '(agi)', '(str)']);
			});

			it('should add the power with the selected attribute', async () => {
				const { props } = setup({ power: bonusPower });

				await userEvent.selectOptions(screen.getByRole('combobox'), '(str)');
				await userEvent.click(screen.getByRole('button', { name: '+' }));

				const { newSpell } = props.actions.addPower.firstCall.args[0];
				expect(newSpell.name).to.equal('Improved Physical Attribute(str)');
				expect(newSpell.bonus).to.equal('str');
				expect(props.actions.incrementAugmented).to.have.been.calledOnceWith({ attribute: 'str' });
			});
		});
	});

	describe('When we are making a remove row', () => {
		describe('and there is not a bonus', () => {
			it('should display the power details with a remove button', () => {
				const { cells } = setup({ add: false });

				expect(cells.map((cell) => cell.textContent))
					.to.eql(['-', 'N/A', 'TestName', '0.5', 'N/A', 'Omae pv2']);
				expect(screen.getByRole('button', { name: '-' }).classList.contains('btn-warning')).to.be.true;
				expect(screen.queryByRole('combobox')).to.be.null;
			});

			it('should remove the power when - is clicked', async () => {
				const { props } = setup({ add: false });

				await userEvent.click(screen.getByRole('button', { name: '-' }));

				expect(props.actions.removePower).to.have.been.calledOnceWith({ powerIndex: 3, isMystic: true });
			});

			it('should show a level counter for leveled powers', () => {
				setup({ add: false, power: { levels: 2 } });

				const levelCell = screen.getAllByRole('cell')[1];
				expect(within(levelCell).getAllByRole('button').map((button) => button.textContent))
					.to.eql(['+', '-']);
				expect(levelCell.querySelector('span').textContent).to.equal('2');
			});
		});

		describe('and there is a bonus', () => {
			const bonusPower = {
				name: 'Improved Physical Attribute(agi)',
				levels: 2,
				bonus: 'agi',
			};

			it("should have the power's bonus in the 5th cell and no select", () => {
				const { cells } = setup({ power: bonusPower, add: false });

				expect(cells[4].textContent).to.equal('agi');
				expect(screen.queryByRole('combobox')).to.be.null;
			});

			it('should remove the augmented attribute when the power is removed', async () => {
				const { props } = setup({ power: bonusPower, add: false });

				const removeButton = within(screen.getAllByRole('cell')[0]).getByRole('button', { name: '-' });
				await userEvent.click(removeButton);

				expect(props.actions.decrementAugmented).to.have.been.calledOnceWith({ attribute: 'agi', decreaseBy: 2 });
				expect(props.actions.removePower).to.have.been.calledOnceWith({ powerIndex: 3, isMystic: true });
			});
		});
	});
});
