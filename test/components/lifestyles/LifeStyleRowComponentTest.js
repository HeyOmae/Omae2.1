import React from 'react';
import { shallow } from 'enzyme';

import LifeStyleRowComponent from 'components/lifestyles/LifeStyleRowComponent';

describe('<LifeStyleRowComponent />', () => {
	const setup = () => {
		const props = {
				lifestyle: {
					id: '559653df-a9af-44e2-9e04-3044c1d1b421',
					name: 'Street',
					cost: '0',
					dice: '1',
					freegrids: {
						freegrid: {
							_select: 'Public Grid',
							__text: 'Grid Subscription',
						},
					},
					lp: '2',
					costforarea: '50',
					costforcomforts: '50',
					costforsecurity: '50',
					multiplier: '20',
					source: 'SR5',
					page: '369',
				},
				purchaseGear: sinon.spy(),
			},
			lifeStyleRow = shallow(<LifeStyleRowComponent {...props} />);

		return { lifeStyleRow, props };
	};

	it('should display the lifestyles table', () => {
		const { lifeStyleRow, props } = setup();

		expect(lifeStyleRow.find('.lifestyle--item__select button')).to.have.lengthOf(1);
		expect(lifeStyleRow.find('.lifestyle--item__name').text()).to.equal(props.lifestyle.name);
		expect(lifeStyleRow.find('.lifestyle--item__cost').text()).to.equal(`${props.lifestyle.cost}¥`);
		expect(lifeStyleRow.find('.lifestyle--item__reference').text()).to.equal(`${props.lifestyle.source} ${props.lifestyle.page}p`);
	});


	it('should fire the purchaseGear prop if the buy button is clicked', () => {
		const { lifeStyleRow, props } = setup();
		lifeStyleRow.find('.lifestyle--item__select button').simulate('click');
		expect(props.purchaseGear).to.have.been.calledWith({ gear: props.lifestyle, category: 'lifestyles' });
	});
});
