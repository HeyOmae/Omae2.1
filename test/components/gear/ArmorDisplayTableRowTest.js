import React from 'react';
import { shallow } from 'enzyme';

import ArmorDisplayTableRow from 'components/gear/armor/ArmorDisplayTableRow';

describe('<ArmorDisplayTableRow />', () => {
	const setup = (
		{ mod, currentRating, currentCost, rating } = {},
		cost = '1000',
		btnAction = () => {
			return sinon.spy();
		}
	) => {
		const props = {
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
				currentCost
			},
			btnClass: 'btn-success',
			btnSymbol: '-',
			btnAction,
			mod,
			index: 1
		},
			armorDisplayTableRow = shallow(<ArmorDisplayTableRow {...props} />);

		return { armorDisplayTableRow, props };
	};

	it('should display armor stats based off props', () => {
		const { armorDisplayTableRow, props } = setup();

		expect(armorDisplayTableRow.find('button')).to.have.lengthOf(1);
		expect(armorDisplayTableRow.find('.armor-name').text()).to.equal(props.armor.name);
		expect(armorDisplayTableRow.find('.armor-value').text()).to.equal(props.armor.armor);
		expect(armorDisplayTableRow.find('.armor-capacity').text()).to.equal(props.armor.armorcapacity);
		expect(armorDisplayTableRow.find('.armor-avail').text()).to.equal(props.armor.avail);
		expect(armorDisplayTableRow.find('.armor-cost').text()).to.equal(`${props.armor.cost}¥`);
		expect(armorDisplayTableRow.find('.armor-ref').text()).to.equal(`${props.armor.source} p${props.armor.page}`);
	});

	it('should display mod button if passed in', () => {
		const { armorDisplayTableRow, props } = setup({mod: <button>Zoot suit</button>});

		expect(armorDisplayTableRow.find('button')).to.have.lengthOf(2);
	});

	it('should display the currentRating and currentCost instead', () => {
		const { armorDisplayTableRow, props } = setup({currentRating: 5, currentCost: 1500});

		expect(armorDisplayTableRow.find('.armor-capacity').text()).to.equal(props.armor.currentRating.toString());
		expect(armorDisplayTableRow.find('.armor-cost').text()).to.equal(`${props.armor.currentCost.toString()}¥`);
	});

	describe('button', () => {
		it('should set class based off props', () => {
			const { armorDisplayTableRow } = setup();

			expect(armorDisplayTableRow.find('button').props().className).to.equal('btn btn-success');
		});

		it('should render a symbol passed off props', () => {
			const { armorDisplayTableRow } = setup();

			expect(armorDisplayTableRow.find('button').text()).to.equal('-');
		});

		it('should set the onClick event of the button to the callback value of btnAction', () => {
			const testCallback = sinon.spy();
			const { armorDisplayTableRow, props } = setup({}, '1000', testCallback);

			expect(testCallback).to.have.been.calledWith({armor: props.armor, state: armorDisplayTableRow.state(), index: 1});
		});

		it('should fire the purchanseGear action with armor and state correctly on click', () => {
			const action = sinon.spy(),
				buyActionGenerator = ({armor, state}) => {
					return () => {

						action({gear: armor, category: 'armors', Rating: state.Rating});
					}
				};
			const { armorDisplayTableRow, props } = setup({}, '1000', buyActionGenerator);

			armorDisplayTableRow.find('button').simulate('click');

			expect(action).to.have.been.calledWith({gear: props.armor, category: 
				'armors', Rating: null});
		});

		it('should fire the sellGear action with armor and state correctly on click', () => {
			const action = sinon.spy(),
				buyActionGenerator = ({index}) => {
					return () => {

						action({index, category: 'armors'});
					}
				};
			const { armorDisplayTableRow, props } = setup({}, '1000', buyActionGenerator);

			armorDisplayTableRow.find('button').simulate('click');

			expect(action).to.have.been.calledWith({index: 1, category: 'armors'});
		});
	});

	describe('armor rating', () => {
		it('should be set to state if the armor has rating', () => {
			const { armorDisplayTableRow } = setup({rating: '6'}, '400 * Rating');

			expect(armorDisplayTableRow.state().Rating).to.equal('');
		});

		it('should display an input field instead of capacity', () => {
			const { armorDisplayTableRow } = setup({rating: '6'}, '400 * Rating');

			const capacity = armorDisplayTableRow.find('.armor-capacity');

			expect(capacity.find('input')).to.have.lengthOf(1);
		});

		it('should set the value of the input field to the state.Rating', () => {
			const { armorDisplayTableRow } = setup({rating: '6'}, '400 * Rating');

			expect(armorDisplayTableRow.find('input').props().value).to.equal('');
		});

		describe('onChange', () => {
			it('should update the Rating on state', () => {
				const { armorDisplayTableRow } = setup({rating: '6'}, '400 * Rating');

				armorDisplayTableRow.find('input').simulate('change', { target: { value: '3' } });

				expect(armorDisplayTableRow.state('Rating')).to.equal('3');
			});
			
			it('should update the value of the input field', () => {
				const { armorDisplayTableRow } = setup({rating: '6'}, '400 * Rating');

				armorDisplayTableRow.find('input').simulate('change', { target: { value: '1' } });

				expect(armorDisplayTableRow.find('input').props().value).to.equal('1');
			});

			it('should update the value to the max rating if given a number over', () => {
				const { armorDisplayTableRow } = setup({rating: '6'}, '400 * Rating');

				armorDisplayTableRow.find('input').simulate('change', { target: { value: '7' } });

				expect(armorDisplayTableRow.state('Rating')).to.equal('6');
			});

			it('should set the value to empty string if less then 1', () => {
				const { armorDisplayTableRow } = setup({rating: '6'}, '400 * Rating');

				armorDisplayTableRow.find('input').simulate('change', { target: { value: '0' } });

				expect(armorDisplayTableRow.state('Rating')).to.equal('');
			});
		});

		it('should not display the rating input if there is a current rating', () => {
			const { armorDisplayTableRow, props } = setup({rating: '6', currentRating: '3'}, '400 * Rating');

			expect(armorDisplayTableRow.find('input')).to.have.lengthOf(0);
			expect(armorDisplayTableRow.find('.armor-capacity').text()).to.equal('3');
		});

		it('should fire the purchanseGear action with armor and state correctly on click', () => {
			const action = sinon.spy(),
				buyActionGenerator = ({armor, state}) => {
					return () => {

						action({gear: armor, category: 'armors', Rating: state.Rating});
					}
				};
			const { armorDisplayTableRow, props } = setup({rating: '6'}, '400 * Rating', buyActionGenerator);

			armorDisplayTableRow.find('input').simulate('change', { target: { value: '3' } });
			armorDisplayTableRow.find('button').simulate('click');

			expect(action).to.have.been.calledWith({gear: props.armor, category: 
				'armors', Rating: '3'});
		});
	});

	describe('Variable cost', () => {
		it('should set the state of cost to empty string if Variable', () => {
			const { armorDisplayTableRow } = setup({}, 'Variable(20-100000)');

			expect(armorDisplayTableRow.state('currentCost')).to.equal('');
		});

		it('should have an input field if the cost is variable', () => {
			const { armorDisplayTableRow } = setup({}, 'Variable(20-100000)');

			expect(armorDisplayTableRow.find('.armor-cost').find('input')).to.have.lengthOf(1);
		});

		it('should set the max and min for the input', () => {
			const { armorDisplayTableRow } = setup({}, 'Variable(20-100000)');

			expect(armorDisplayTableRow.find('input').props().max).to.equal('100000');
			expect(armorDisplayTableRow.find('input').props().placeholder).to.equal('20-100000');
		});

		it('should set the value of the input field to the state.currentCost', () => {
			const { armorDisplayTableRow } = setup({}, 'Variable(20-100000)');

			expect(armorDisplayTableRow.find('input').props().value).to.equal('');
		});

		describe('input onChange', () => {
			it('should update the currentCost on state', () => {
				const { armorDisplayTableRow } = setup({}, 'Variable(20-100000)');
				armorDisplayTableRow.find('input').simulate('change', {target: { value: '500' } });

				expect(armorDisplayTableRow.state('currentCost')).to.equal('500');
			});

			it('should not allow a NaN', () => {
				const { armorDisplayTableRow } = setup({}, 'Variable(20-100000)');
				armorDisplayTableRow.find('input').simulate('change', {target: { value: 'e' } });

				expect(armorDisplayTableRow.state('currentCost')).to.equal('0');
			});

			// I don't care to enforce a min and a max on cost as this is designed to be a nuyen sink
		});

		it('purchased gear should use state.cost', () => {
			const action = sinon.spy(),
				buyActionGenerator = ({armor, state}) => {
					return () => {
						action({
							gear: (state.currentCost === null) ? armor: { ...armor, cost: state.currentCost },
							category: 'armors',
							Rating: state.Rating
						});
					}
				};
			const { armorDisplayTableRow, props } = setup({}, 'Variable(20-100000)', buyActionGenerator);

			armorDisplayTableRow.find('input').simulate('change', {target: { value: '500' } });

			armorDisplayTableRow.find('button').simulate('click');

			const gear = {
				...props.armor,
				cost: '500'
			}

			expect(action).to.have.been.calledWith({gear, category: 'armors', Rating: null});
		});
	});
});
