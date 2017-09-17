import React from 'react';
import { shallow } from 'enzyme';
import weaponMods from 'data/weaponAccessories.json';

import { WeaponModsComponent } from 'components/gear/weapon/WeaponModsComponent';

const unmoddedLightPistol = {
	id: "cbff618e-6a12-4bab-aaeb-2453706bf42e",
	name: "Beretta 201T",
	category: "Light Pistols",
	type: "Ranged",
	spec: "Semi-Automatics",
	conceal: "-2",
	accuracy: "6",
	reach: "0",
	damage: "6P",
	ap: "-",
	mode: "SA/BF",
	rc: "0",
	ammo: "21(c)",
	avail: "7R",
	cost: "210",
	allowaccessory: "true",
	accessorymounts: {
		mount: [
			"Barrel",
			"Top"
		]
	},
	accessories: {
		accessory: {
			name: "Stock"
		}
	},
	source: "SR5",
	page: "425"
},
	unmoddedAssultRifle = {
	id: "b625833a-88bc-4047-b3fc-bc432d96744b",
	name: "AK-97",
	category: "Assault Rifles",
	type: "Ranged",
	conceal: "6",
	accuracy: "5",
	reach: "0",
	damage: "10P",
	ap: "-2",
	mode: "SA/BF/FA",
	rc: "0",
	ammo: "38(c)",
	avail: "4R",
	cost: "950",
	allowaccessory: "true",
	accessorymounts: {
		mount: [
			"Stock",
			"Side",
			"Internal",
			"Barrel",
			"Top",
			"Under"
		]
	},
	source: "SR5",
	page: "428"
},
	moddedHeavyPistol = {
	id: "971c711b-db32-4339-9203-865ef38f350e",
	name: "Ares Predator V",
	category: "Heavy Pistols",
	type: "Ranged",
	spec: "Semi-Automatics",
	conceal: "0",
	accuracy: "5",
	reach: "0",
	damage: "8P",
	ap: "-1",
	mode: "SA",
	rc: "0",
	ammo: "15(c)",
	avail: "5R",
	cost: "725",
	allowaccessory: "true",
	accessorymounts: {
		mount: [
			"Barrel",
			"Top"
		]
	},
	accessories: {
		accessory: {
			name: "Smartgun System, Internal"
		}
	},
	source: "SR5",
	page: "426",
	mods: {
		slottless: {
			'Concealable Holster': {
				id: "7f66a669-917a-4423-bd83-cf0e0a1fb2a8",
				name: "Concealable Holster",
				rating: "0",
				conceal: "-1",
				avail: "2",
				cost: "150",
				source: "SR5",
				page: "431"
			}
		}
	},
	currentCost: 875
},
	moddedLongarms = {
	id: "fd7f400f-c8d5-4e8c-94aa-001109635f19",
	name: "Nissan Optimum II",
	category: "Assault Rifles",
	type: "Ranged",
	conceal: "6",
	accuracy: "5",
	reach: "0",
	damage: "9P",
	ap: "-2",
	mode: "SA/BF/FA",
	rc: "1",
	ammo: "30(c)",
	avail: "10F",
	cost: "2300",
	underbarrel: "Nissan Optiumum II Shotgun",
	allowaccessory: "true",
	accessorymounts: {
		mount: [
			"Stock",
			"Side",
			"Internal",
			"Barrel",
			"Top",
			"Under"
		]
	},
	accessories: {
		accessory: [{
			name: "Shock Pad"
		}, {
			name: "Smartgun System, Internal"
		}]
	},
	source: "RG",
	page: "38",
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
			source: 'SR5'
		},
		Under: {
			id: "6e06df00-95b8-450f-9f2a-4a86c582d342",
			name: "Bipod",
			mount: "Under",
			rating: "0",
			rc: "2",
			rcgroup: "1",
			avail: "2",
			cost: "200",
			source: "SR5",
			page: "431"
		}
	},
	currentCost: 3100
};

const setup = ({}) => {
	const props = {},
	weaponModsComponent = shallow(<WeaponModsComponent {...props} />);

	return { props, weaponModsComponent };
};

describe('<WeaponModsComponent>', () => {
	it('should render a WeaponModOptionSelect for each mount', () => {

	});

	it('should render a WeaponMultiModding for each slotless mod', () => {

	});
});