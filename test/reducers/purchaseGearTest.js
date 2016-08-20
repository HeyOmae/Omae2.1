var reducer = require('../../src/reducers/gear/purchaseGear'),
	state;

describe('purchaseGear', () => {

	beforeEach(() => {
		state = {
			commlinks: [{
				'id': 'd808ba12-db93-4a7b-85a1-9e9f6229087f',
				'name': 'Sony Emperor',
				'category': 'Commlinks',
				'armorcapacity': '[2]',
				'capacity': '0',
				'rating': '0',
				'devicerating': '2',
				'attack': '0',
				'sleaze': '0',
				'dataprocessing': '2',
				'firewall': '2',
				'avail': '4',
				'cost': '700',
				'source': 'SR5',
				'page': '438'
			}],
			nuyen: 700
		};
	});


	const metalink = {
		'id': '89a0f3c9-5ef6-41cd-981f-4ac690ee2ab3',
		'name': 'Meta Link',
		'category': 'Commlinks',
		'rating': '0',
		'capacity': '0',
		'armorcapacity': '[2]',
		'devicerating': '1',
		'attack': '0',
		'sleaze': '0',
		'dataprocessing': '1',
		'firewall': '1',
		'avail': '2',
		'cost': '100',
		'source': 'SR5',
		'page': '438'
	};

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
			newState = reducer(state, {type: 'PURCHASE', parameter: {gear: weapon, category: 'weapons'} });
			expect(newState.weapons[0]).to.equal(weapon);
			expect(newState.nuyen).to.equal(3500);
			expect(state.weapons).to.be.undefined;
			expect(state.nuyen).to.equal(700);
		});

		it('should add a gear to its category if the key already exists', () => {
			const newState = reducer(state, {type: 'PURCHASE', parameter: {gear: metalink, category: 'commlinks'}});

			expect(newState.commlinks.length).to.equal(2);
			expect(newState.commlinks[1]).to.equal(metalink);
			expect(newState.nuyen).to.equal(800);
			expect(state.commlinks.length).to.equal(1);
			expect(state.nuyen).to.equal(700);
		});
	});

	describe('SELL', ()=>{
		it('should should remove a piece of gear from the gear array', () => {
			state.commlinks.push(metalink);
			state.nuyen += 100;
			const newState = reducer(state, {type: 'SELL', parameter: {index: 0, category: 'commlinks'}});

			expect(newState.commlinks.length).to.equal(1);
			expect(newState.nuyen).to.equal(100);
			expect(state.commlinks.length).to.equal(2);
			expect(state.nuyen).to.equal(800);
		});

		it('should remove a key if the gear array becomes empty', () => {
			const newState = reducer(state, {type: 'SELL', parameter: {index: 0, category: 'commlinks'}});

			expect(newState.commlinks).to.be.undefined;
			expect(newState.nuyen).to.equal(0);
			expect(state.commlinks.length).to.equal(1);
			expect(state.nuyen).to.equal(700);
		});
	});
});
