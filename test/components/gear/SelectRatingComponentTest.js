import React from 'react';
import { shallow } from 'enzyme';

import SelectRating from 'components/gear/SelectRatingComponent';

describe('Mech Row Component', () => {
	const setup = (rating) => {
		const props = {
			item: {
				rating
			}
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
});
