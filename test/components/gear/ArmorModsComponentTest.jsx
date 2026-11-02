import React from 'react';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import armorMods from 'data/armorAccessories.json';

import { ArmorModsComponent } from 'components/gear/armor/ArmorModsComponent';
import { renderRow } from '../../helpers/render';

const unmoddedGear = {
		armor: '9',
		armorcapacity: '9',
		avail: '4',
		category: 'Armor',
		cost: '500',
		id: '4ad1eeab-daf3-4495-a73d-fbb0ce89be5b',
		name: 'Armor Vest',
		page: '437',
		source: 'SR5',
	},
	moddedGear = {
		...unmoddedGear,
		currentCapacity: 2,
		currentCost: 1000,
		mods: {
			'Fire Resistance': {
				id: 'dd246520-7306-40fb-88b4-c9cb031208fc',
				name: 'Fire Resistance',
				category: 'General',
				armor: '0',
				maxrating: '6',
				armorcapacity: 'FixedValues([1],[2],[3],[4],[5],[6])',
				avail: '6',
				cost: 'Rating * 250',
				source: 'SR5',
				page: '437',
				currentRating: 2,
				currentCost: 500,
			},
		},
	};

describe('<ArmorModsComponent/>', () => {
	const setup = (index = 0) => {
		const props = {
			armors: [unmoddedGear, moddedGear],
			index,
			modArmor: sinon.spy(),
			demodArmor: sinon.spy(),
		};

		const { container } = renderRow(<ArmorModsComponent {...props} />);

		return { props, container };
	};

	const modRow = (modName) => screen.getByRole('checkbox', { name: modName }).closest('tr');

	it('should only list mods that cost something', () => {
		setup();

		const purchasableMods = armorMods.filter((mod) => mod.cost > 0 || Number.isNaN(Number(mod.cost)));

		expect(screen.getAllByRole('checkbox').map((checkbox) => checkbox.name))
			.to.eql(purchasableMods.map((mod) => mod.name));
		expect(purchasableMods.length).to.be.below(armorMods.length);
	});

	it('should display how much armor capacity', () => {
		const { container } = setup();

		expect(container.querySelector('.capacity').textContent).to.equal('9');
	});

	it('should calculate how much armor capacity is left', () => {
		const { container } = setup(1);

		expect(container.querySelector('.capacity').textContent).to.equal('7');
	});

	describe('Armor Mod Row', () => {
		it('should demod the armor at the index when a selected mod is unchecked', async () => {
			const { props } = setup(1);

			await userEvent.click(within(modRow('Fire Resistance')).getByRole('checkbox'));

			expect(props.demodArmor).to.have.been.calledOnceWith({
				index: 1,
				category: 'armors',
				demodName: 'Fire Resistance',
			});
		});

		it('should only check the mods that are on the armor', () => {
			setup(1);

			expect(screen.getAllByRole('checkbox').filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.name))
				.to.eql(['Fire Resistance']);
		});

		it('should not check any mods for unmodded armor', () => {
			setup(0);

			expect(screen.getAllByRole('checkbox').filter((checkbox) => checkbox.checked)).to.have.lengthOf(0);
		});

		it('should show the currentRating of a selected mod', () => {
			setup(1);

			expect(within(modRow('Fire Resistance')).getByRole('spinbutton').value).to.equal('2');
		});

		it('should fire modArmor with the armor index when a mod is added', async () => {
			const { props } = setup(0);

			await userEvent.click(within(modRow('Fire Resistance')).getByRole('checkbox'));

			expect(props.modArmor).to.have.been.calledOnce;
			expect(props.modArmor.firstCall.args[0]).to.include({ index: 0, category: 'armors', Rating: 1 });
			expect(props.modArmor.firstCall.args[0].mod.name).to.equal('Fire Resistance');
		});
	});
});
