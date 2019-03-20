import React from 'react';
import { shallow } from 'enzyme';

import LifeStylePurchasedRowComponent from 'components/lifestyles/LifeStylePurchasedRowComponent';

describe('<LifeStylePurchasedRowComponent />', () => {
	const setup = () => {
		const props = {},
			lifeStylePurchasedRow = shallow(<LifeStylePurchasedRowComponent {...props} />);

		return { lifeStylePurchasedRow, props };
	};
	it('should exist', () => {
		const { lifeStylePurchasedRow } = setup();

		expect(lifeStylePurchasedRow).to.exist;
	});
});
