import React from 'react';
import {shallow} from 'enzyme';

import GearTableDislayRow from 'components/gear/GearTableDisplayRow';

describe('<GearTableDisplayRow />', () => {
	const setup = (
			{currentRating} = {},
			rating = '0',
			cost = '5',
			btnAction = () => {
				return sinon.spy();
			}
		) => {
		const props = {
			gear: {
				name: 'Banana',
				avail: '3R',
				source: 'BK',
				cost,
				page: '1337',
				rating,
				currentRating
			},
			btnClass: 'btn-success',
			btnSymbol: '+',
			btnAction
		},
			gearTableDislayRow = shallow(<GearTableDislayRow {...props} />);

		return { gearTableDislayRow, props };
	};

	it('should display gear stats', () => {
		const { gearTableDislayRow, props } = setup();

		expect(gearTableDislayRow.find('.gear-name').text()).to.equal(props.gear.name);
		expect(gearTableDislayRow.find('.gear-rating').text()).to.equal('N/A');
		expect(gearTableDislayRow.find('.gear-avail').text()).to.equal(props.gear.avail);
		expect(gearTableDislayRow.find('.gear-cost').text()).to.equal(`${props.gear.cost}¥`);
		expect(gearTableDislayRow.find('.gear-ref').text()).to.equal(`${props.gear.source} p${props.gear.page}`);
	});

	describe('button', () => {
		it('should set class and symbol based off props', () => {
			const { gearTableDislayRow } = setup();

			expect(gearTableDislayRow.find('button').props().className).to.equal('btn btn-success');
			expect(gearTableDislayRow.find('button').text()).to.equal('+');
		});

		it('should set the onClick event of the button to the callback value of the btnAction', () => {
			const testCallback = sinon.spy();
			const { gearTableDislayRow, props } = setup({}, undefined, undefined, testCallback);

			expect(testCallback).to.have.been.calledWith({gear: props.gear, state: gearTableDislayRow.state()});
		});

		it('should fire the purchanseGear action with gear and state correctly on click', () => {
			const action = sinon.spy(),
				buyActionGenerator = ({gear, state}) => {
					return () => {
						action({gear, category: 'gears', Rating: state.rating});
					}
				};
			const { gearTableDislayRow, props } = setup({}, undefined, undefined, buyActionGenerator);

			gearTableDislayRow.find('button').simulate('click');

			expect(action).to.have.been.calledWith({gear: props.gear, category: 'gears', Rating: null});
		});

		it('should fire the sellGear action with gear and state correctly on click', () => {
			const action = sinon.spy(),
				buyActionGenerator = () => {
					return () => {
						action();
					}
				};
			const { gearTableDislayRow, props } = setup({}, undefined, undefined, buyActionGenerator);

			gearTableDislayRow.find('button').simulate('click');

			expect(action).to.have.been.callCount(1);
		});

		it('should fire purchaseGear action with gear rating', () => {
			const action = sinon.spy(),
				buyActionGenerator = ({gear, state}) => {
					return () => {
						action({gear, category: gear.category, Rating: state.rating});
					}
				};
			const { gearTableDislayRow, props } = setup({}, '6', '400 * Rating', buyActionGenerator);

			gearTableDislayRow.find('input').simulate('change', { target: { value: '3' } });
			gearTableDislayRow.find('button').simulate('click');

			expect(action).to.have.been.calledWith({gear: props.gear, category: 
				props.gear.category, Rating: 3});
		});

		it('should fire purchaseGear action with currentCost from state', () => {
			const action = sinon.spy(),
				buyActionGenerator = ({gear, state}) => {
					return () => {
						action({
							gear: (state.currentCost === null) ? gear : { ...gear, cost: state.currentCost },
							category: 'gears',
							Rating: state.rating
						});
					}
				};
			const { gearTableDislayRow, props } = setup({}, undefined, 'Variable(20-100000)', buyActionGenerator);

			gearTableDislayRow.find('input').simulate('change', {target: { value: '500' } });

			gearTableDislayRow.find('button').simulate('click');

			const gear = {
				...props.gear,
				cost: 500
			}

			expect(action).to.have.been.calledWith({gear, category: 'gears', Rating: null});
		});
	});

	describe('Rating', () => {
		it('should set state.rating to null if gear.rating is 0 and not display an input', () => {
			const { gearTableDislayRow, props } = setup();

			expect(gearTableDislayRow.state('rating')).to.equal(null);
			expect(gearTableDislayRow.find('.gear-rating').find('input')).to.have.length(0);
		});

		it('should set state.rating to empty string if gear.rating is over 0 and display an input', () => {
			const { gearTableDislayRow, props } = setup({}, '6');

			expect(gearTableDislayRow.state('rating')).to.equal('');
			expect(gearTableDislayRow.find('.gear-rating').find('input')).to.have.length(1);
			expect(gearTableDislayRow.find('.gear-rating').find('input').props().value).to.equal('');
		});

		it('should set the input to the state.rating', () => {
			const { gearTableDislayRow, props } = setup({}, '6');

			gearTableDislayRow.setState({rating: '6'});

			expect(gearTableDislayRow.find('.gear-rating input').props().value).to.equal('6');
		});

		describe('onChange', () => {
			it('should update the rating on state and in the field and turn string into a number', () => {
				const { gearTableDislayRow } = setup({}, '6');

				gearTableDislayRow.find('input').simulate('change', { target: { value: '3' } });

				expect(gearTableDislayRow.state('rating')).to.equal(3);
				expect(gearTableDislayRow.find('input').props().value).to.equal(3);
			});

			it('should set the rating to the max rating if given a number over', () => {
				const { gearTableDislayRow } = setup({}, '6');

				gearTableDislayRow.find('input').simulate('change', { target: { value: '10' } });

				expect(gearTableDislayRow.state('rating')).to.equal(6);
				expect(gearTableDislayRow.find('input').props().value).to.equal(6);
			});

			it('should set any number lower then 1 to empty string', () => {
				const { gearTableDislayRow } = setup({}, '6');

				gearTableDislayRow.find('input').simulate('change', { target: { value: '0' } });

				expect(gearTableDislayRow.state('rating')).to.equal('');
				expect(gearTableDislayRow.find('input').props().value).to.equal('');
			});
		});

		it('should display the current rating and not display input', () => {
			const { gearTableDislayRow } = setup({currentRating: 3}, '6');

			expect(gearTableDislayRow.find('.gear-rating').find('input')).to.have.length(0);
			expect(gearTableDislayRow.find('.gear-rating').text()).to.equal('3');
		});
	});

	describe('Variable cost', () => {
		it('should set the state of the cost to empty string if variable and display input', () => {
			const { gearTableDislayRow } = setup({}, undefined, 'Variable(20-100000)');

			const input = gearTableDislayRow.find('.gear-cost').find('input');

			expect(gearTableDislayRow.state('currentCost')).to.equal('');
			expect(input).to.have.lengthOf(1);
			expect(input.props().value).to.equal('');
			expect(input.props().max).to.equal('100000');
			expect(input.props().placeholder).to.equal('20-100000');
		});

		describe('onChange', () => {
			it('should update the currentCost in state and on the input', () => {
				const { gearTableDislayRow } = setup({}, undefined, 'Variable(20-100000)');

				gearTableDislayRow.find('input').simulate('change', { target: { value: '300' } });

				expect(gearTableDislayRow.state('currentCost')).to.equal(300);
				expect(gearTableDislayRow.find('input').props().value).to.equal(300);
			});

			it('should not allow a NaN', () => {
				const { gearTableDislayRow } = setup({}, undefined, 'Variable(20-100000)');

				gearTableDislayRow.find('input').simulate('change', { target: { value: 'e' } });
				expect(gearTableDislayRow.state('currentCost')).to.equal(0);
				expect(gearTableDislayRow.find('input').props().value).to.equal(0);
			});
		});
	});
});
