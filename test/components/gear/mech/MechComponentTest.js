import React from 'react';
import { shallow } from 'enzyme';

import { MechComponent } from 'components/gear/mech/MechComponent';
import ModalButton from 'components/ModalButtonComponent';

describe('Mech Component', () => {
	const setup = () => {
		const props = {
				classOfMechs: 'Vehicles',
				mechsByType: {
					bikes: [{
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
					}],
					cars: [],
					boats: [],
				},
				purchaseMech: sinon.spy(),
			},
			mechComponent = shallow(<MechComponent {...props} />);

		return { props, mechComponent };
	};

	it('should render the class of the mech as a render', () => {
		const { mechComponent } = setup();

		expect(mechComponent.find('h3').text()).to.equal('Vehicles');
	});

	it('should render a modal button for each item in mechsByType', () => {
		const { mechComponent, props } = setup(),
			modalButtons = mechComponent.find(ModalButton),
			mechsByType = Object.keys(props.mechsByType);

		expect(modalButtons).lengthOf(mechsByType.length);

		modalButtons.forEach((btn, index) => {
			const btnProps = btn.props();
			expect(btnProps.modalName).to.equal(mechsByType[index]);
		});
	});
});
