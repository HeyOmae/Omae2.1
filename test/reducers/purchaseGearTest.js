const reducer = require('../../src/reducers/gear/purchaseGear');

let state;

describe('purchaseGear', () => {
	beforeEach(() => {
		state = {
			commlinks: [{
				id: 'd808ba12-db93-4a7b-85a1-9e9f6229087f',
				name: 'Sony Emperor',
				category: 'Commlinks',
				armorcapacity: '[2]',
				capacity: '0',
				rating: '0',
				devicerating: '2',
				attack: '0',
				sleaze: '0',
				dataprocessing: '2',
				firewall: '2',
				avail: '4',
				cost: '700',
				source: 'SR5',
				page: '438',
			}],
			weapons: [{
				id: '3a7a90ce-fbb5-4599-a857-b9849eb9769c',
				name: 'Ares Alpha',
				category: 'Assault Rifles',
				type: 'Ranged',
				conceal: '6',
				accuracy: '5',
				reach: '0',
				damage: '11P',
				ap: '-2',
				mode: 'SA/BF/FA',
				rc: '2',
				ammo: '42(c)',
				avail: '11F',
				cost: '2650',
				underbarrel: 'Ares Alpha Grenade Launcher',
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
					accessory: {
						name: 'Smartgun System, Internal',
					},
				},
				source: 'SR5',
				page: '428',
			},
			{
				id: '67474de7-d29b-4b31-a6ae-1e2e981fa5d2',
				name: 'Ares Light Fire 70',
				category: 'Light Pistols',
				type: 'Ranged',
				spec: 'Semi-Automatics',
				conceal: '-2',
				accuracy: '7',
				reach: '0',
				damage: '6P',
				ap: '-',
				mode: 'SA',
				rc: '0',
				ammo: '16(c)',
				avail: '3R',
				cost: '200',
				allowaccessory: 'true',
				accessorymounts: {
					mount: [
						'Barrel',
						'Top',
					],
				},
				source: 'SR5',
				page: '425',
				mods: {
					Barrel: {
						id: '6b06cf52-04fa-4034-bb10-2bcdd58c4bfb',
						name: 'Gas-Vent 3 System',
						mount: 'Barrel',
						rating: '0',
						rc: '3',
						avail: '9R',
						cost: '600',
						source: 'SR5',
						page: '431',
					},
					slotless: {
						'Trigger Removal': {
							id: 'f2eee4ed-d0cb-4163-84d9-91e537cd13d9',
							name: 'Trigger Removal',
							rating: '0',
							accuracy: '1',
							avail: '2',
							cost: '50',
							source: 'HT',
							page: '182',
						},
						'Gecko Grip': {
							id: '627f212a-ac15-4739-afbc-f44676dfe508',
							name: 'Gecko Grip',
							rating: '0',
							avail: '6',
							cost: '100',
							source: 'RG',
							page: '52',
						},
					},
				},
				currentCost: 950,
			}],
			armors: [{
				id: '5a650844-8f24-48e7-829f-0443d9ff5cf7',
				name: 'Actioneer Business Clothes',
				category: 'Armor',
				armor: '8',
				armorcapacity: '8',
				avail: '8',
				cost: '1500',
				source: 'SR5',
				page: '437',
			},
			{
				id: '40826eaa-c22a-43da-8730-bc1867ea65a1',
				name: 'Armor Clothing',
				category: 'Armor',
				armor: '6',
				armorcapacity: '6',
				avail: '2',
				cost: '450',
				source: 'SR5',
				page: '437',
				currentCost: 1750,
				currentCapacity: 6,
				mods: {
					Nonconductivity: {
						id: '0cfb049a-a1bd-4daa-96be-9468c37d9c3c',
						name: 'Nonconductivity',
						category: 'General',
						armor: '0',
						maxrating: '6',
						armorcapacity: 'FixedValues([1],[2],[3],[4],[5],[6])',
						avail: '6',
						cost: 'Rating * 250',
						source: 'SR5',
						page: '438',
						currentRating: 5,
						currentCost: 1250,
					},
					'Faraday Pocket': {
						id: 'c3ea670b-45e7-4b75-a85d-1801c91d1c8c',
						name: 'Faraday Pocket',
						category: 'General',
						armor: '0',
						maxrating: '1',
						armorcapacity: '[1]',
						avail: '7R',
						cost: '50',
						source: 'HT',
						page: '185',
					},
				},
			},
			{
				id: '4ad1eeab-daf3-4495-a73d-fbb0ce89be5b',
				name: 'Armor Vest',
				category: 'Armor',
				armor: '9',
				armorcapacity: '9',
				avail: '4',
				cost: '500',
				source: 'SR5',
				page: '437',
				currentCost: 1000,
				currentCapacity: 2,
				mods: {
					Nonconductivity: {
						id: '0cfb049a-a1bd-4daa-96be-9468c37d9c3c',
						name: 'Nonconductivity',
						category: 'General',
						armor: '0',
						maxrating: '6',
						armorcapacity: 'FixedValues([1],[2],[3],[4],[5],[6])',
						avail: '6',
						cost: 'Rating * 250',
						source: 'SR5',
						page: '438',
						currentRating: 2,
						currentCost: 500,
					},
				},
			}],
			cyberlimbs: [{
				id: 'df01eed6-a019-4198-b88d-4ba8f9aaefdf',
				name: 'Broken Obvious Full Arm',
				category: 'Cyberlimb',
				ess: '1',
				capacity: '3',
				avail: '4',
				cost: '15000',
				source: 'SR5',
				page: '456',
				allowgear: {
					gearcategory: 'Sensors',
				},
				allowsubsystems: {
					category: [
						'Bodyware',
						'Cosmetic Enhancement',
						'Cyberlimb Enhancement',
						'Cyberlimb Accessory',
						'Cyber Implant Weapon',
						'Headware',
						'Nanocybernetics',
					],
				},
				bonus: {
					conditionmonitor: {
						physical: '1',
					},
				},
				limbslot: 'arm',
			}, {
				id: 'df01eed6-a019-4198-b88d-4ba8f9aaefdf',
				name: 'Broken Obvious Full Arm',
				category: 'Cyberlimb',
				ess: '1',
				capacity: '2',
				avail: '4',
				cost: '15000',
				source: 'SR5',
				page: '456',
				allowgear: {
					gearcategory: 'Sensors',
				},
				allowsubsystems: {
					category: [
						'Bodyware',
						'Cosmetic Enhancement',
						'Cyberlimb Enhancement',
						'Cyberlimb Accessory',
						'Cyber Implant Weapon',
						'Headware',
						'Nanocybernetics',
					],
				},
				bonus: {
					conditionmonitor: {
						physical: '1',
					},
				},
				limbslot: 'arm',
				mods: {
					'Enhanced Strength': {
						id: 'a9f4efd4-b86c-4e90-b0f7-aefa32c3b9de',
						name: 'Enhanced Strength',
						category: 'Cyberlimb Enhancement',
						ess: '0',
						capacity: '[Rating * 1]',
						avail: '(Rating * 3)R',
						cost: 'Rating * 6500',
						source: 'SR5',
						page: '456',
						rating: '3',
						currentRating: 2,
						currentCost: 13000,
					},
				},
				currentCost: 28000,
				currentCapacity: 2,
			}, {
				id: 'df01eed6-a019-4198-b88d-4ba8f9aaefdf',
				name: 'Broken Obvious Full Arm',
				category: 'Cyberlimb',
				ess: '1',
				capacity: '2',
				avail: '4',
				cost: '15000',
				source: 'SR5',
				page: '456',
				allowgear: {
					gearcategory: 'Sensors',
				},
				allowsubsystems: {
					category: [
						'Bodyware',
						'Cosmetic Enhancement',
						'Cyberlimb Enhancement',
						'Cyberlimb Accessory',
						'Cyber Implant Weapon',
						'Headware',
						'Nanocybernetics',
					],
				},
				bonus: {
					conditionmonitor: {
						physical: '1',
					},
				},
				limbslot: 'arm',
				mods: {
					'Bulk Modification': {
						id: '85bd6c32-d0c3-4d1b-99ad-833aad376a54',
						name: 'Bulk Modification',
						category: 'Cyberlimb Enhancement',
						ess: '0',
						capacity: '[-Rating]',
						avail: '+Rating',
						cost: 'Rating * 500',
						source: 'CF',
						page: '86',
						rating: '6',
						currentRating: 6,
						currentCost: 3500,
					},
					'Fiberoptic Hair': {
						id: 'b7ec08aa-a328-46a0-9b41-4c9a4bfc13b2',
						name: 'Fiberoptic Hair',
						category: 'Cosmetic Enhancement',
						ess: '0.1',
						capacity: '[1]',
						avail: '0',
						cost: 'Rating * 100',
						source: 'CF',
						page: '73',
						rating: '10',
						currentRating: 3,
						currentCost: 300,
					},
				},
				currentCost: 18800,
				currentCapacity: -5,
			}],
			vehicles: [{
				id: 'c0d3e7fd-d5fd-48c4-b49d-0c7dea26895d',
				name: 'Dodge Scoot (Scooter)',
				page: '462',
				source: 'SR5',
				accel: '1',
				armor: '4',
				avail: '0',
				body: '4',
				category: 'Bikes',
				cost: '3000',
				handling: '4/3',
				pilot: '1',
				sensor: '1',
				speed: '3',
				gears: {
					gear: {
						'-rating': '1',
						'-maxrating': '6',
						'#text': 'Sensor Array',
					},
				},
				mods: {
					name: 'Improved Economy',
				},
				seats: '1',
			}, {
				id: 'cfafdbac-509e-49f3-a62a-5cfa8e987e0f',
				name: 'Evo Falcon-EX',
				page: '43',
				source: 'R5',
				accel: '1/2',
				armor: '9',
				avail: '0',
				body: '7',
				category: 'Bikes',
				cost: '10000',
				handling: '3/5',
				pilot: '1',
				sensor: '1',
				speed: '2/3',
				gears: {
					gear: {
						'-rating': '1',
						'-maxrating': '6',
						'#text': 'Sensor Array',
					},
				},
				mods: {
					name: 'Tracked Propulsion',
					Protection: {
						'Armor (Concealed)': {
							id: '85a85cfd-7703-48f6-9745-d0a2b64c8b9e',
							name: 'Armor (Concealed)',
							page: '159',
							source: 'R5',
							avail: '12R',
							category: 'Protection',
							cost: 'Rating * 3000',
							rating: 'body',
							slots: 'Rating * 3',
							bonus: {
								armor: 'Rating',
							},
							currentRating: 1,
							currentCost: 3000,
							currentSlot: 3,
						},
						'Anti-Theft System': {
							id: 'f2d9840c-22a7-4c70-943d-ffac88fe6120',
							name: 'Anti-Theft System',
							page: '159',
							source: 'R5',
							avail: 'FixedValues(4,6,8R,12F)',
							category: 'Protection',
							cost: 'FixedValues(500,1000,2500,5000)',
							rating: '4',
							slots: 'FixedValues(1,2,4,6)',
							currentRating: 1,
							currentCost: 500,
							currentSlot: 1,
						},
						'Passenger Protection System': {
							id: 'f9353113-4f4b-4c71-b742-eb5a6f87fc1"',
							name: 'Passenger Protection System',
							page: '159',
							source: 'R5',
							avail: '6',
							category: 'Protection',
							cost: 'Rating * 2000',
							rating: '6',
							slots: '2',
							currentRating: 3,
							currentCost: 6000,
						},
						currentSlot: 6,
					},
					Powertrain: {
						'Speed Enhancement': {
							id: 'ecc73836-9110-4f5f-9464-cb6ae6e954d2',
							name: 'Speed Enhancement',
							page: '157',
							source: 'R5',
							avail: 'FixedValues(6,8,12)',
							category: 'Powertrain',
							cost: 'FixedValues(Speed * 2000,Speed * 5000,Speed * 12000)',
							rating: '3',
							slots: 'FixedValues(5,14,20)',
							bonus: {
								offroadspeed: '+Rating',
								speed: '+Rating',
							},
							currentRating: 1,
							currentSlot: 5,
							currentCost: 6000,
						},
						currentSlot: 5,
					},
				},
				seats: '2',
				currentCost: 28500,
			}, {
				id: '6a094997-cd2b-4094-90ff-d5648b8889fb',
				name: 'GMC 442 Chameleon',
				page: '48',
				source: 'R5',
				accel: '1',
				armor: '4',
				avail: '0',
				body: '10',
				category: 'Cars',
				cost: '14000',
				handling: '4/2',
				pilot: '1',
				sensor: '1',
				speed: '4',
				gears: {
					gear: {
						'-rating': '1',
						'-maxrating': '7',
						'#text': 'Sensor Array',
					},
				},
				seats: '4',
			}],
			Drones: [
				{
					id: '9186a0a7-635f-4242-a0e8-238f48b17ca2',
					name: 'GM-Nissan Doberman (Medium)',
					page: '466',
					source: 'SR5',
					accel: '1',
					armor: '4',
					avail: '4R',
					body: '4',
					category: 'Drones: Medium',
					cost: '5000',
					handling: '5',
					pilot: '3',
					sensor: '3',
					speed: '3',
					gears: {
						gear: {
							'-rating': '3',
							'-maxrating': '4',
							'#text': 'Sensor Array',
						},
					},
					weaponmounts: {
						weaponmount: {
							size: 'Standard [SR5]',
							visibility: 'External',
							flexibility: 'Fixed',
							control: 'Remote',
						},
					},
				},
			],
			nuyen: 3350,
		};
	});


	const metalink = {
		id: '89a0f3c9-5ef6-41cd-981f-4ac690ee2ab3',
		name: 'Meta Link',
		category: 'Commlinks',
		rating: '0',
		capacity: '0',
		armorcapacity: '[2]',
		devicerating: '1',
		attack: '0',
		sleaze: '0',
		dataprocessing: '1',
		firewall: '1',
		avail: '2',
		cost: '100',
		source: 'SR5',
		page: '438',
	};

	it('should not change the passed state', (done) => {
		reducer(state, { type: 'INVALID' });

		done();
	});

	describe('PURCHASE', () => {
		it('should add a key for a new category of gear, and add that gear', () => {
			const gear = {
					id: '2633cf38-90a6-4843-b475-e3ee1132fb5f',
					name: 'Gas Mask',
					category: 'Survival Gear',
					armorcapacity: '[2]',
					rating: '0',
					avail: '0',
					cost: '200',
					source: 'SR5',
					page: '449',
				},
				newState = reducer(state, { type: 'PURCHASE', parameter: { gear, category: gear.category } });
			expect(newState['Survival Gear'][0]).to.equal(gear);
			expect(newState.nuyen).to.equal(3550);
			expect(state['Survival Gear']).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});

		it('should set the key of currentCost by the rating and cost and give a key of currentRating', () => {
			const gear = {
					id: '7e887224-6896-4588-a5d3-cace6a8506d2',
					name: 'White Noise Generator',
					rating: '6',
					category: 'Communications and Countermeasures',
					armorcapacity: '[2]',
					avail: '(Rating)',
					cost: 'Rating * 50',
					source: 'SR5',
					page: '441',
				},
				newState = reducer(state, { type: 'PURCHASE', parameter: { gear, category: 'gears', Rating: 1 } });


			expect(newState.gears[0].currentRating).to.equal(1);
			expect(newState.gears[0].currentCost).to.equal(50);

			expect(newState.gears[0]).to.deep.equal({
				...gear,
				currentRating: 1,
				currentCost: 50,
			});
			expect(newState.nuyen).to.equal(3400);
			expect(state.gears).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});

		it('should add a gear to its category if the key already exists', () => {
			const newState = reducer(state, { type: 'PURCHASE', parameter: { gear: metalink, category: 'commlinks' } });

			expect(newState.commlinks.length).to.equal(2);
			expect(newState.commlinks[1]).to.equal(metalink);
			expect(newState.nuyen).to.equal(3450);
			expect(state.commlinks.length).to.equal(1);
			expect(state.nuyen).to.equal(3350);
		});

		it('should add gear with current rating for gear with static costs', () => {
			const dynomite = {
				id: 'df3efeef-661f-41fd-9007-01ba7db42dee',
				name: 'Dynamite',
				category: 'Explosives',
				rating: '3',
				minrating: '3',
				avail: '8R',
				cost: '350',
				source: 'RG',
				page: '190',
			};

			const newState = reducer(state, { type: 'PURCHASE', parameter: { gear: dynomite, category: 'Explosives', Rating: 3 } });

			expect(newState.Explosives[0].currentRating).to.equal(3);
			expect(newState.nuyen).to.equal(3700);

			expect(state.Explosives).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});
	});

	describe('SELL', () => {
		it('should remove a piece of gear from the gear array', () => {
			state.commlinks.push(metalink);
			state.nuyen += 100;
			const newState = reducer(state, { type: 'SELL', parameter: { index: 0, category: 'commlinks' } });

			expect(newState.commlinks.length).to.equal(1);
			expect(newState.nuyen).to.equal(2750);
			expect(state.commlinks.length).to.equal(2);
			expect(state.nuyen).to.equal(3450);
		});

		it('should remove a key if the gear array becomes empty', () => {
			const newState = reducer(state, { type: 'SELL', parameter: { index: 0, category: 'commlinks' } });

			expect(newState.commlinks).to.be.undefined;
			expect(newState.nuyen).to.equal(2650);
			expect(state.commlinks.length).to.equal(1);
			expect(state.nuyen).to.equal(3350);
		});

		it('should refund the cost of a modded weapon cost', () => {
			const newState = reducer(state, { type: 'SELL', parameter: { index: 1, category: 'weapons' } });

			expect(newState.weapons.length).to.equal(1);
			expect(newState.nuyen).to.equal(2400);
			expect(state.weapons.length).to.equal(2);
			expect(state.nuyen).to.equal(3350);
		});
	});

	describe('WEAPON_MODDING', () => {
		const stockMod = {
			id: '71a37dd2-d162-4829-a233-5afdd954691d',
			name: 'Hip Pad Bracing System',
			mount: 'Stock',
			rating: '0',
			avail: '4',
			cost: '250',
			rc: '1',
			rcgroup: '2',
			source: 'RG',
			page: '52',
		};

		it('should add a mod key to a weapon and populate it with the mod', () => {
			const newState = reducer(state, { type: 'WEAPON_MODDING', parameter: { index: 0, category: 'weapons', slot: 'stock', mod: stockMod } });

			expect(newState.weapons[0].mods.stock).to.equal(stockMod);
			expect(newState.weapons[0].currentCost).to.equal(2900);
			expect(newState.nuyen).to.equal(3600);

			expect(state.weapons[0].mods).to.be.undefined;
			expect(state.weapons[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});

		it('should add or subtract the difference of a weapon mod\'s cost being changed out', () => {
			const stockMod2 = {
				id: '88d0e08b-1ac2-442e-8f2f-dfaeb9cda9ab',
				name: 'Stock Removal',
				mount: 'Stock',
				conceal: '-1',
				rating: '0',
				avail: '2',
				cost: '20',
				source: 'HT',
				page: '182',
			};
			const newState = reducer(state, { type: 'WEAPON_MODDING', parameter: { index: 0, category: 'weapons', slot: 'stock', mod: stockMod } });
			expect(newState.weapons[0].currentCost).to.equal(2900);
			expect(newState.nuyen).to.equal(3600);
			expect(state.weapons[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);

			const newState2 = reducer(newState, { type: 'WEAPON_MODDING', parameter: { index: 0, category: 'weapons', slot: 'stock', mod: stockMod2 } });
			expect(newState2.weapons[0].mods.stock).to.equal(stockMod2);
			expect(newState2.weapons[0].currentCost).to.equal(2670);
			expect(newState2.nuyen).to.equal(3370);
			expect(newState.weapons[0].currentCost).to.equal(2900);
			expect(newState.nuyen).to.equal(3600);
			expect(state.weapons[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});

		it('should do reset remove the slot if there is no mod given', () => {
			const newState = reducer(state, { type: 'WEAPON_MODDING', parameter: { index: 0, category: 'weapons', slot: 'stock', mod: stockMod } });
			expect(newState.weapons[0].currentCost).to.equal(2900);
			expect(newState.nuyen).to.equal(3600);
			expect(state.weapons[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);

			const newState2 = reducer(newState, { type: 'WEAPON_MODDING', parameter: { index: 0, category: 'weapons', slot: 'stock', mod: '' } });

			expect(newState2.weapons[0].mods.stock).to.be.undefined;
			expect(newState2.nuyen).to.equal(3350);
			expect(newState.weapons[0].currentCost).to.equal(2900);
			expect(newState.nuyen).to.equal(3600);
		});

		it('should return state if no mod is passed in to an empty mod slot', () => {
			const newState = reducer(state, { type: 'WEAPON_MODDING', parameter: { index: 0, category: 'weapons', slot: 'stock', mod: '' } });

			expect(newState).to.equal(state);
		});

		it('should add to the currentCost if already modded', () => {
			const topMod = {
				id: '2905095e-937e-4dbc-aa56-3b66676e1559',
				name: 'Imaging Scope',
				mount: 'Top',
				avail: '2',
				rating: '0',
				cost: '300',
				allowgear: {
					gearcategory: 'Vision Enhancements',
				},
				source: 'SR5',
				page: '432',
			};

			const newState = reducer(state, { type: 'WEAPON_MODDING', parameter: { index: 1, category: 'weapons', slot: 'top', mod: topMod } });

			expect(newState.weapons[1].currentCost).to.equal(1250);
			expect(state.weapons[1].currentCost).to.equal(950);
		});
	});

	const triggerMod = {
		id: 'f2eee4ed-d0cb-4163-84d9-91e537cd13d9',
		name: 'Trigger Removal',
		rating: '0',
		accuracy: '1',
		avail: '2',
		cost: '50',
		source: 'HT',
		page: '182',
	};

	describe('MODDING_MULTI', () => {
		it('should add an item to a slot that takes mutliple mods', () => {
			const newState = reducer(state, { type: 'MODDING_MULTI', parameter: { index: 0, category: 'weapons', slot: 'slotless', mod: triggerMod } });

			expect(newState.weapons[0].mods.slotless['Trigger Removal']).to.equal(triggerMod);
			expect(newState.weapons[0].currentCost).to.equal(2700);
			expect(newState.nuyen).to.equal(3400);

			expect(state.weapons[0].mods).to.be.undefined;
			expect(state.weapons[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});

		it('should add another item to the slot', () => {
			const newState1 = reducer(state, { type: 'MODDING_MULTI', parameter: { index: 0, category: 'weapons', slot: 'slotless', mod: triggerMod } });

			const geckoGrip = {
				id: '627f212a-ac15-4739-afbc-f44676dfe508',
				name: 'Gecko Grip',
				rating: '0',
				avail: '6',
				cost: '100',
				source: 'RG',
				page: '52',
			};

			const newState2 = reducer(newState1, { type: 'MODDING_MULTI', parameter: { index: 0, category: 'weapons', slot: 'slotless', mod: geckoGrip } });

			expect(newState2.weapons[0].mods.slotless['Trigger Removal']).to.equal(triggerMod);
			expect(newState2.weapons[0].mods.slotless['Gecko Grip']).to.equal(geckoGrip);
			expect(newState2.weapons[0].currentCost).to.equal(2800);
			expect(newState2.nuyen).to.equal(3500);

			expect(state.weapons[0].mods).to.be.undefined;
			expect(state.weapons[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});
	});

	describe('DEMODDING_MULTI', () => {
		it('should remove an item from a slot that takes mutliple mods', () => {
			const geckoGrip = {
				id: '627f212a-ac15-4739-afbc-f44676dfe508',
				name: 'Gecko Grip',
				rating: '0',
				avail: '6',
				cost: '100',
				source: 'RG',
				page: '52',
			};
			const newState = reducer(state, { type: 'DEMODDING_MULTI', parameter: { index: 1, category: 'weapons', slot: 'slotless', demodName: 'Trigger Removal' } });

			expect(newState.weapons[1].mods.slotless['Trigger Removal']).to.be.undefined;
			expect(newState.weapons[1].mods.slotless['Gecko Grip']).to.deep.equal(geckoGrip);
			expect(newState.weapons[1].currentCost).to.equal(900);
			expect(newState.nuyen).to.equal(3300);


			expect(state.weapons[1].mods.slotless['Trigger Removal']).to.deep.equal(triggerMod);
			expect(state.weapons[1].mods.slotless['Gecko Grip']).to.deep.equal(geckoGrip);
			expect(state.weapons[1].currentCost).to.equal(950);
			expect(state.nuyen).to.equal(3350);
		});
	});

	describe('MODDING_CAPACITY', () => {
		const shockFrills = {
				id: 'dbdaf817-9bfa-4938-a195-b53c63b53e7c',
				name: 'Shock Frills',
				category: 'General',
				armor: '0',
				maxrating: '1',
				armorcapacity: '[2]',
				avail: '6R',
				cost: '250',
				source: 'SR5',
				page: '438',
			},
			thermalDamp = {
				id: 'ba32a6e9-4e6f-47fe-8fd7-c3194a5174d6',
				name: 'Thermal Damping',
				category: 'General',
				armor: '0',
				maxrating: '6',
				armorcapacity: 'FixedValues([1],[2],[3],[4],[5],[6])',
				avail: '10R',
				cost: 'Rating * 500',
				source: 'SR5',
				page: '438',
			},
			enhanceStr = {
				id: 'a9f4efd4-b86c-4e90-b0f7-aefa32c3b9de',
				name: 'Enhanced Strength',
				category: 'Cyberlimb Enhancement',
				ess: '0',
				capacity: '[Rating * 1]',
				avail: '(Rating * 3)R',
				cost: 'Rating * 6500',
				source: 'SR5',
				page: '456',
				rating: '3',
			},
			bulkMod = {
				id: '85bd6c32-d0c3-4d1b-99ad-833aad376a54',
				name: 'Bulk Modification',
				category: 'Cyberlimb Enhancement',
				ess: '0',
				capacity: '[-Rating]',
				avail: '+Rating',
				cost: 'Rating * 500',
				source: 'CF',
				page: '86',
				rating: '6',
			};

		it('should add a mod and add capacity based off of the mod', () => {
			const newState = reducer(state, { type: 'MODDING_CAPACITY', parameter: { index: 0, category: 'armors', mod: shockFrills } });

			expect(newState.armors[0].mods['Shock Frills']).to.equal(shockFrills);
			expect(newState.armors[0].currentCost).to.equal(1750);
			expect(newState.nuyen).to.equal(3600);
			expect(newState.armors[0].currentCapacity).to.equal(2);

			expect(state.armors[0].mods).to.be.undefined;
			expect(state.armors[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});

		it('should add not reset mods that have previously been added', () => {
			const newState = reducer(state, { type: 'MODDING_CAPACITY', parameter: { index: 2, category: 'armors', mod: shockFrills } });

			expect(Object.keys(newState.armors[2].mods).length).to.equal(2);
			expect(newState.armors[2].mods['Shock Frills']).to.equal(shockFrills);
			expect(newState.armors[2].currentCost).to.equal(1250);
			expect(newState.nuyen).to.equal(3600);
			expect(newState.armors[2].currentCapacity).to.equal(4);

			expect(Object.keys(state.armors[2].mods).length).to.equal(1);
			expect(state.armors[2].currentCost).to.equal(1000);
			expect(state.nuyen).to.equal(3350);
		});

		it('should not add a mod if it will be more then the capacity limit of the gear', () => {
			const newState = reducer(state, { type: 'MODDING_CAPACITY', parameter: { index: 1, category: 'armors', mod: shockFrills } });

			expect(newState.armors[1].mods['Shock Frills']).to.be.undefined;
			expect(newState.armors[1].currentCost).to.equal(1750);
			expect(newState.nuyen).to.equal(3350);
			expect(newState.armors[1].currentCapacity).to.equal(6);

			expect(state.armors[1]).to.equal(newState.armors[1]);
			expect(state.nuyen).to.equal(3350);
		});

		it('should add a mod that beings the capacity to it the limit', () => {
			const ruleBreaker = {
				id: 'ba32a6e9-4e6f-47fe-8fd7-c3194a5174d6',
				name: 'Breaker',
				category: 'General',
				armor: '0',
				maxrating: '8',
				armorcapacity: 'FixedValues([1],[2],[3],[4],[5],[6])',
				avail: '10R',
				cost: 'Rating * 100',
				source: 'SR5',
				page: '438',
			};
			const newState = reducer(state, { type: 'MODDING_CAPACITY', parameter: { index: 0, category: 'armors', mod: ruleBreaker, Rating: 8 } });

			expect(newState.armors[0].mods.Breaker.name).to.equal('Breaker');
			expect(newState.armors[0].currentCost).to.equal(2300);
			expect(newState.nuyen).to.equal(4150);
			expect(newState.armors[0].currentCapacity).to.equal(8);

			expect(state.armors[0].mods).to.be.undefined;
			expect(state.armors[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});

		it('should add a mod with a rating and calculate the currentCost based off of the rating', () => {
			const newState = reducer(state, { type: 'MODDING_CAPACITY', parameter: { index: 0, category: 'armors', mod: thermalDamp, Rating: 3 } });

			expect(newState.armors[0].mods['Thermal Damping'].currentCost).to.equal(1500);
			expect(newState.armors[0].mods['Thermal Damping'].currentRating).to.equal(3);
			expect(newState.armors[0].currentCost).to.equal(3000);
			expect(newState.armors[0].currentCapacity).to.equal(3);
			expect(newState.nuyen).to.equal(4850);

			expect(state.armors[0].mods).to.be.undefined;
			expect(state.armors[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});

		it('should calculate the capacity when adding a mod with rating to gear that has been modded', () => {
			const newState = reducer(state, { type: 'MODDING_CAPACITY', parameter: { index: 2, category: 'armors', mod: thermalDamp, Rating: 3 } });

			expect(newState.armors[2].mods['Thermal Damping'].currentCost).to.equal(1500);
			expect(newState.armors[2].mods['Thermal Damping'].currentRating).to.equal(3);
			expect(newState.armors[2].currentCost).to.equal(2500);
			expect(newState.armors[2].currentCapacity).to.equal(5);
			expect(newState.nuyen).to.equal(4850);

			expect(Object.keys(state.armors[2].mods).length).to.equal(1);
			expect(state.armors[2].currentCost).to.equal(1000);
			expect(state.nuyen).to.equal(3350);
		});

		it('should check gear.capacity(not armorcapacity) to add mod', () => {
			const newState = reducer(state, { type: 'MODDING_CAPACITY', parameter: { index: 0, category: 'cyberlimbs', mod: enhanceStr, Rating: 4 } });

			expect(newState.cyberlimbs[0].mods).to.be.undefined;
			expect(newState.cyberlimbs[0].currentCost).to.be.undefined;
			expect(newState.nuyen).to.equal(3350);

			expect(state.cyberlimbs[0].mods).to.be.undefined;
			expect(state.cyberlimbs[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});

		it('should allow for negative rated mods which lowers current capacity', () => {
			const newState = reducer(state, { type: 'MODDING_CAPACITY', parameter: { index: 1, category: 'cyberlimbs', mod: bulkMod, Rating: 3 } });

			expect(Object.keys(newState.cyberlimbs[1].mods)).to.have.lengthOf(2);

			expect(newState.cyberlimbs[1].mods['Bulk Modification'].currentCost).to.equal(1500);
			expect(newState.cyberlimbs[1].mods['Bulk Modification'].currentRating).to.equal(3);
			expect(newState.cyberlimbs[1].currentCost).to.equal(29500);
			expect(newState.cyberlimbs[1].currentCapacity).to.equal(-1);
			expect(newState.nuyen).to.equal(4850);

			expect(Object.keys(state.cyberlimbs[1].mods)).to.have.lengthOf(1);
			expect(state.cyberlimbs[1].currentCapacity).to.equal(2);
			expect(state.cyberlimbs[1].currentCost).to.equal(28000);
			expect(state.nuyen).to.equal(3350);
		});

		it('should have rating effect cost if capacity does not contain rating', () => {
			const fibHair = {
				id: 'b7ec08aa-a328-46a0-9b41-4c9a4bfc13b2',
				name: 'Fiberoptic Hair',
				category: 'Cosmetic Enhancement',
				ess: '0.1',
				capacity: '[1]',
				avail: '0',
				cost: 'Rating * 100',
				source: 'CF',
				page: '73',
				rating: '10',
			};

			const newState = reducer(state, { type: 'MODDING_CAPACITY', parameter: { index: 0, category: 'cyberlimbs', mod: fibHair, Rating: 10 } });

			expect(newState.cyberlimbs[0].mods['Fiberoptic Hair'].currentCost).to.equal(1000);
			expect(newState.cyberlimbs[0].mods['Fiberoptic Hair'].currentRating).to.equal(10);
			expect(newState.cyberlimbs[0].currentCost).to.equal(16000);
			expect(newState.cyberlimbs[0].currentCapacity).to.equal(1);
			expect(newState.nuyen).to.equal(4350);

			expect(state.cyberlimbs[0].mods).to.be.undefined;
			expect(state.cyberlimbs[0].currentCost).to.be.undefined;
			expect(state.cyberlimbs[0].currentCapacity).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});

		it('should take multiplicative capacity based off rating', () => {
			const telescope = {
				id: 'a40cbc72-7dc6-4f8f-a9ff-e5e3f471b895',
				name: 'Telescoping Limb',
				category: 'Cyberlimb Enhancement',
				ess: '0',
				capacity: '[Rating * 3]',
				avail: 'Rating * 4',
				cost: 'Rating * 1000',
				source: 'CF',
				page: '90',
				bonus: {
				},
				rating: '2',
			};

			const newState = reducer(state, { type: 'MODDING_CAPACITY', parameter: { index: 0, category: 'cyberlimbs', mod: telescope, Rating: 1 } });

			expect(newState.cyberlimbs[0].mods['Telescoping Limb'].currentCost).to.equal(1000);
			expect(newState.cyberlimbs[0].mods['Telescoping Limb'].currentRating).to.equal(1);
			expect(newState.cyberlimbs[0].currentCost).to.equal(16000);
			expect(newState.cyberlimbs[0].currentCapacity).to.equal(3);
			expect(newState.nuyen).to.equal(4350);

			expect(state.cyberlimbs[0].mods).to.be.undefined;
			expect(state.cyberlimbs[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});
	});

	describe('DEMODDING_CAPACITY', () => {
		it('should remove a mod and lower capacity', () => {
			const newState = reducer(state, { type: 'DEMODDING_CAPACITY', parameter: { index: 1, category: 'armors', demodName: 'Faraday Pocket' } });

			expect(newState.armors[1].mods['Faraday Pocket']).to.be.undefined;
			expect(newState.armors[1].currentCapacity).to.equal(5);
			expect(newState.armors[1].currentCost).to.equal(1700);
			expect(newState.nuyen).to.equal(3300);

			expect(state.armors[1].mods['Faraday Pocket']).to.not.be.undefined;
			expect(state.armors[1].currentCapacity).to.equal(6);
			expect(state.armors[1].currentCost).to.equal(1750);
			expect(state.nuyen).to.equal(3350);
		});

		it('should remove a mod and lower capacity by rating', () => {
			const newState = reducer(state, { type: 'DEMODDING_CAPACITY', parameter: { index: 1, category: 'armors', demodName: 'Nonconductivity' } });

			expect(newState.armors[1].mods.Nonconductivity).to.be.undefined;
			expect(newState.armors[1].currentCapacity).to.equal(1);
			expect(newState.armors[1].currentCost).to.equal(500);
			expect(newState.nuyen).to.equal(2100);

			expect(state.armors[1].mods.Nonconductivity).to.not.be.undefined;
			expect(state.armors[1].currentCapacity).to.equal(6);
			expect(state.armors[1].currentCost).to.equal(1750);
			expect(state.nuyen).to.equal(3350);
		});

		it('should remove mods without armorcapacity', () => {
			const newState = reducer(state, { type: 'DEMODDING_CAPACITY', parameter: { index: 1, category: 'cyberlimbs', demodName: 'Enhanced Strength' } });

			expect(newState.cyberlimbs[1].mods['Enhanced Strength']).to.be.undefined;
			expect(newState.cyberlimbs[1].currentCapacity).to.equal(0);
			expect(newState.cyberlimbs[1].currentCost).to.equal(15000);
			expect(newState.nuyen).to.equal(-9650);

			expect(state.cyberlimbs[1].mods['Enhanced Strength']).to.not.be.undefined;
			expect(state.cyberlimbs[1].currentCapacity).to.equal(2);
			expect(state.cyberlimbs[1].currentCost).to.equal(28000);
			expect(state.nuyen).to.equal(3350);
		});

		it('should raise capacity if the capacity is negative', () => {
			const newState = reducer(state, { type: 'DEMODDING_CAPACITY', parameter: { index: 2, category: 'cyberlimbs', demodName: 'Bulk Modification' } });

			expect(newState.cyberlimbs[2].mods['Bulk Modification']).to.be.undefined;
			expect(newState.cyberlimbs[2].currentCapacity).to.equal(1);
			expect(newState.cyberlimbs[2].currentCost).to.equal(15300);
			expect(newState.nuyen).to.equal(-150);

			expect(state.cyberlimbs[2].mods['Bulk Modification']).to.not.be.undefined;
			expect(state.cyberlimbs[2].currentCapacity).to.equal(-5);
			expect(state.cyberlimbs[2].currentCost).to.equal(18800);
			expect(state.nuyen).to.equal(3350);
		});

		it('should only remove static capacity and not base it off rating', () => {
			const newState = reducer(state, { type: 'DEMODDING_CAPACITY', parameter: { index: 2, category: 'cyberlimbs', demodName: 'Fiberoptic Hair' } });

			expect(newState.cyberlimbs[2].mods['Fiberoptic Hair']).to.be.undefined;
			expect(newState.cyberlimbs[2].currentCapacity).to.equal(-6);
			expect(newState.cyberlimbs[2].currentCost).to.equal(18500);
			expect(newState.nuyen).to.equal(3050);

			expect(state.cyberlimbs[2].mods['Fiberoptic Hair']).to.not.be.undefined;
			expect(state.cyberlimbs[2].currentCapacity).to.equal(-5);
			expect(state.cyberlimbs[2].currentCost).to.equal(18800);
			expect(state.nuyen).to.equal(3350);
		});
	});

	describe('MODDING_VEHICLE', () => {
		const accel = {
				id: '6ac249ee-84c0-498f-9377-149ccbc2f959',
				name: 'Acceleration Enhancement',
				page: '154',
				source: 'R5',
				avail: '6',
				category: 'Powertrain',
				cost: 'FixedValues(Acceleration * 10000,Acceleration * 25000)',
				rating: '2',
				slots: 'FixedValues(4,8)',
				bonus: {
					accel: '+Rating',
					offroadaccel: '+Rating',
				},
				currentCost: 10000,
				currentRating: 1,
				currentSlot: 4,
			},
			handling = {
				id: '956a20f7-64f3-4160-88a0-d6d6b29b0bd1',
				name: 'Handling Enhancement',
				page: '154',
				source: 'R5',
				avail: 'FixedValues(6,8,10)',
				category: 'Powertrain',
				cost: 'FixedValues(Handling*2000,Handling*5000,Handling*12000)',
				rating: '3',
				slots: 'FixedValues(4,10,18)',
				bonus: {
					handling: '+Rating',
					offroadhandling: '+Rating',
				},
				currentRating: 2,
				currentCost: 20000,
				currentSlot: 10,
				currentAvail: 8,
			},
			offRoad = {
				id: '5acc99df-ffaf-4c43-93bc-07b552fc4c1c',
				name: 'Off-Road Suspension',
				page: '155',
				source: 'R5',
				avail: '4',
				category: 'Powertrain',
				cost: 'Vehicle Cost * 0.25',
				rating: '0',
				slots: '2',
				bonus: {
					handling: '-1',
					offroadhandling: '+1',
				},
				currentCost: 2500,
			};

		it('should add a mod on a vehicle and add the slot to the rating', () => {
			const newState = reducer(state, { type: 'MODDING_VEHICLE', parameter: { index: 0, category: 'vehicles', mod: accel } });

			expect(newState.vehicles[0].mods.Powertrain['Acceleration Enhancement']).to.equal(accel);
			expect(newState.vehicles[0].currentCost).to.equal(13000);
			expect(newState.nuyen).to.equal(13350);
			expect(newState.vehicles[0].mods.Powertrain.currentSlot).to.equal(4);

			expect(state.vehicles[0].mods).to.deep.equal({ name: 'Improved Economy' });
			expect(state.vehicles[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});

		it('should not accept a mod if there are not enough slots availible', () => {
			const newState = reducer(state, { type: 'MODDING_VEHICLE', parameter: { index: 0, category: 'vehicles', mod: handling } });

			expect(newState).to.equal(state);
		});

		it('should add to the mod\'s currentSlot', () => {
			const newState = reducer(state, { type: 'MODDING_VEHICLE', parameter: { index: 1, category: 'vehicles', mod: offRoad } });

			expect(newState.vehicles[1].mods.Powertrain['Off-Road Suspension']).to.equal(offRoad);
			expect(newState.vehicles[1].currentCost).to.equal(31000);
			expect(newState.nuyen).to.equal(5850);
			expect(newState.vehicles[1].mods.Powertrain.currentSlot).to.equal(7);

			expect(state.vehicles[1].currentCost).to.equal(28500);
			expect(state.nuyen).to.equal(3350);
		});

		it('should add mods if the vehicle has no mods', () => {
			const newState = reducer(state, { type: 'MODDING_VEHICLE', parameter: { index: 2, category: 'vehicles', mod: offRoad } });

			expect(newState.vehicles[2].mods.Powertrain['Off-Road Suspension']).to.equal(offRoad);
			expect(newState.vehicles[2].currentCost).to.equal(16500);
			expect(newState.nuyen).to.equal(5850);
			expect(newState.vehicles[2].mods.Powertrain.currentSlot).to.equal(2);

			expect(state.vehicles[2].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});
	});

	describe('DEMODDING_VEHICLE', () => {
		it('should remove a mod from a vehicle', () => {
			const newState = reducer(state, { type: 'DEMODDING_VEHICLE', parameter: { index: 1, category: 'vehicles', demodName: 'Armor (Concealed)', type: 'Protection' } });

			expect(newState.vehicles[1].mods.Protection['Armor (Concealed)']).to.be.undefined;
			expect(Object.keys(newState.vehicles[1].mods.Protection).length).to.equal(3);
			expect(newState.vehicles[1].currentCost).to.equal(25500);
			expect(newState.nuyen).to.equal(350);
			expect(newState.vehicles[1].mods.Protection.currentSlot).to.equal(3);

			expect(newState.vehicles[0]).to.be.equal(state.vehicles[0]);
			expect(newState.vehicles[2]).to.be.equal(state.vehicles[2]);

			expect(Object.keys(state.vehicles[1].mods.Protection).length).to.equal(4);
			expect(state.vehicles[1].currentCost).to.equal(28500);
			expect(state.nuyen).to.equal(3350);
		});

		it('should remove a mod without a currentSlot', () => {
			const newState = reducer(state, { type: 'DEMODDING_VEHICLE', parameter: { index: 1, category: 'vehicles', demodName: 'Passenger Protection System', type: 'Protection' } });

			expect(newState.vehicles[1].mods.Protection['Passenger Protection System']).to.be.undefined;
			expect(Object.keys(newState.vehicles[1].mods.Protection).length).to.equal(3);
			expect(newState.vehicles[1].currentCost).to.equal(22500);
			expect(newState.nuyen).to.equal(-2650);
			expect(newState.vehicles[1].mods.Protection.currentSlot).to.equal(4);

			expect(Object.keys(state.vehicles[1].mods.Protection).length).to.equal(4);
			expect(state.vehicles[1].currentCost).to.equal(28500);
			expect(state.nuyen).to.equal(3350);
		});
	});

	describe('MODDING_DRONE', () => {
		const geckoGrip = {
				id: '1a626185-b826-466c-aa73-32c02bae4bef',
				name: 'Gecko Grips (Drone)',
				page: '125',
				source: 'R5',
				avail: '4R',
				category: 'All',
				cost: 'Body * 150',
				rating: '0',
				slots: '1',
				required: {
					vehicledetails: {
						category: {
							'-operation': 'contains',
							'#text': 'Drones',
						},
					},
				},
				currentCost: 600,
				currentSlot: 1,
			},
			droneAcc = {
				id: '426b1bb7-31ec-4656-aa89-332d6877e590',
				name: 'Acceleration (Drone)',
				page: '123',
				source: 'R5',
				avail: 'Rating * 4',
				category: 'Acceleration',
				cost: 'Body * Rating * 200',
				rating: '99',
				slots: 'Rating',
				bonus: {
					accel: 'Rating',
					offroadaccel: 'Rating',
				},
				minrating: 'Acceleration + 1',
				required: {
					vehicledetails: {
						category: {
							'-operation': 'contains',
							'#text': 'Drones',
						},
					},
				},
				currentCost: 1600,
				currentSlot: 0,
				currentRating: 2,
			},
			droneSpeed = {
				id: '4ee2420c-1fad-415a-83e3-7f9e72b5df11',
				name: 'Speed (Drone)',
				page: '123',
				source: 'R5',
				avail: 'Rating * 2',
				category: 'Speed',
				cost: 'Body * Rating * 400',
				rating: '99',
				slots: 'Rating',
				bonus: {
					offroadspeed: 'Rating',
					speed: 'Rating',
				},
				minrating: 'Speed + 1',
				required: {
					vehicledetails: {
						category: {
							'-operation': 'contains',
							'#text': 'Drones',
						},
					},
				},
				currentCost: 8000,
				currentSlot: 1,
				currentRating: 5,
			},
			droneHandling = {
				id: '17da9812-5264-4ac6-a31c-3e8b7ddb6212',
				name: 'Handling (Drone)',
				page: '123',
				source: 'R5',
				avail: 'Rating * 2',
				category: 'Handling',
				cost: 'Body * Rating * 200',
				rating: '99',
				slots: 'Rating',
				bonus: {
					handling: 'Rating',
					offroadhandling: 'Rating',
				},
				minrating: 'Handling + 1',
				required: {
					vehicledetails: {
						category: {
							'-operation': 'contains',
							'#text': 'Drones',
						},
					},
				},
				currentCost: 4800,
				currentSlot: 2,
				currentRating: 6,
			},
			droneArmor = {
				id: 'dfa7cdcd-5d0e-4c9c-9f0b-90bf29ac5aff',
				name: 'Armor (Drone)',
				page: '123',
				source: 'R5',
				avail: 'Range(6[],12[R],MaxRating[F])',
				category: 'Armor',
				cost: 'Rating * Body * 200',
				rating: '99',
				slots: 'Rating',
				bonus: {
					armor: 'Rating',
				},
				minrating: 'Armor + 1',
				required: {
					vehicledetails: {
						category: {
							'-operation': 'contains',
							'#text': 'Drones',
						},
					},
				},
				currentCost: 6400,
				currentSlot: 1,
				currentRating: 8,
			};

		it('should add a mod', () => {
			const newState = reducer(state, { type: 'MODDING_DRONE', parameter: { index: 0, category: 'Drones', mod: geckoGrip } });

			expect(newState.Drones[0].mods['Gecko Grips (Drone)']).to.equal(geckoGrip);
			expect(newState.Drones[0].currentCost).to.equal(5600);
			expect(newState.nuyen).to.equal(3950);
			expect(newState.Drones[0].currentSlot).to.equal(1);

			expect(state.Drones[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});

		describe('modding a drones stat', () => {
			it('should raise accel', () => {
				const newState = reducer(state, { type: 'MODDING_DRONE', parameter: { index: 0, category: 'Drones', mod: droneAcc } });

				expect(newState.Drones[0].mods['Acceleration (Drone)']).to.equal(droneAcc);
				expect(newState.Drones[0].currentCost).to.equal(6600);
				expect(newState.nuyen).to.equal(4950);
				expect(newState.Drones[0].currentSlot).to.equal(0);
				expect(newState.Drones[0].currentAccel).to.equal(2);

				expect(state.Drones[0].currentCost).to.be.undefined;
				expect(state.nuyen).to.equal(3350);
			});

			it('should raise speed', () => {
				const newState = reducer(state, { type: 'MODDING_DRONE', parameter: { index: 0, category: 'Drones', mod: droneSpeed } });

				expect(newState.Drones[0].mods['Speed (Drone)']).to.equal(droneSpeed);
				expect(newState.Drones[0].currentCost).to.equal(13000);
				expect(newState.nuyen).to.equal(11350);
				expect(newState.Drones[0].currentSlot).to.equal(1);
				expect(newState.Drones[0].currentSpeed).to.equal(5);

				expect(state.Drones[0].currentCost).to.be.undefined;
				expect(state.nuyen).to.equal(3350);
			});

			it('should raise handling', () => {
				const newState = reducer(state, { type: 'MODDING_DRONE', parameter: { index: 0, category: 'Drones', mod: droneHandling } });

				expect(newState.Drones[0].mods['Handling (Drone)']).to.equal(droneHandling);
				expect(newState.Drones[0].currentCost).to.equal(9800);
				expect(newState.nuyen).to.equal(8150);
				expect(newState.Drones[0].currentSlot).to.equal(2);
				expect(newState.Drones[0].currentHandling).to.equal(6);

				expect(state.Drones[0].currentCost).to.be.undefined;
				expect(state.nuyen).to.equal(3350);
			});

			it('should raise armor', () => {
				const newState = reducer(state, { type: 'MODDING_DRONE', parameter: { index: 0, category: 'Drones', mod: droneArmor } });

				expect(newState.Drones[0].mods['Armor (Drone)']).to.equal(droneArmor);
				expect(newState.Drones[0].currentCost).to.equal(11400);
				expect(newState.nuyen).to.equal(9750);
				expect(newState.Drones[0].currentSlot).to.equal(1);
				expect(newState.Drones[0].currentArmor).to.equal(8);

				expect(state.Drones[0].currentCost).to.be.undefined;
				expect(state.nuyen).to.equal(3350);
			});
		});
	});

	describe('DEMODDING_DRONE', () => {});
});
