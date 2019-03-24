import React from 'react';
import { shallow } from 'enzyme';

import LifeStyleComponent from 'components/lifestyles/LifeStyleComponent';
import LifeStyleModalContent from 'components/lifestyles/LifeStyleModalContent';
import LifeStylePurchasedRow from 'components/lifestyles/LifeStylePurchasedRowComponent';
import ModalButton from 'components/ModalButtonComponent';
import DisplayTable from 'components/DisplayTableComponent';

describe('<LifeStyleComponent />', () => {
	const setup = (purchasedLifestyles) => {
		const props = {
				purchasedLifestyles,
				sellGear: sinon.spy(),
			},
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

	it('should create lifeStylePurchasedRow for purchased lifestyles', () => {
		const { lifeStyle, props } = setup([{
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
		}, {
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
		}]);

		const purchasedRows = lifeStyle.find(LifeStylePurchasedRow);

		expect(purchasedRows).to.have.lengthOf(props.purchasedLifestyles.length);

		purchasedRows.forEach((row, index) => {
			const rowProps = row.props();
			expect(rowProps.lifestyle).to.equal(props.purchasedLifestyles[index]);
			expect(rowProps.index).to.equal(index);
			expect(rowProps.sellLifestyle).to.equal(props.sellGear);
		});
	});
});
