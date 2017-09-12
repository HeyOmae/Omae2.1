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
	page: "426"
},
	moddedLongarms = {
	id: "5d366d23-c0cd-4613-a035-f5a5378dcfa9",
	name: "HK XM30 Sniper",
	category: "Assault Rifles",
	spec: "Sniper Rifles",
	type: "Ranged",
	conceal: "6",
	accuracy: "7",
	reach: "0",
	damage: "9P",
	ap: "-2",
	mode: "SA",
	rc: "2",
	ammo: "10(c)",
	avail: "0",
	cost: "0",
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
			name: "Imaging Scope"
		}, {
			name: "Smartgun System, Internal"
		}]
	},
	range: "Sniper Rifles",
	useskill: "Longarms",
	source: "RG",
	page: "37"
};

