import React from 'react';
import { shallow } from 'enzyme';

import SelectRating from 'components/gear/SelectRatingComponent';

describe('Mech Row Component', () => {
	const setup = (rating) => {
		const props = {
			item: {
				rating,
				name: 'taco'
			},
			updateRating: sinon.spy()
		},

		selectRating = shallow(<SelectRating {...props} />);

		return {props, selectRating};
	};

	it('should render N/A if rating is undefined', () => {
		const { selectRating } = setup();

		expect(selectRating.text()).to.equal('N/A');
	});

	it('should render rating number of options', () => {
		const {selectRating, props} = setup('6');

		expect(selectRating.find('option')).lengthOf(props.item.rating);
	});

	it('should file updateRating prop when the select is changed', () => {
		const {selectRating, props} = setup('6');

		const event = {target: {value: 6}};

		selectRating.find('select').simulate('change', event);

		expect(props.updateRating).to.have.been.calledWith(event);
	});
});
