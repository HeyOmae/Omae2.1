import React from 'react';
import { shallow } from 'enzyme';

import CyberlimbAttribute from 'components/gear/cyberware/CyberlimbAttributeComponent';
import ModificationButton from 'components/ModificationButton';

describe('CyberlimbAttribute', () => {
	const setup = (
			attributeName = 'Test',
			attributeValue = 3
		) => {
		const props = {
			incrementAttribute : sinon.spy(),
			decrementAttribute : sinon.spy(),
			attributeName,
			attributeValue
		},
			cyberlimbAttribute = shallow(<CyberlimbAttribute {...props} />);
		return { cyberlimbAttribute, props };
	}

	it('should have two buttons', () => {
		const { cyberlimbAttribute } = setup();
		expect(cyberlimbAttribute.find(ModificationButton).length)
			.to.equal(2);
	});

	it('should have a button with + and a button with - ', () => {
		const { cyberlimbAttribute } = setup();

		const buttons = cyberlimbAttribute.find(ModificationButton);

		expect(buttons.at(0).prop('symbol'))
			.to.equal('+');

		expect(buttons.at(1).prop('symbol'))
			.to.equal('-');
	});

	it('should call with correct props passed in', () => {
		const { cyberlimbAttribute, props } = setup();

		const buttons = cyberlimbAttribute.find(ModificationButton);

		const buttonOneProps = buttons.at(0).props();
		const buttonTwoProps = buttons.at(1).props();

		expect(buttonOneProps.attName).to.equal(props.attributeName);
		expect(buttonOneProps.modificationFunction).to.equal(props.incrementAttribute);

		expect(buttonTwoProps.attName).to.equal(props.attributeName);
		expect(buttonTwoProps.modificationFunction).to.equal(props.decrementAttribute);
	});
});
