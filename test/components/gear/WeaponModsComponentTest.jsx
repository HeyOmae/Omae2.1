import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { WeaponModsComponent } from 'components/gear/weapon/WeaponModsComponent';

const unmoddedLightPistol = {
		id: 'cbff618e-6a12-4bab-aaeb-2453706bf42e',
		name: 'Beretta 201T',
		category: 'Light Pistols',
		type: 'Ranged',
		spec: 'Semi-Automatics',
		conceal: '-2',
		accuracy: '6',
		reach: '0',
		damage: '6P',
		ap: '-',
		mode: 'SA/BF',
		rc: '0',
		ammo: '21(c)',
		avail: '7R',
		cost: '210',
		allowaccessory: 'true',
		accessorymounts: {
			mount: [
				'Barrel',
				'Top',
			],
		},
		accessories: {
			accessory: {
				name: 'Stock',
			},
		},
		source: 'SR5',
		page: '425',
	},
	moddedHeavyPistol = {
		id: '971c711b-db32-4339-9203-865ef38f350e',
		name: 'Ares Predator V',
		category: 'Heavy Pistols',
		type: 'Ranged',
		spec: 'Semi-Automatics',
		conceal: '0',
		accuracy: '5',
		reach: '0',
		damage: '8P',
		ap: '-1',
		mode: 'SA',
		rc: '0',
		ammo: '15(c)',
		avail: '5R',
		cost: '725',
		allowaccessory: 'true',
		accessorymounts: {
			mount: [
				'Barrel',
				'Top',
			],
		},
		accessories: {
			accessory: {
				name: 'Smartgun System, Internal',
			},
		},
		source: 'SR5',
		page: '426',
		mods: {
			slotless: {
				'Concealable Holster': {
					id: '7f66a669-917a-4423-bd83-cf0e0a1fb2a8',
					name: 'Concealable Holster',
					rating: '0',
					conceal: '-1',
					avail: '2',
					cost: '150',
					source: 'SR5',
					page: '431',
				},
			},
		},
		currentCost: 875,
	},
	moddedLongarms = {
		id: 'fd7f400f-c8d5-4e8c-94aa-001109635f19',
		name: 'Nissan Optimum II',
		category: 'Assault Rifles',
		type: 'Ranged',
		conceal: '6',
		accuracy: '5',
		reach: '0',
		damage: '9P',
		ap: '-2',
		mode: 'SA/BF/FA',
		rc: '1',
		ammo: '30(c)',
		avail: '10F',
		cost: '2300',
		underbarrel: 'Nissan Optiumum II Shotgun',
		allowaccessory: 'true',
		accessorymounts: {
			mount: [
				'Stock',
				'Side',
				'Internal',
				'Barrel',
				'Top',
				'Under',
			],
		},
		accessories: {
			accessory: [{
				name: 'Shock Pad',
			}, {
				name: 'Smartgun System, Internal',
			}],
		},
		source: 'RG',
		page: '38',
		mods: {
			Barrel: {
				avail: '9R',
				cost: '600',
				id: '6b06cf52-04fa-4034-bb10-2bcdd58c4bfb',
				mount: 'Barrel',
				name: 'Gas-Vent 3 System',
				page: '431',
				rating: '0',
				rc: '3',
				source: 'SR5',
			},
			Under: {
				id: '6e06df00-95b8-450f-9f2a-4a86c582d342',
				name: 'Bipod',
				mount: 'Under',
				rating: '0',
				rc: '2',
				rcgroup: '1',
				avail: '2',
				cost: '200',
				source: 'SR5',
				page: '431',
			},
		},
		currentCost: 3100,
	};

