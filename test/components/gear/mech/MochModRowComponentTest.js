import React from 'react';
import { shallow } from 'enzyme';

import MechModRow from 'components/gear/mech/MechModRowComponent';

describe('Mech Row Component', () => {
	const setup = () => {
		const props = {},

		mechModRow = shallow(<MechModRow {...props} />);

		return {props, mechModRow};
	};

	it('should exist', () => {
		const { mechModRow } = setup();

		expect(mechModRow).to.be.not.undefined;
	});
});