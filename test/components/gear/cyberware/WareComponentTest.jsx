import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { WareComponent } from 'components/gear/cyberware/WareComponent';
import { renderWithStore } from '../../../helpers/render';

describe('WareComponent', () => {
	const cyberwareArray = [
		{
			id: '47c48542-48c3-417e-91f0-b5a456183f05',
			name: 'Datajack',
			category: 'Headware',
			ess: '0.1',
			capacity: '0',
			avail: '2',
			cost: '1000',
			source: 'SR5',
			page: '452',
		},
		{
			id: 'eb9e691a-8002-4138-ac8d-d9714d398b1e',
			name: 'Data Lock',
			category: 'Headware',
			ess: '0.1',
			capacity: '[1]',
			avail: 'Rating * 2',
			cost: 'Rating * 1000',
			source: 'SR5',
			page: '452',
			rating: '12',
		},
		{
			id: 'e9136c81-f8d5-4e7f-be2d-3be7ff6d1673',
			name: 'Olfactory Booster',
			category: 'Headware',
			ess: '0.2',
			capacity: '0',
			avail: 'Rating * 3',
			cost: 'Rating * 4000',
			source: 'SR5',
			page: '452',
			rating: '6',
		},
		{
			id: 'ed88f785-7d61-43ec-b4ed-0ebb94736f5e',
			name: 'Simrig',
			category: 'Headware',
			ess: '0.2',
			capacity: '0',
			avail: '12R',
			cost: '4000',
			source: 'SR5',
			page: '452',
		},
		{
			id: '4415180f-c3a0-4bb9-8580-3ed689ab6863',
			name: 'Cyberlimb Customization, Strength (2050)',
			category: 'Bodyware',
			ess: '0',
			capacity: '[0]',
			avail: '+Rating - MinRating',
			cost: '(Rating - MinRating) * 2000',
			source: '2050',
			page: '203',
			forbidden: {
				oneof: {
					metatype: 'Pixie',
				},
			},
			minrating: 'MinimumSTR',
			rating: 'MaximumSTR',
		},
		{
			id: '7d61f860-0637-4214-914d-c68022361d24',
			name: 'Customized Strength',
			category: 'Cyberlimb Enhancement',
			ess: '0',
			capacity: '[0]',
			avail: '+Rating - MinRating',
			cost: '(Rating - MinRating) * 5000',
			source: 'SR5',
			page: '456',
			forbidden: {
				oneof: {
					metatype: 'Pixie',
				},
			},
			minrating: 'MinimumSTR',
			rating: 'MaximumSTR',
		},
	];
	const setup = (wares = cyberwareArray) => {
		const props = {
			wares,
			purchaseWare: sinon.spy(),
			currentGrade: 0,
		};

		const { store } = renderWithStore(<WareComponent {...props} />);

		return { props, store };
	};

	const wareNames = () => within(screen.getByRole('table')).getAllByRole('row')
		.slice(1)
		.map((row) => within(row).getAllByRole('cell')[1].textContent);

	it('should display a ware grade select', () => {
		setup();

		expect(screen.getByRole('combobox', { name: 'Grade' }).value).to.equal('0');
	});

	it('should change the ware grade in the store', async () => {
		const { store } = setup();

		await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Grade' }), '1');

		expect(store.getState().augmentation.grade).to.equal(1);
	});

	describe('table of cyberware', () => {
		it('should have a table with the cyberware header', () => {
			setup();

			expect(screen.getAllByRole('columnheader').map((th) => th.textContent))
				.to.eql(['Buy', 'Name', 'Essense', 'Rating', 'Avail', 'Cost', 'Ref']);
		});

		it('should render a row for each cyberware passed in, except for cyberlimb only augs', () => {
			setup();

			expect(wareNames()).to.eql(['Datajack', 'Data Lock', 'Olfactory Booster', 'Simrig']);
		});

		it('should purchase the ware in the clicked row', async () => {
			const { props } = setup();

			const simrigRow = screen.getByRole('cell', { name: 'Simrig' }).closest('tr');
			await userEvent.click(within(simrigRow).getByRole('button', { name: '+' }));

			expect(props.purchaseWare).to.have.been.calledOnce;
			expect(props.purchaseWare.firstCall.args[0].gear.name).to.equal('Simrig');
			expect(props.purchaseWare.firstCall.args[0].category).to.equal('augmentations');
		});
	});
});
