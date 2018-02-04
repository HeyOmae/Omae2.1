import React from 'react';
import { shallow } from 'enzyme';

import MechComponent from 'components/gear/mech/MechComponent';
import ModalButton from 'components/ModalButtonComponent'

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
		const {mechComponent, props} = setup();

		expect(mechComponent.find(ModalButton)).lengthOf(Object.keys(props.mechsByType).length);
	});
});