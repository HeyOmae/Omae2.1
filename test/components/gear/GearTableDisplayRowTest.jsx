import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import GearTableDislayRow from 'components/gear/GearTableDisplayRow';
import { renderRow } from '../../helpers/render';

describe('<GearTableDisplayRow />', () => {
	// btnAction is called with the row's gear and state on every render and
	// returns the click handler, so the spy records what a click would see
	const setup = ({
		currentRating,
		rating = '0',
		cost = '5',
	} = {}) => {
		const onClick = sinon.spy(),
			btnAction = sinon.spy(({ gear, state }) => () => onClick({ gear, state })),
			props = {
				gear: {
					name: 'Banana',
					avail: '3R',
					source: 'BK',
					cost,
					page: '1337',
					rating,
					currentRating,
				},
				btnClass: 'btn-success',
				btnSymbol: '+',
				btnAction,
			};

		const { container } = renderRow(<GearTableDislayRow {...props} />);

		const cell = (name) => container.querySelector(`.gear-${name}`);
		const click = () => userEvent.click(screen.getByRole('button'));
		const clickedState = () => onClick.lastCall.args[0].state;

		return { props, cell, click, clickedState, onClick };
	};

	const change = (input, value) => fireEvent.change(input, { target: { value } });

	it('should display gear stats', () => {
		const { cell } = setup();

		expect(cell('name').textContent).to.equal('Banana');
		expect(cell('rating').textContent).to.equal('N/A');
		expect(cell('avail').textContent).to.equal('3R');
		expect(cell('cost').textContent).to.equal('5¥');
		expect(cell('ref').textContent).to.equal('BK p1337');
	});

	describe('button', () => {
		it('should set class and symbol based off props', () => {
			setup();

			const button = screen.getByRole('button');
			expect(button.className).to.equal('btn btn-success');
			expect(button.textContent).to.equal('+');
		});

		it('should build the click handler from the gear and the row state', async () => {
			const { props, click, onClick } = setup();

			expect(props.btnAction).to.have.been.calledWith({ gear: props.gear, state: { rating: null, currentCost: null } });

			await click();

			expect(onClick).to.have.been.calledOnceWith({ gear: props.gear, state: { rating: null, currentCost: null } });
		});

		it('should pass the entered rating to the click handler', async () => {
			const { cell, click, clickedState } = setup({ rating: '6', cost: '400 * Rating' });

			change(cell('rating').querySelector('input'), '3');
			await click();

			expect(clickedState().rating).to.equal(3);
		});

		it('should pass the entered variable cost to the click handler', async () => {
			const { cell, click, clickedState } = setup({ cost: 'Variable(20-100000)' });

			change(cell('cost').querySelector('input'), '500');
			await click();

			expect(clickedState()).to.eql({ rating: null, currentCost: 500 });
		});
	});

	describe('Rating', () => {
		it('should not display an input if gear.rating is 0', () => {
			const { cell } = setup();

			expect(cell('rating').querySelector('input')).to.be.null;
		});

		it('should display an empty input if gear.rating is over 0', () => {
			const { cell } = setup({ rating: '6' });

			const input = cell('rating').querySelector('input');
			expect(input.value).to.equal('');
			expect(input.placeholder).to.equal('1-6');
			expect(input.max).to.equal('6');
		});

		describe('onChange', () => {
			it('should update the rating in the field', async () => {
				const { cell, click, clickedState } = setup({ rating: '6' });

				change(cell('rating').querySelector('input'), '3');
				await click();

				expect(cell('rating').querySelector('input').value).to.equal('3');
				expect(clickedState().rating).to.equal(3);
			});

			it('should set the rating to the max rating if given a number over', async () => {
				const { cell, click, clickedState } = setup({ rating: '6' });

				change(cell('rating').querySelector('input'), '10');
				await click();

				expect(cell('rating').querySelector('input').value).to.equal('6');
				expect(clickedState().rating).to.equal(6);
			});

			it('should set any number lower then 1 to empty string', async () => {
				const { cell, click, clickedState } = setup({ rating: '6' });

				change(cell('rating').querySelector('input'), '3');
				change(cell('rating').querySelector('input'), '0');
				await click();

				expect(cell('rating').querySelector('input').value).to.equal('');
				expect(clickedState().rating).to.equal('');
			});
		});

		it('should display the current rating and not display input', () => {
			const { cell } = setup({ currentRating: 3, rating: '6' });

			expect(cell('rating').querySelector('input')).to.be.null;
			expect(cell('rating').textContent).to.equal('3');
		});
	});

	describe('Variable cost', () => {
		it('should display an empty cost input with the range', () => {
			const { cell } = setup({ cost: 'Variable(20-100000)' });

			const input = cell('cost').querySelector('input');
			expect(input.value).to.equal('');
			expect(input.max).to.equal('100000');
			expect(input.placeholder).to.equal('20-100000');
		});

		describe('onChange', () => {
			it('should update the cost on the input', () => {
				const { cell } = setup({ cost: 'Variable(20-100000)' });

				change(cell('cost').querySelector('input'), '300');

				expect(cell('cost').querySelector('input').value).to.equal('300');
			});

			it('should not allow a NaN', async () => {
				const { cell, click, clickedState } = setup({ cost: 'Variable(20-100000)' });

				// number inputs sanitize non-numbers to an empty value
				change(cell('cost').querySelector('input'), '300');
				change(cell('cost').querySelector('input'), 'e');
				await click();

				expect(clickedState().currentCost).to.equal(0);
			});
		});
	});
});
