import React from 'react';
import { shallow } from 'enzyme';

import PowerSelectorComponent from 'components/magic/adeptPowers/PowerSelectorComponent';

describe('PowerSelectorComponent', () => {
	const setup = (args = {}) => {
		const {
			selectedPowers = [],
			pointsSpent= 0,
			maxPoints= 6,
			isMystic= false,
			karmaSpent = 0,
			actions= {}
		} = args;

		const props = {
			selectedPowers,
			pointsSpent,
			maxPoints,
			isMystic,
			karmaSpent,
			actions: Object.assign({}, {
				addPower: () => {},
				decrementAugmented: () => {},
				incrementAugmented: () => {},
				lowerPower: () => {},
				raisePower: () => {},
				removePower: () => {}
			}, actions)
		};

		const selectorComponent = shallow(<PowerSelectorComponent {...props} />);

		return { selectorComponent, props };
	}

	describe('When isMystic is false', () => {
		const {props, selectorComponent} = setup({
			isMystic: false,
			selectedPowers: [{name: 'test'}]
		});

		it('should have rows matching powers passed in', () => {
			expect(selectorComponent.find('PowerSelectedDisplay').length).to.equal(props.selectedPowers.length);
		});

		it('should not have Karma Spent info', () => {
			expect(selectorComponent.find('p span').length).to.equal(0);
		});
	});

	describe('When isMystic is true', () => {
		const {props, selectorComponent} = setup({
			isMystic: true,
			karmaSpent: 5,
			selectedPowers: [{name: 'test'}]
		});

		it('should have rows matching powers passed in', () => {
			expect(selectorComponent.find('PowerSelectedDisplay').length).to.equal(props.selectedPowers.length);
		});

		it('should not have Karma Spent info', () => {
			expect(selectorComponent.find('p span').at(0).html()).to.contain('<span> Karma Spent: <strong>' + props.karmaSpent + '</strong>');
		});
	});
});