const gasVent = moddedLongarms.mods.Barrel,
	bipod = moddedLongarms.mods.Under,
	concealableHolster = moddedHeavyPistol.mods.slotless['Concealable Holster'],
	smartgun = {
		id: 'e2c1e8d9-0000-4000-8000-000000000000',
		name: 'Smartgun System, External',
		mount: 'Top/Under',
		rating: '0',
		avail: '4R',
		cost: '200',
		source: 'SR5',
		page: '433',
	},
	personalizedGrip = {
		id: 'e2c1e8d9-0000-4000-8000-000000000001',
		name: 'Personalized Grip',
		rating: '0',
		avail: '2',
		cost: 'Weapon Cost',
		source: 'SR5',
		page: '432',
	},
	weaponModLists = {
		Barrel: [gasVent],
		Top: [smartgun],
		Under: [smartgun, bipod],
		Stock: [],
		Side: [],
		Internal: [],
		slotless: [concealableHolster, personalizedGrip],
	};

const setup = (index = 0) => {
	const props = {
		index,
		weapons: [unmoddedLightPistol, moddedHeavyPistol, moddedLongarms],
		weaponModLists,
		weaponSlotModding: sinon.spy(),
		slotlessModding: sinon.spy(),
		slotlessDemodding: sinon.spy(),
	};

	const { container } = render(<WeaponModsComponent {...props} />);

	const mountSelect = (mountLocation) => within(screen.getByText(mountLocation).closest('div')).getByRole('combobox');

	return { props, container, mountSelect };
};

describe('<WeaponModsComponent>', () => {
	describe('mounts', () => {
		it('should render a select for each mount on the weapon', () => {
			const { container } = setup(0);

			expect([...container.querySelectorAll('.col-md-4 strong')].map((label) => label.textContent))
				.to.eql(['Barrel', 'Top']);
			expect(screen.getAllByRole('combobox')).to.have.lengthOf(2);
		});

		it('should list the mods for the mount with their cost', () => {
			const { mountSelect } = setup(2);

			expect(within(mountSelect('Under')).getAllByRole('option').map((option) => option.textContent))
				.to.eql(['—', 'Smartgun System, External 200¥', 'Bipod 200¥']);
		});

		it('should select the mods already on the weapon', () => {
			const { mountSelect } = setup(2);

			expect(mountSelect('Barrel').value).to.equal('Gas-Vent 3 System');
			expect(mountSelect('Under').value).to.equal('Bipod');
			expect(mountSelect('Top').value).to.equal('');
		});

		it('should fire weaponSlotModding with the selected mod', async () => {
			const { mountSelect, props } = setup(0);

			await userEvent.selectOptions(mountSelect('Top'), 'Smartgun System, External');

			expect(props.weaponSlotModding).to.have.been.calledOnceWith({
				index: 0,
				category: 'weapons',
				slot: 'Top',
				mod: smartgun,
			});
		});
	});

	describe('slotless mods', () => {
		it('should render a checkbox for each slotless mod, using the weapon cost when the mod cost is not a number', () => {
			setup(0);

			expect(screen.getByRole('checkbox', { name: 'Concealable Holster — 150¥' })).to.exist;
			expect(screen.getByRole('checkbox', { name: 'Personalized Grip — 210¥' })).to.exist;
		});

		it('should check the slotless mods already on the weapon', () => {
			setup(1);

			expect(screen.getByRole('checkbox', { name: /Concealable Holster/ }).checked).to.be.true;
			expect(screen.getByRole('checkbox', { name: /Personalized Grip/ }).checked).to.be.false;
		});

		it('should fire slotlessModding when a mod is checked', async () => {
			const { props } = setup(0);

			await userEvent.click(screen.getByRole('checkbox', { name: /Personalized Grip/ }));

			expect(props.slotlessModding).to.have.been.calledOnceWith({
				index: 0,
				category: 'weapons',
				slot: 'slotless',
				mod: { ...personalizedGrip, cost: '210' },
			});
		});

		it('should fire slotlessDemodding when a mod is unchecked', async () => {
			const { props } = setup(1);

			await userEvent.click(screen.getByRole('checkbox', { name: /Concealable Holster/ }));

			expect(props.slotlessDemodding).to.have.been.calledOnceWith({
				index: 1,
				category: 'weapons',
				slot: 'slotless',
				demodName: 'Concealable Holster',
			});
		});
	});
});
