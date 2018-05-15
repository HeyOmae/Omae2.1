import React from 'react';
import { shallow } from 'enzyme';

import MechRow from 'components/gear/mech/MechRowComponent';

describe('Mech Row Component', () => {
	const modBtn = (<button className="btn btn-info">Dodge Scoot (Scooter)</button>);
	const setup = (mechMod = null) => {
		const props = {
				mech: {
					id: 'c0d3e7fd-d5fd-48c4-b49d-0c7dea26895d',
					name: 'Dodge Scoot (Scooter)',
					page: '462',
					source: 'SR5',
					accel: '1',
					armor: '4',
					avail: '0',
					body: '4',
					category: 'Bikes',
					cost: '3000',
					handling: '4/3',
					pilot: '1',
					sensor: '1',
					speed: '3',
					gears: {
						gear: {
							'-rating': '1',
							'-maxrating': '6',
							'#text': 'Sensor Array',
						},
					},
					mods: {
						name: 'Improved Economy',
					},
					seats: '1',
				},
				mechButton: <button className="btn btn-success">+</button>,
				mechMod,
			},
			mechRow = shallow(<MechRow {...props} />);

		return { props, mechRow };
	};

	it('should render a table row', () => {
		const { mechRow } = setup();

		expect(mechRow.find('tr')).lengthOf(1);
	});

	it('should display a mechs stats', () => {
		const { mechRow, props } = setup();

		expect(mechRow.find('.mech--name').text()).to.equal(props.mech.name);
		expect(mechRow.find('.mech--handling').text()).to.equal(props.mech.handling);
		expect(mechRow.find('.mech--accel').text()).to.equal(props.mech.accel);
		expect(mechRow.find('.mech--body').text()).to.equal(props.mech.body);
		expect(mechRow.find('.mech--armor').text()).to.equal(props.mech.armor);
		expect(mechRow.find('.mech--pilot').text()).to.equal(props.mech.pilot);
		expect(mechRow.find('.mech--sensor').text()).to.equal(props.mech.sensor);
		expect(mechRow.find('.mech--cost').text()).to.equal(`${props.mech.cost}¥`);
		expect(mechRow.find('.mech--ref').text()).to.equal(`${props.mech.source} ${props.mech.page}p`);
	});

	describe('buy/sell button', () => {
		it('should come in from props', () => {
			const { mechRow, props } = setup();

			expect(mechRow.find('.btn.btn-success')).lengthOf(1);
		});
	});

	it('mech name should be replace with modal mod button if defined', () => {
		const { mechRow, props } = setup(modBtn);

		expect(mechRow.find('.mech--name .btn.btn-info')).lengthOf(1);
	});
});
