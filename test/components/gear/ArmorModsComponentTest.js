import React from 'react';
import { shallow } from 'enzyme';
import armorMods from 'data/armorAccessories.json';

import { ArmorModsComponent } from 'components/gear/armor/ArmorModsComponent';
import ArmorModRow from 'components/gear/armor/ArmorModRow';

const unmoddedGear = {
		armor: '9',
		armorcapacity: '9',
		avail: '4',
		category: 'Armor',
		cost: '500',
		id: '4ad1eeab-daf3-4495-a73d-fbb0ce89be5b',
		name: 'Armor Vest',
		page: '437',
		source: 'SR5'
	},
	moddedGear = {
		armor: '9',
		armorcapacity: '9',
		avail: '4',
		category: 'Armor',
		cost: '500',
		id: '4ad1eeab-daf3-4495-a73d-fbb0ce89be5b',
		name: 'Armor Vest',
		page: '437',
		source: 'SR5',
		capacity: 2,
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
				currentCost: 500
			}
		}
	};

describe('<ArmorModsComponent/>', () => {
	const setup = (index = 0) => {
		const props = {
			armors: [unmoddedGear, moddedGear],
			index,
			modArmor: sinon.spy(),
			demodArmor: sinon.spy()
		},
			armorModsComponent = shallow(<ArmorModsComponent {...props} />);

		return { armorModsComponent, props };
	}

	it('should <ArmorModRow/> for each armorMods item', () => {
		const { armorModsComponent } = setup();

		const rows = armorModsComponent.find(ArmorModRow);

		expect(rows).to.have.length(armorMods.length);

		rows.forEach((row, index) => {
			expect(row.props().mod.name).to.equal(armorMods[index].name)
		});
	});

	it('should display how much armor capacity', () => {
		const {armorModsComponent} = setup();

		expect(armorModsComponent.find('.capacity').text()).to.equal('9');
	});

	it('should calculate how much armor capacity is left', () => {
		const {armorModsComponent} = setup(1);

		expect(armorModsComponent.find('.capacity').text()).to.equal('7');
	});

	describe('Armor Mod Row', () => {
		it('should get the correct props passed down', () => {
			const { armorModsComponent, props } = setup();

			armorModsComponent.find(ArmorModRow).forEach((row) => {
				expect(row.props().gearName).to.equal('Armor Vest');
				expect(row.props().index).to.equal(0);
				expect(row.props().modArmor).to.equal(props.modArmor);
				expect(row.props().demodArmor).to.equal(props.demodArmor);
			});
		});

		it('should set selectedMod to true if the mod is in the armor mods object', () => {
			const {armorModsComponent, props} = setup(1);

			const activeModRows = armorModsComponent.find({selectedMod: true});

			activeModRows.forEach((row) => {
				const activeModName = row.props().mod.name;
				expect(activeModName).to.equal(moddedGear.mods[activeModName].name);
			});
		});

		it('should pass the currentRating of the mod if it is selected with a rating', () => {
			const {armorModsComponent, props} = setup(1);

			const activeModRows = armorModsComponent.find({selectedMod: true});

			activeModRows.forEach((row) => {
				const activeModName = row.props().mod.name;
				const activeModRating = row.props().currentRating;
				expect(activeModRating).to.equal(moddedGear.mods[activeModName].currentRating);
			});
		});

	});
});
