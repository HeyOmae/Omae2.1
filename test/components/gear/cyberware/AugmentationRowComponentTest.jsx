import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AugmentationRowComponent from 'components/gear/cyberware/AugmentationRowComponent';
import { renderRow } from '../../../helpers/render';

describe('AugmentationRowComponent', () => {
	const datajack = {
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
		dataLock = {
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
		voiceMod = {
			id: 'ebc25387-655f-4a24-8ae7-81548c097dac',
			name: 'Voice Modulator',
			category: 'Headware',
			ess: '0.2',
			capacity: '0',
			avail: 'Rating * 3F',
			cost: 'Rating * 5000',
			source: 'SR5',
			page: '452',
			bonus: {
				specificskill: {
					name: 'Impersonation',
					bonus: 'Rating',
					applytorating: 'no',
				},
			},
			rating: '6',
		},
		knowWare = {
			id: '56a5fcc1-5da7-4728-aae9-073c92f67c2b',
			name: 'Knowledge Hardwires',
			category: 'Headware',
			ess: 'Rating * 0.05',
			capacity: '0',
			avail: 'Rating',
			cost: 'Rating * 2000',
			source: 'CF',
			page: '80',
			rating: '6',
		},
		controlRig = {
			id: '16b45886-2916-48eb-aea5-ecb74da835bd',
			name: 'Control Rig',
			category: 'Headware',
			ess: 'Rating * 1',
			capacity: '0',
			avail: 'Rating * 5',
			cost: 'FixedValues(43000,97000,208000)',
			source: 'SR5',
			page: '452',
			rating: '3',
		},
		trollReduction = {
			id: 'aa347008-38f1-4cb4-a919-bc705a8efe71',
			name: 'Troll Reduction',
			category: 'Biosculpting',
			ess: 'FixedValues(0.2,0.5)',
			capacity: '0',
			avail: 'FixedValues(8,12)',
			cost: 'FixedValues(15000,25000)',
			bonus: {
				armor: '-1',
				specificattribute: {
					name: 'CHA',
					max: 'Rating',
				},
			},
			rating: '2',
			required: {
				oneof: {
					metatype: 'Troll',
				},
			},
			source: 'CF',
			page: '108',
		},
		strikingCallus = {
			id: '8832f6ac-0082-4b9b-9e1c-7f90874a23a1',
			name: 'Striking Callus',
			category: 'Bio-Weapons',
			ess: '0.05*Rating',
			capacity: '0',
			avail: '2',
			cost: 'Rating*250',
			bonus: {
				unarmeddv: 'Rating*0.5',
			},
			notes: 'Rating is used to represent hands and feet. Every 2 Rating will grant +1 Unarmed damage.',
			rating: '4',
			source: 'CF',
			page: '121',
		},
		consmenticMod = {
			id: 'df427266-60ea-4289-94ee-a30bb46ceb89',
			name: 'Cosmetic Modifcations (2050)',
			category: 'Bodyware',
			ess: '0',
			capacity: '0',
			avail: '2',
			cost: 'Variable(2000-10000)',
			source: '2050',
			page: '203',
		},
		headwareMemory = {
			id: '908000b8-5c97-402d-947f-bd54768ac5f0',
			name: 'Headware Memory (2050)',
			category: 'Headware',
			ess: '(((Rating - 11) * 0.0005) +0.01)',
			capacity: '0',
			avail: '2',
			cost: 'Rating * 25',
			source: '2050',
			page: '199',
			rating: '11980',
		};

	const setup = (ware = datajack, currentGrade = 0) => {
		const props = {
			ware,
			currentGrade,
			purchase: sinon.spy(),
		};

		const { container } = renderRow(<AugmentationRowComponent {...props} />);

		const cell = (name) => container.querySelector(`.cyberware--${name}`).textContent;
		const selectRating = (rating) => userEvent.selectOptions(screen.getByRole('combobox'), String(rating));
		const buy = () => userEvent.click(screen.getByRole('button', { name: '+' }));

		return { props, container, cell, selectRating, buy };
	};

	const change = (input, value) => fireEvent.change(input, { target: { value } });

	it('should display stats about cyberware', () => {
		const { cell } = setup();

		expect(cell('name')).to.equal('Datajack');
		expect(cell('ess')).to.equal('0.1');
		expect(cell('rating')).to.equal('N/A');
		expect(cell('avail')).to.equal('2');
		expect(cell('cost')).to.equal('1000¥');
		expect(cell('ref')).to.equal('SR5 p452');
	});

	describe('variable cost', () => {
		const costInput = (container) => container.querySelector('.cyberware--cost__input');

		it('should display an input field', () => {
			const { container } = setup(consmenticMod);

			expect(costInput(container).placeholder).to.equal('2000-10000¥');
			expect(costInput(container).value).to.equal('');
		});

		it('should update the cost on change', () => {
			const { container } = setup(consmenticMod);

			change(costInput(container), '5000');

			expect(costInput(container).value).to.equal('5000');
		});

		it('should not set the cost higher then the max', () => {
			const { container } = setup(consmenticMod);

			change(costInput(container), '10001');

			expect(costInput(container).value).to.equal('10000');
		});

		it('should purchase gear at the entered cost', async () => {
			const { container, buy, props } = setup(consmenticMod);

			change(costInput(container), '5000');
			await buy();

			expect(props.purchase).to.have.been.calledOnceWith({
				gear: {
					...consmenticMod,
					ess: 0,
					cost: 5000,
				},
				category: 'augmentations',
			});
		});

		it('should purchase gear at the minimum cost if the entered cost is below that', async () => {
			const { container, buy, props } = setup(consmenticMod);

			change(costInput(container), '1');
			await buy();

			expect(props.purchase).to.have.been.calledOnceWith({
				gear: {
					...consmenticMod,
					ess: 0,
					cost: 2000,
				},
				category: 'augmentations',
			});
		});
	});

	describe('rating', () => {
		it('should have a rating select from 1 to the ware rating', () => {
			setup(dataLock);

			expect(screen.getAllByRole('option').map((option) => option.value))
				.to.eql(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']);
		});

		it('should change the displayed stats based off the rating', async () => {
			const { cell, selectRating } = setup(dataLock);

			await selectRating(4);

			expect(cell('avail')).to.equal('8');
			expect(cell('ess')).to.equal('0.1');
		});

		it('should handle restricted/forbidden gear avail', async () => {
			const { cell, selectRating } = setup(voiceMod);

			await selectRating(3);

			expect(cell('avail')).to.equal('9F');
			expect(cell('ess')).to.equal('0.2');
		});

		describe('change essence', () => {
			it('should use Rating as avail without multiplier, multiple essence cost based off rating', async () => {
				const { cell, selectRating } = setup(knowWare);

				await selectRating(2);

				expect(cell('avail')).to.equal('2');
				expect(cell('ess')).to.equal('0.1');
			});

			it('should display fixed values for essence', () => {
				const { cell } = setup(trollReduction);

				expect(cell('avail')).to.equal('8');
				expect(cell('ess')).to.equal('0.2');
				expect(cell('cost')).to.equal('15000¥');
			});

			it('should calculate the essence when the formula is formated weird', () => {
				const { cell } = setup(strikingCallus);

				expect(cell('avail')).to.equal('2');
				expect(cell('ess')).to.equal('0.05');
				expect(cell('cost')).to.equal('250¥');
			});
		});

		describe('change cost', () => {
			it('should scale off rating', async () => {
				const { cell, selectRating } = setup(dataLock);

				await selectRating(5);

				expect(cell('cost')).to.equal('5000¥');
			});

			it('should use fixed cost based off rating', async () => {
				const { cell, selectRating } = setup(controlRig);

				expect(cell('cost')).to.equal('43000¥');

				await selectRating(3);

				expect(cell('cost')).to.equal('208000¥');
			});
		});

		it('should show an input for ratings over 20', () => {
			const { container, cell } = setup(headwareMemory),
				ratingInput = container.querySelector('input.cyberware--rating__input');

			expect(screen.queryByRole('combobox')).to.be.null;
			expect(ratingInput.placeholder).to.equal('1-11980');
			expect(cell('cost')).to.equal('25¥');

			change(ratingInput, '100');

			expect(cell('cost')).to.equal('2500¥');
		});
	});

	describe('cyberware grade', () => {
		it('should change the avail, cost, and essence code of cyberware', () => {
			const { cell } = setup(datajack, 1);

			expect(cell('avail')).to.equal('0');
			expect(cell('cost')).to.equal('750¥');
			expect(cell('ess')).to.equal('0.125');
		});
	});

	describe('purchase button', () => {
		it('should invoke the purchase prop on click', async () => {
			const { buy, props } = setup();

			await buy();

			expect(props.purchase).to.have.been.calledOnceWith({
				gear: {
					...props.ware,
					ess: 0.1,
					cost: 1000,
				},
				category: 'augmentations',
			});
		});

		it('should alter the stats of the ware based off rating', async () => {
			const { buy, selectRating, props } = setup(controlRig);

			await selectRating(3);
			await buy();

			expect(props.purchase).to.have.been.calledOnceWith({
				gear: {
					...props.ware,
					ess: 3,
					avail: '15',
					cost: 208000,
				},
				category: 'augmentations',
			});
		});
	});
});
