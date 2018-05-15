import React from 'react';
import { shallow } from 'enzyme';

import PowerLevelCounter from 'components/magic/adeptPowers/PowerLevelCounter';
import ModificationButton from 'components/ModificationButton';

describe('PowerLevelCounter', () => {
	const setup = (
		power = {},
		pointsSpent = 1,
		maxPoints = 6,
		index = 3,
		isMystic = true,
		actions = {
			addPower: () => {},
			decrementAugmented: () => {},
			incrementAugmented: () => {},
			lowerPower: () => {},
			raisePower: () => {},
			removePower: () => {},
		},
	) => {
		const props = {
			power: Object.assign({}, {
				name: 'TestName',
				levels: '1',
				points: 0.5,
				source: 'Omae',
				page: 'v2',

			}, power),
			index,
			pointsSpent,
			maxPoints,
			isMystic,
			actions,
		};

		const levelCounter = shallow(<PowerLevelCounter {...props} />);

		return { levelCounter, props };
	};

	describe('When the power can be increased but not decreased', () => {
		const { levelCounter, props } = setup({
			power: {
				levels: 1,
			},
		});

		it('Should have 2 ModificationButtons', () => {
			expect(levelCounter.find(ModificationButton).length).to.equal(2);
		});

		it('Increase button should not be disabled', () => {
			expect(levelCounter.find(ModificationButton).at(0).props().buttonClass).to.not.contain('disabled');
		});

		it('Decrease button should be disabled', () => {
			expect(levelCounter.find(ModificationButton).at(1).props().buttonClass).to.contain('disabled');
		});

		it('Span should contain current level', () => {
			expect(levelCounter.find('span').at(0).html()).to.contain(`>${props.power.levels}<`);
		});
	});

	describe('When the power can be increased and decreased', () => {
		const { levelCounter, props } = setup(
			{
				levels: 2,
			},
		);

		it('Should have 2 ModificationButtons', () => {
			expect(levelCounter.find(ModificationButton).length).to.equal(2);
		});

		it('Increase button should not be disabled', () => {
			expect(levelCounter.find(ModificationButton).at(0).props().buttonClass).to.not.contain('disabled');
		});

		it('Decrease button should not be disabled', () => {
			expect(levelCounter.find(ModificationButton).at(1).props().buttonClass).to.not.contain('disabled');
		});

		it('Span should contain current level', () => {
			expect(levelCounter.find('span').at(0).html()).to.contain(`>${props.power.levels}<`);
		});
	});

	describe('When the power can be decreased but not increased because it is at max', () => {
		const { levelCounter, props } = setup(
			{
				levels: 4,
				name: 'Improved Physical Attribute(test)',
			},
		);

		it('Should have 2 ModificationButtons', () => {
			expect(levelCounter.find(ModificationButton).length).to.equal(2);
		});

		it('Increase button should be disabled', () => {
			expect(levelCounter.find(ModificationButton).at(0).props().buttonClass).to.contain('disabled');
		});

		it('Decrease button should not be disabled', () => {
			expect(levelCounter.find(ModificationButton).at(1).props().buttonClass).to.not.contain('disabled');
		});

		it('Span should contain current level', () => {
			expect(levelCounter.find('span').at(0).html()).to.contain(`>${props.power.levels}<`);
		});
	});

	describe('When the power can be decreased but not increased because all points are spent', () => {
		const { levelCounter, props } = setup(
			{
				levels: 4,
				name: 'Improved Physical Attribute(test)',
			},
			4.75,
			5,
		);

		it('Should have 2 ModificationButtons', () => {
			expect(levelCounter.find(ModificationButton).length).to.equal(2);
		});

		it('Increase button should be disabled', () => {
			expect(levelCounter.find(ModificationButton).at(0).props().buttonClass).to.contain('disabled');
		});

		it('Decrease button should not be disabled', () => {
			expect(levelCounter.find(ModificationButton).at(1).props().buttonClass).to.not.contain('disabled');
		});

		it('Span should contain current level', () => {
			expect(levelCounter.find('span').at(0).html()).to.contain(`>${props.power.levels}<`);
		});
	});
});
