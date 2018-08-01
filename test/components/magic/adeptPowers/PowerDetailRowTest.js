import React from 'react';
import { shallow } from 'enzyme';

import PowerDetailRow from 'components/magic/adeptPowers/PowerDetailRow';
import PowerLevelCounter from 'components/magic/adeptPowers/PowerLevelCounter';

describe('PowerDetailRow', () => {
	const setup = (args = {}) => {
		const { power = {},
			add = true,
			pointsSpent = 5,
			maxPoints = 6,
			index = 3,
			isMystic = true,
			actions = {} } = args;

		const props = {
			pointsSpent,
			power: Object.assign({}, {
				name: 'TestName',
				levels: '1',
				points: 0.5,
				source: 'Omae',
				page: 'v2',
			}, power),
			add,
			index,
			pointsSpent,
			maxPoints,
			isMystic,
			actions: Object.assign({}, {
				addPower: () => {},
				decrementAugmented: () => {},
				incrementAugmented: () => {},
				lowerPower: () => {},
				raisePower: () => {},
				removePower: () => {},
			}, actions),
		};

		const detailRow = shallow(<PowerDetailRow {...props} />);

		return { detailRow, props };
	};

	describe('When we are making an add row', () => {
		describe('and there is not a bonus', () => {
			const { detailRow } = setup();

			it('Should not have a select', () => {
				expect(detailRow.find('Select').length).to.equal(0);
			});

			it('Should have 6 tds', () => {
				expect(detailRow.find('td').length).to.equal(6);
			});

			it('Should have a btn with the add css', () => {
				expect(detailRow.find('button').hasClass('btn-success')).to.equal(true);
			});
		});

		describe('and there is a bonus', () => {
			const bonusPower = {
				bonus: {
					selectattribute: {
						attribute: [
							'TEST',
							'TEST1',
						],
					},
				},
			};

			const { detailRow } = setup({
				power: bonusPower,
			});

			it('Should have a select with the correct options', () => {
				expect(detailRow.find('select').length).to.equal(1);
				expect(detailRow.find('select').at(0).props().children.length).to.equal(3);
			});

			it('Should have 6 tds', () => {
				expect(detailRow.find('td').length).to.equal(6);
			});

			it('Should have a btn with the add css', () => {
				expect(detailRow.find('button').hasClass('btn-success')).to.equal(true);
			});
		});
	});

	describe('When we are making a remove row', () => {
		describe('and there is not a bonus', () => {
			const { detailRow } = setup({ add: false });

			it('Should not have a select', () => {
				expect(detailRow.find('Select').length).to.equal(0);
			});

			it('Should have 6 tds', () => {
				expect(detailRow.find('td').length).to.equal(6);
			});

			it('Should have a btn with the remove css', () => {
				expect(detailRow.find('button').hasClass('btn-warning')).to.equal(true);
			});
		});

		describe('and there is a bonus', () => {
			const bonusPower = {
				bonus: 'TEST',
			};

			const { detailRow } = setup({
				power: bonusPower,
				add: false,
			});

			it('Should not have a select', () => {
				expect(detailRow.find('Select').length).to.equal(0);
			});

			it('Should have 6 tds', () => {
				expect(detailRow.find('td').length).to.equal(6);
			});

			it('Should have the power\'s bonus in the 5th td', () => {
				expect(detailRow.find('td').at(4).html()).to.contain(`>${bonusPower.bonus}<`);
			});

			it('Should have a btn with the remove css', () => {
				expect(detailRow.find('button').hasClass('btn-warning')).to.equal(true);
			});
		});
	});
});
