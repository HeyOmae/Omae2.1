import React from 'react';
import { shallow } from 'enzyme';

import ArmorModRow from 'components/gear/armor/ArmorModRow';

describe('<ArmorModRow/>', () => {
	const setup = (cost = '200', selectedMod = true, currentRating) => {
		const props = {
			armorName: 'Blue Suede Shoes',
			mod: {
				name: 'Rock',
				maxrating: '6',
				avail: '12',
				cost
			},
			selectedMod,
			index: 0,
			currentRating,
			modArmor: sinon.spy(),
			demodArmor: sinon.spy()
		},
			armorModRow = shallow(<ArmorModRow {...props} />);
		return {armorModRow, props};
	};

	it('should display name, avail, and cost', () => {
		const {armorModRow} = setup();

		expect(armorModRow.find('label').text()).to.equal('Rock');
		expect(armorModRow.find('.armor-mod--avail').text()).to.equal('12');
		expect(armorModRow.find('.armor-mod--cost').text()).to.equal('200¥');
	});

	describe('mod rating input', () => {
		it('should display "N/A" if the mod does not have a rating', () => {
			const {armorModRow} = setup();
			expect(armorModRow.find('.armor-mod--rating').text()).to.equal('N/A');
		});

		it('should display an input field if the mod has a rating', () => {
			const { armorModRow } = setup('Rating * 100'),
				ratingInput = armorModRow.find('.armor-mod--rating input');

			expect(ratingInput.props().type).to.equal('number');
			expect(ratingInput.props().placeholder).to.equal('1-6');
		});

		it('should display the currentRating of the mod if supplied', () => {
			const {armorModRow} = setup('Rating * 100', true, 6);

			expect(armorModRow.find('.armor-mod--rating input').props().value).to.equal(6);
		})

		it('should set the rating of the state.mod on change', () => {
			const { armorModRow } = setup('Rating * 100'),
				ratingInput = armorModRow.find('.armor-mod--rating input');
			ratingInput.simulate('change', {target: {value: '2'}});

			expect(armorModRow.state().Rating).to.equal('2');
		});
	});

	describe('checkbox', () => {
		it('should be selected when selectedMod is true', () => {
			const {armorModRow} = setup();
			expect(armorModRow.find('#BlueSuedeShoes-mod-Rock').props().checked).to.be.true;
		});

		it('should not be selected when selectedMod is false', () => {
			const {armorModRow} = setup(undefined, false);
			expect(armorModRow.find('#BlueSuedeShoes-mod-Rock').props().checked).to.be.false;
		});

		it('should fire modArmor on change when unselected', () => {
			const {armorModRow, props} = setup(undefined, false);
			const checkbox = armorModRow.find('#BlueSuedeShoes-mod-Rock');

			checkbox.simulate('change', {target: {name: 'Rock', checked: true}});
			expect(props.modArmor.calledOnce).to.be.true;
			expect(props.demodArmor.calledOnce).to.be.false;
		});


		it('should fire demodArmor on change when selected', () => {
			const {armorModRow, props} = setup();
			const checkbox = armorModRow.find('#BlueSuedeShoes-mod-Rock');

			checkbox.simulate('change', {target: {name: 'Rock', checked: false}});
			expect(props.modArmor.calledOnce).to.be.false;
			expect(props.demodArmor.calledOnce).to.be.true;
		});

		it('should fire modArmor with index, category, mod, and Rating', () => {
			const {armorModRow, props} = setup('Rating * 100', false),
				checkbox = armorModRow.find('#BlueSuedeShoes-mod-Rock'),
				Rating = '3';

			armorModRow.find('.armor-mod--rating input').simulate('change', {target: {value: Rating}});

			checkbox.simulate('change', {target: {name: 'Rock', checked: true}});
			expect(props.modArmor).to.have.been.calledWith({
				index: 0,
				category: 'armors',
				mod: props.mod,
				Rating
			});
		});

		it('should fire modArmor with Rating 1 if none is selected', () => {
			const {armorModRow, props} = setup('Rating * 100', false),
				checkbox = armorModRow.find('#BlueSuedeShoes-mod-Rock'),
				Rating = '';

			armorModRow.find('.armor-mod--rating input').simulate('change', {target: {value: Rating}});

			checkbox.simulate('change', {target: {name: 'Rock', checked: true}});
			expect(props.modArmor).to.have.been.calledWith({
				index: 0,
				category: 'armors',
				mod: props.mod,
				Rating: 1
			});
		});
	});
});
