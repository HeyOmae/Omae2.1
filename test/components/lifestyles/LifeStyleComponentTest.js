import React from 'react';
import { shallow } from 'enzyme';

import LifeStyleComponent, { LifeStyleTableHead } from 'components/lifestyles/LifeStyleComponent';
import LifeStyleRowComponent from 'components/lifestyles/LifeStyleRowComponent';
import FilterableTable from 'components/FilterableTable';

describe('<LifeStyleComponent />', () => {
	const setup = () => {
		const props = {
				purchaseGear: sinon.spy(),
			},
			lifeStyle = shallow(<LifeStyleComponent {...props} />);

		return { lifeStyle, props };
	};

	it('should remove lifestyle "ID ERROR. Re-add life style to fix"', () => {
		const { lifeStyle } = setup(),
			{ lifestyles } = lifeStyle.instance();

		expect(lifestyles.length).to.equal(11);
		expect(lifestyles[0]).to.not.equal({
			id: '00000000-0000-0000-0000-000000000000',
			name: 'ID ERROR. Re-add life style to fix',
			cost: '1',
			dice: '1',
			multiplier: '0',
			source: 'SR5',
			page: '1',
			hide: '',
		});
	});

	it('should have a FilterableTable', () => {
		const { lifeStyle } = setup();

		const filterTable = lifeStyle.find(FilterableTable);

		expect(filterTable.length).to.equal(1);
	});

	it('should display the lifestyles row for each lifestyle', () => {
		const { lifeStyle } = setup();

		const lifestyleItems = lifeStyle.find(LifeStyleRowComponent);

		expect(lifestyleItems.length).to.equal(11);
	});
});
