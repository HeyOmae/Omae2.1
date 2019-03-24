import React from 'react';
import { shallow } from 'enzyme';

import LifeStylePurchasedRowComponent from 'components/lifestyles/LifeStylePurchasedRowComponent';

describe('<LifeStylePurchasedRowComponent />', () => {
	const setup = () => {
		const props = {
				lifestyle: {
					id: '9cb0222c-14c1-4bea-bf83-055513a1f33e',
					name: 'Medium',
					cost: '5000',
					dice: '4',
					freegrids: {
						freegrid: [
							{
								_select: 'Local Grid',
								__text: 'Grid Subscription',
							},
							{
								_select: 'Public Grid',
								__text: 'Grid Subscription',
							},
						],
					},
					lp: '4',
					multiplier: '100',
					source: 'SR5',
					page: '369',
				},
				index: 2,
				sellLifestyle: sinon.spy(),
			},
			lifeStylePurchasedRow = shallow(<LifeStylePurchasedRowComponent {...props} />);

		return { lifeStylePurchasedRow, props };
	};
	it('should display stats on the lifestyle', () => {
		const { lifeStylePurchasedRow } = setup();

		expect(lifeStylePurchasedRow.find('.lifestyle--purchased__name').text()).to.equal('Medium');
		expect(lifeStylePurchasedRow.find('.lifestyle--purchased__cost').text()).to.equal('5000¥');
		expect(lifeStylePurchasedRow.find('.lifestyle--purchased__ref').text()).to.equal('SR5 369p');
	});

	it('should call sellLifestyle when clicking sell button', () => {
		const { lifeStylePurchasedRow, props } = setup();

		lifeStylePurchasedRow.find('.lifestyle--purchased__sell button').simulate('click');

		expect(props.sellLifestyle).to.have.been.calledWith({ index: 2, category: 'lifestyles' });
	});
});
