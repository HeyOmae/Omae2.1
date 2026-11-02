import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ArmorModRow from 'components/gear/armor/ArmorModRow';
import { renderRow } from '../../helpers/render';

describe('<ArmorModRow/>', () => {
	const setup = (cost = '200', selectedMod = true, currentRating) => {
		const props = {
			gearName: 'Blue Suede Shoes',
			mod: {
				name: 'Rock',
				maxrating: '6',
				avail: '12',
				cost,
			},
			selectedMod,
			index: 0,
			currentRating,
			modGear: sinon.spy(),
			demodGear: sinon.spy(),
		};

		const { container } = renderRow(<ArmorModRow {...props} />);

		return {
			props,
			container,
			checkbox: screen.getByRole('checkbox', { name: 'Rock' }),
			ratingInput: () => screen.getByRole('spinbutton'),
		};
	};

	const setRating = (input, value) => fireEvent.change(input, { target: { value } });

	it('should display name, avail, and cost', () => {
		const { container } = setup();

		expect(screen.getByText('Rock').tagName).to.equal('LABEL');
		expect(container.querySelector('.armor-mod--avail').textContent).to.equal('12');
		expect(container.querySelector('.armor-mod--cost').textContent).to.equal('200¥');
	});

	describe('mod rating input', () => {
		it('should display "N/A" if the mod does not have a rating', () => {
			const { container } = setup();

			expect(container.querySelector('.armor-mod--rating').textContent).to.equal('N/A');
			expect(screen.queryByRole('spinbutton')).to.be.null;
		});

		it('should display a number input if the mod has a rating', () => {
			const { ratingInput } = setup('Rating * 100');

			expect(ratingInput().type).to.equal('number');
			expect(ratingInput().placeholder).to.equal('1-6');
		});

		it('should display the currentRating of the mod if supplied', () => {
			const { ratingInput } = setup('Rating * 100', true, 6);

			expect(ratingInput().value).to.equal('6');
		});

		it('should update the rating on change', () => {
			const { ratingInput } = setup('Rating * 100');

			setRating(ratingInput(), '2');

			expect(ratingInput().value).to.equal('2');
		});

		it('should set any number over the maxrating to the maxrating', () => {
			const { ratingInput } = setup('Rating * 100');

			setRating(ratingInput(), '7');

			expect(ratingInput().value).to.equal('6');
		});

		it('should clear numbers lower than 1', () => {
			const { ratingInput } = setup('Rating * 100');

			setRating(ratingInput(), '3');
			setRating(ratingInput(), '-1');

			expect(ratingInput().value).to.equal('');
		});
	});

	describe('checkbox', () => {
		it('should be checked when selectedMod is true', () => {
			const { checkbox } = setup();

			expect(checkbox.checked).to.be.true;
		});

		it('should not be checked when selectedMod is false', () => {
			const { checkbox } = setup(undefined, false);

			expect(checkbox.checked).to.be.false;
		});

		it('should fire modGear when an unselected mod is checked', async () => {
			const { checkbox, props } = setup(undefined, false);

			await userEvent.click(checkbox);

			expect(props.modGear).to.have.been.calledOnceWith({
				index: 0,
				category: 'armors',
				mod: props.mod,
				Rating: false,
			});
			expect(props.demodGear).to.not.have.been.called;
		});

		it('should fire demodGear when a selected mod is unchecked', async () => {
			const { checkbox, props } = setup();

			await userEvent.click(checkbox);

			expect(props.demodGear).to.have.been.calledOnceWith({
				index: 0,
				category: 'armors',
				demodName: 'Rock',
			});
			expect(props.modGear).to.not.have.been.called;
		});

		it('should fire modGear with the entered Rating', async () => {
			const { checkbox, ratingInput, props } = setup('Rating * 100', false);

			setRating(ratingInput(), '3');
			await userEvent.click(checkbox);

			expect(props.modGear).to.have.been.calledOnceWith({
				index: 0,
				category: 'armors',
				mod: props.mod,
				Rating: 3,
			});
		});

		it('should fire modGear with Rating 1 if none is entered', async () => {
			const { checkbox, props } = setup('Rating * 100', false);

			await userEvent.click(checkbox);

			expect(props.modGear).to.have.been.calledOnceWith({
				index: 0,
				category: 'armors',
				mod: props.mod,
				Rating: 1,
			});
		});
	});
});
