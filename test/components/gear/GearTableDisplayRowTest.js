import React from 'react';
import {shallow} from 'enzyme';

import GearTableDislayRow from 'components/gear/GearTableDisplayRow';

describe('<GearTableDisplayRow />', () => {
	const setup = ({} = {}, rating = '0') => {
		const props = {
			gear: {
				name: 'Banana',
				avail: '3R',
				source: 'BK',
				cost: '5',
				page: '1337',
				rating
			}
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

	describe('Rating', () => {
		it('should set state.rating to null if gear.rating is 0', () => {
			const { gearTableDislayRow, props } = setup();

			expect(gearTableDislayRow.state('rating')).to.equal(null);
		});

		it('should set state.rating to empty string if gear.rating is over 0', () => {
			const { gearTableDislayRow, props } = setup({}, '6');

			expect(gearTableDislayRow.state('rating')).to.equal('');
		});

		it('should display input to select gear rating', () => {
			const { gearTableDislayRow, props } = setup({}, '6');

			expect(gearTableDislayRow.find('.gear-rating').find('input')).to.have.length(1);
		});

		it('should set the input to the state.rating', () => {
			const { gearTableDislayRow, props } = setup({}, '6');

			gearTableDislayRow.setState({rating: '6'});

			expect(gearTableDislayRow.find('.gear-rating input').props().value).to.equal('6');
		});
	});
});
