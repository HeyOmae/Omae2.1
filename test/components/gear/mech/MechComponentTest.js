import React from 'react';
import { shallow } from 'enzyme';

import MechComponent from 'components/gear/mech/MechComponent';
import ModalButton from 'components/ModalButtonComponent';
import FilterableTable from 'components/FilterableTable';

describe('Mech Component', () => {
	const setup = () => {
		const props = {
			classOfMechs: 'Vehicles',
			mechsByType: {
				bikes: [],
				cars: [],
				boats: []
			}
			
		},
			mechComponent = shallow(<MechComponent {...props} />);

		return { props, mechComponent };
	};

	it('should render the class of the mech as a render', () => {
		const {mechComponent} = setup();

		expect(mechComponent.find('h3').text()).to.equal('Vehicles');
	});

	it('should render a modal button for each item in mechsByType', () => {
		const {mechComponent, props} = setup(),
			modalButtons = mechComponent.find(ModalButton),
			mechsByType = Object.keys(props.mechsByType);

		expect(modalButtons).lengthOf(mechsByType.length);

		modalButtons.forEach((btn, index) => {
			const btnProps = btn.props();
			expect(btnProps.modalName).to.equal(mechsByType[index]);
			// expect(btnProps.modalContent).to.equal(mechComponent.modalContent[mechsByType[index]]);
		});
	});
});