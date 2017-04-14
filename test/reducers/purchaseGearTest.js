var reducer = require('../../src/reducers/gear/purchaseGear'),
	state;

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
				page: '438'
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
						'Under'
					]
				},
				accessories: {
					accessory: {
						name: 'Smartgun System, Internal'
					}
				},
				source: 'SR5',
				page: '428'
			}],
			nuyen: 3350
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
		page: '438'
	};

	it('should not change the passed state', (done) => {
		reducer(state, {type: 'INVALID'});

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
				page: '449'
			},
			newState = reducer(state, {type: 'PURCHASE', parameter: {gear: gear, category: 'gears', Rating: 3} });
			expect(newState.gears[0]).to.equal(gear);
			expect(newState.nuyen).to.equal(3550);
			expect(state.gears).to.be.undefined;
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
				page: '441'
			},
				newState = reducer(state, {type: 'PURCHASE', parameter: {gear: gear, category: 'gears', Rating: 1} });


			expect(newState.gears[0].currentRating).to.equal(1);
			expect(newState.gears[0].currentCost).to.equal(50);

			expect(newState.gears[0]).to.deep.equal({
				...gear,
				currentRating: 1,
				currentCost: 50
			});
			expect(newState.nuyen).to.equal(3400);
			expect(state.gears).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});

		it('should add a gear to its category if the key already exists', () => {
			const newState = reducer(state, {type: 'PURCHASE', parameter: {gear: metalink, category: 'commlinks'}});

			expect(newState.commlinks.length).to.equal(2);
			expect(newState.commlinks[1]).to.equal(metalink);
			expect(newState.nuyen).to.equal(3450);
			expect(state.commlinks.length).to.equal(1);
			expect(state.nuyen).to.equal(3350);
		});
	});

	describe('SELL', ()=>{
		it('should remove a piece of gear from the gear array', () => {
			state.commlinks.push(metalink);
			state.nuyen += 100;
			const newState = reducer(state, {type: 'SELL', parameter: {index: 0, category: 'commlinks'}});

			expect(newState.commlinks.length).to.equal(1);
			expect(newState.nuyen).to.equal(2750);
			expect(state.commlinks.length).to.equal(2);
			expect(state.nuyen).to.equal(3450);
		});

		it('should remove a key if the gear array becomes empty', () => {
			const newState = reducer(state, {type: 'SELL', parameter: {index: 0, category: 'commlinks'}});

			expect(newState.commlinks).to.be.undefined;
			expect(newState.nuyen).to.equal(2650);
			expect(state.commlinks.length).to.equal(1);
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
			page: '52'
		};

		it('should add a mod key to a weapon and populate it with the mod', () => {
			const newState = reducer(state, {type: 'WEAPON_MODDING', parameter: {index: 0, category: 'weapons', slot: 'stock', mod: stockMod}});

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
				page: '182'
			};
			const newState = reducer(state, {type: 'WEAPON_MODDING', parameter: {index: 0, category: 'weapons', slot: 'stock', mod: stockMod}});
			expect(newState.weapons[0].currentCost).to.equal(2900);
			expect(newState.nuyen).to.equal(3600);
			expect(state.weapons[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);

			const newState2 = reducer(newState, {type: 'WEAPON_MODDING', parameter: {index: 0, category: 'weapons', slot: 'stock', mod: stockMod2}});
			expect(newState2.weapons[0].mods.stock).to.equal(stockMod2);
			expect(newState2.weapons[0].currentCost).to.equal(2670);
			expect(newState2.nuyen).to.equal(3370);
			expect(newState.weapons[0].currentCost).to.equal(2900);
			expect(newState.nuyen).to.equal(3600);
			expect(state.weapons[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);
		});

		it('should do reset remove the slot if there is no mod given', () => {
			const newState = reducer(state, {type: 'WEAPON_MODDING', parameter: {index: 0, category: 'weapons', slot: 'stock', mod: stockMod}});
			expect(newState.weapons[0].currentCost).to.equal(2900);
			expect(newState.nuyen).to.equal(3600);
			expect(state.weapons[0].currentCost).to.be.undefined;
			expect(state.nuyen).to.equal(3350);

			const newState2 = reducer(newState, {type: 'WEAPON_MODDING', parameter: {index: 0, category: 'weapons', slot: 'stock', mod: ''}});

			expect(newState2.weapons[0].mods.stock).to.be.undefined;
			expect(newState2.nuyen).to.equal(3350);
			expect(newState.weapons[0].currentCost).to.equal(2900);
			expect(newState.nuyen).to.equal(3600);
		});

		it('should return state if no mod is passed in to an empty mod slot', () => {
			const newState = reducer(state, {type: 'WEAPON_MODDING', parameter: {index: 0, category: 'weapons', slot: 'stock', mod: ''}});

			expect(newState).to.equal(state);
		})
	});

	describe('MODDING_MULTI', () => {
		it('should add an array of mods to slotless', () => {
			const arrayOfMods = [
				{
					id: 'f2eee4ed-d0cb-4163-84d9-91e537cd13d9',
					name: 'Trigger Removal',
					rating: '0',
					accuracy: '1',
					avail: '2',
					cost: '50',
					source: 'HT',
					page: '182'
				}, {
					id: '85b01b5c-c788-4b43-8190-9e0c18391436',
					name: 'Personalized Grip',
					rating: '0',
					accuracy: '1',
					avail: '2',
					cost: '100',
					source: 'HT',
					page: '182'
				}
			];

			const newState = reducer(state, {type: 'MODDING_MULTI', parameter: {index: 0, category: 'weapons', slot: 'slotless', mods: arrayOfMods}});

			expect(newState.weapons[0].mods.slotless).to.equal(arrayOfMods);
			expect(state.weapons[0].mods.slotless).to.be.undefined;
		});
	});
});
