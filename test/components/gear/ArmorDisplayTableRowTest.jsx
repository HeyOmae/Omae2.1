import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ArmorDisplayTableRow from 'components/gear/armor/ArmorDisplayTableRow';
import { renderRow } from '../../helpers/render';

describe('<ArmorDisplayTableRow />', () => {
	// btnAction is called with the armor, index and row state on every render and
	// returns the click handler, so the spy records what a click would see
	const setup = (
		{ mod, currentRating, currentCost, rating } = {},
		cost = '1000',
	) => {
		const onClick = sinon.spy(),
			btnAction = sinon.spy((args) => () => onClick(args)),
			props = {
				armor: {
					name: 'Zoot suit',
					armor: '9',
					armorcapacity: '8',
					avail: '10',
					cost,
					source: 'FAKE',
					page: '404',
					rating,
					currentRating,
					currentCost,
				},
				btnClass: 'btn-success',
				btnSymbol: '-',
				btnAction,
				mod,
				index: 1,
			};

		const { container } = renderRow(<ArmorDisplayTableRow {...props} />);

		const cell = (name) => container.querySelector(`.armor-${name}`);
		const click = () => userEvent.click(screen.getByRole('button', { name: '-' }));
		const clickedState = () => onClick.lastCall.args[0].state;

		return { props, cell, click, clickedState, onClick };
	};

	const change = (input, value) => fireEvent.change(input, { target: { value } });

	it('should display armor stats based off props', () => {
		const { cell } = setup();

		expect(screen.getAllByRole('button')).to.have.lengthOf(1);
		expect(cell('name').textContent).to.equal('Zoot suit');
		expect(cell('value').textContent).to.equal('9');
		expect(cell('capacity').textContent).to.equal('8');
		expect(cell('avail').textContent).to.equal('10');
		expect(cell('cost').textContent).to.equal('1000¥');
		expect(cell('ref').textContent).to.equal('FAKE p404');
	});

	it('should display mod button in place of the name if passed in', () => {
		const { cell } = setup({ mod: <button type="button">Zoot suit mods</button> });

		expect(screen.getAllByRole('button')).to.have.lengthOf(2);
		expect(cell('name').textContent).to.equal('Zoot suit mods');
	});

	it('should display the currentRating and currentCost instead', () => {
		const { cell } = setup({ currentRating: 5, currentCost: 1500 });

		expect(cell('capacity').textContent).to.equal('5');
		expect(cell('cost').textContent).to.equal('1500¥');
	});

	describe('button', () => {
		it('should set class and symbol based off props', () => {
			setup();

			const button = screen.getByRole('button');
			expect(button.className).to.equal('btn btn-success');
			expect(button.textContent).to.equal('-');
		});

		it('should build the click handler from the armor, index and row state', async () => {
			const { props, click, onClick } = setup();

			const expected = { armor: props.armor, index: 1, state: { Rating: null, currentCost: null } };
			expect(props.btnAction).to.have.been.calledWith(expected);

			await click();

			expect(onClick).to.have.been.calledOnceWith(expected);
		});
	});

	describe('armor rating', () => {
		it('should display an empty input field instead of capacity', () => {
			const { cell } = setup({ rating: '6' }, '400 * Rating');

			const input = cell('capacity').querySelector('input');
			expect(input.value).to.equal('');
			expect(input.placeholder).to.equal('1-6');
		});

		describe('onChange', () => {
			it('should update the Rating', async () => {
				const { cell, click, clickedState } = setup({ rating: '6' }, '400 * Rating');

				change(cell('capacity').querySelector('input'), '3');
				await click();

				expect(cell('capacity').querySelector('input').value).to.equal('3');
				expect(clickedState().Rating).to.equal('3');
			});

			it('should update the value to the max rating if given a number over', async () => {
				const { cell, click, clickedState } = setup({ rating: '6' }, '400 * Rating');

				change(cell('capacity').querySelector('input'), '7');
				await click();

				expect(cell('capacity').querySelector('input').value).to.equal('6');
				expect(clickedState().Rating).to.equal('6');
			});

			it('should set the value to empty string if less then 1', async () => {
				const { cell, click, clickedState } = setup({ rating: '6' }, '400 * Rating');

				change(cell('capacity').querySelector('input'), '3');
				change(cell('capacity').querySelector('input'), '0');
				await click();

				expect(cell('capacity').querySelector('input').value).to.equal('');
				expect(clickedState().Rating).to.equal('');
			});
		});

		it('should not display the rating input if there is a current rating', () => {
			const { cell } = setup({ rating: '6', currentRating: 3 }, '400 * Rating');

			expect(cell('capacity').querySelector('input')).to.be.null;
			expect(cell('capacity').textContent).to.equal('3');
		});
	});

	describe('Variable cost', () => {
		it('should have an empty input field with the range if the cost is variable', () => {
			const { cell } = setup({}, 'Variable(20-100000)');

			const input = cell('cost').querySelector('input');
			expect(input.value).to.equal('');
			expect(input.max).to.equal('100000');
			expect(input.placeholder).to.equal('20-100000');
		});

		describe('input onChange', () => {
			it('should update the currentCost', async () => {
				const { cell, click, clickedState } = setup({}, 'Variable(20-100000)');

				change(cell('cost').querySelector('input'), '500');
				await click();

				expect(cell('cost').querySelector('input').value).to.equal('500');
				expect(clickedState()).to.eql({ Rating: null, currentCost: '500' });
			});

			it('should not allow a NaN', async () => {
				const { cell, click, clickedState } = setup({}, 'Variable(20-100000)');

				// number inputs sanitize non-numbers to an empty value
				change(cell('cost').querySelector('input'), '500');
				change(cell('cost').querySelector('input'), 'e');
				await click();

				expect(clickedState().currentCost).to.equal('');
			});

			// I don't care to enforce a min and a max on cost as this is designed to be a nuyen sink
		});
	});
});
