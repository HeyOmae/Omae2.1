var reducer = require('../../src/reducers/purchaseGear');

describe('purchaseGear', () => {

	let state = {};

	it('should not change the passed state', (done) => {
		reducer(state, {type: 'INVALID'});

		done();
	});

	describe('PURCHASE', () => {
		it('should add a key for a new category of gear, and add that gear', () => {
			const weapon = {
				'id': '38e9682d-d679-47a4-97a1-7161cba07cd2',
				'name': 'PPSK-4 Collapsible Machine Pistol',
				'category': 'Machine Pistols',
				'type': 'Ranged',
				'spec': 'Semi-Automatics',
				'conceal': '0',
				'accuracy': '5',
				'reach': '0',
				'damage': '6P',
				'ap': '-',
				'mode': 'SA/BF',
				'rc': '0',
				'ammo': '30(c)',
				'avail': '17F',
				'cost': '2800',
				'accessorymounts': {
					'mount': [
						'Stock',
						'Side',
						'Internal',
						'Barrel',
						'Top',
						'Under'
					]
				},
				'accessories': {
					'accessory': [{
						'name': 'Collapsed Frame'
					}, {
						'name': 'Folding Stock'
					}, {
						'name': 'Laser Sight'
					}]
				},
				'source': 'RG',
				'page': '34'
			},
			newState = reducer(state, {type: 'PURCHASE', gear: weapon});
			expect(newState.weapons).to.equal([weapon]);
			expect(state.weapons).to.be.undefined;
		});

		it('should add a gear to its category if the key already exists', () => {
			
		});
	});


});
