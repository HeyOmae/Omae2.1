import React from 'react';
import { shallow } from 'enzyme';

import LifeStyleComponent from 'components/lifestyles/LifeStyleComponent';
import LifeStyleModalContent from 'components/lifestyles/LifeStyleModalContent';
import ModalButton from 'components/ModalButtonComponent';
import DisplayTable from 'components/DisplayTableComponent';

describe('<LifeStyleComponent />', () => {
	const setup = () => {
		const props = {},
			lifeStyle = shallow(<LifeStyleComponent {...props} />);

		return { lifeStyle, props };
	};

	it('should have a modal that displays the lifestyle modal content', () => {
		const { lifeStyle } = setup();

		const modal = lifeStyle.find(ModalButton);

		expect(modal).to.have.lengthOf(1);

		const modalProps = modal.props();

		expect(modalProps.modalName).to.equal('Lifestyles');
		// TODO: figure out how to test the modalContent
	});

	it('should display the purchased lifestyles in a display table', () => {
		const { lifeStyle } = setup();

		expect(lifeStyle.find(DisplayTable)).to.have.lengthOf(1);
	});
});
