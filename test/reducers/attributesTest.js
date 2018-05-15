/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
const reducer = require('../../src/reducers/attributes');

describe('attributes', () => {
	const state = {
		bod: 1,
		agi: 3,
		rea: 1,
		str: 0,
		wil: 1,
		log: 6,
		int: 1,
		cha: 5,
		edg: 1,
		ess: 3,
		augmented: {
			agi: 1,
			rea: 4,
		},
		special: 0,
		baseSpent: 1,
		specialSpent: 1,
		conditionBonus: {},
	};

	it('should not change the passed state', (done) => {
		reducer(state, { type: 'INVALID' });

		done();
	});

	describe('INCREMENT_ATTRIBUTE', () => {
		it('should make a new state with the attribute increased by 1 and increase spent', () => {
			const newState = reducer(state, { type: 'INCREMENT_ATTRIBUTE', parameter: { attribute: 'bod', max: 5, maxCap: false, spend: 'baseSpent' } });

			expect(newState.bod).to.equal(2);
			expect(newState.baseSpent).to.equal(2);
		});

		it('should not let an attribute be higher then the max and return state', () => {
			const maximum = 5;
			const newState = reducer(state, { type: 'INCREMENT_ATTRIBUTE', parameter: { attribute: 'cha', max: maximum, maxCap: false, spend: 'baseSpent' } });

			expect(newState).to.equal(state);
		});

		it('should lower the max by one and return state if the attibute can not be incremented', () => {
			const maximum = 6;
			const newState = reducer(state, { type: 'INCREMENT_ATTRIBUTE', parameter: { attribute: 'cha', min: 1, max: maximum, maxCap: true, spend: 'baseSpent' } });

			expect(newState).to.equal(state);
		});

		it('should increase specialSpent when increasing special attibutes, like edge', () => {
			const newState = reducer(state, { type: 'INCREMENT_ATTRIBUTE', parameter: { attribute: 'edg', max: 5, maxCap: false, spend: 'specialSpent' } });

			expect(newState.edg).to.equal(2);
			expect(newState.specialSpent).to.equal(2);
		});
	});

	describe('DECREMENT_ATTRIBUTE', () => {
		it('should make a new state with the attribute decreased by 1 and decrease the spent points', () => {
			const newState = reducer(state, { type: 'DECREMENT_ATTRIBUTE', parameter: { attribute: 'agi', max: 6, maxCap: false, spend: 'baseSpent' } });

			expect(newState.agi).to.equal(2);
			expect(newState.baseSpent).to.equal(0);
		});

		it('should return state if attribute is lowered before 0', () => {
			const newState = reducer(state, { type: 'DECREMENT_ATTRIBUTE', parameter: { attribute: 'str', max: 8, maxCap: false, spend: 'baseSpent' } });

			expect(newState).to.equal(state);
		});

		it('should decrease specialSpent when decreasing special attibutes, like edge', () => {
			const newState = reducer(state, { type: 'DECREMENT_ATTRIBUTE', parameter: { attribute: 'edg', max: 5, maxCap: false, spend: 'specialSpent' } });

			expect(newState.edg).to.equal(0);
			expect(newState.specialSpent).to.equal(0);
		});
	});

	describe('INCREMENT_AUGMENTED', () => {
		it('should create a attribute in the augmented object with a value of 1 if not already set', () => {
			const newState = reducer(state, { type: 'INCREMENT_AUGMENTED', parameter: { attribute: 'bod' } });

			expect(newState.augmented.bod).to.equal(1);
			expect(state.augmented.bod).to.equal(undefined);
		});

		it('should increment the augmented attribute if its below 4', () => {
			const newState = reducer(state, { type: 'INCREMENT_AUGMENTED', parameter: { attribute: 'agi' } });

			expect(newState.augmented.agi).to.equal(2);
			expect(state.augmented.agi).to.equal(1);
		});

		it('should return state if the attibute is rating 4', () => {
			const newState = reducer(state, { type: 'INCREMENT_AUGMENTED', parameter: { attribute: 'rea' } });

			expect(newState).to.equal(state);
		});
	});

	describe('DECREMENT_AUGMENTED', () => {
		it('should return state if the augmented attibute does not exist', () => {
			const newState = reducer(state, { type: 'DECREMENT_AUGMENTED', parameter: { attribute: 'bod' } });

			expect(newState).to.equal(state);
		});

		it('should remove an augmented attribute if its reduced to 0', () => {
			const newState = reducer(state, { type: 'DECREMENT_AUGMENTED', parameter: { attribute: 'agi' } });

			expect(newState.augmented.agi).to.equal(undefined);
			expect(state.augmented.agi).to.equal(1);
		});

		it('should decriment an augmented attirbute', () => {
			const newState = reducer(state, { type: 'DECREMENT_AUGMENTED', parameter: { attribute: 'rea' } });

			expect(newState.augmented.rea).to.equal(3);
			expect(state.augmented.rea).to.equal(4);
		});

		describe('if decreaseBy is defined', () => {
			it('should remove an attribute if decreaseBy is the same or more then its current rating', () => {
				const newState = reducer(state, { type: 'DECREMENT_AUGMENTED', parameter: { attribute: 'rea', decreaseBy: 4 } });

				expect(newState.augmented.rea).to.equal(undefined);
				expect(state.augmented.rea).to.equal(4);
			});

			it('should decrement an attribute if decreaseBy is set', () => {
				const newState = reducer(state, { type: 'DECREMENT_AUGMENTED', parameter: { attribute: 'rea', decreaseBy: 2 } });

				expect(newState.augmented.rea).to.equal(2);
				expect(state.augmented.rea).to.equal(4);
			});
		});
	});

	const gear = {
		id: 'df01eed6-a019-4198-b88d-4ba8f9aaefdf',
		name: 'Obvious Full Arm',
		category: 'Cyberlimb',
		ess: 1,
		capacity: '15',
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
	};

	describe('PURCHASE', () => {
		it('should lower ess if gear has essence cost', () => {
			const newState = reducer(state, { type: 'PURCHASE', parameter: { gear, category: 'cyberlimb' } });

			expect(newState.ess).to.equal(4);
			// expect(newState.conditionBonus.physical).to.equal(1);
			expect(state.ess).to.equal(3);
			// expect(state.conditionBonus.physical).to.be.undefined;
		});
	});

	describe('SELL', () => {
		it('should return ess if gear has essense cost', () => {
			const newState = reducer(state, { type: 'SELL', parameter: { gear, category: 'cyberlimb', index: 0 } });

			expect(newState.ess).to.equal(2);
			expect(state.ess).to.equal(3);
		});

		it('should return previous State if there is no gear passed in', () => {
			const newState = reducer(state, { type: 'SELL', parameter: { category: 'armors', index: 0 } });

			expect(newState).to.equal(state);
		});
	});
});
