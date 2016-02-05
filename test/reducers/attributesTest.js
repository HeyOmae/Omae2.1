/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
var reducer = require('../../src/reducers/attributes');

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
		edg: 0,
		ess: 6,
		special: 0,
		baseSpent: 1,
		specialSpent: 0
	};

	it('should not change the passed state', (done) => {
		reducer(state, {type: 'INVALID'});

		done();
	});

	describe('INCREMENT_ATTRIBUTE', () => {
		it('should make a new state with the attribute increased by 1 and increase spent', () => {
			const newState = reducer(state, {type: 'INCREMENT_ATTRIBUTE', parameter: {attribute: 'bod', max: 5, maxCap: false, spend: 'baseSpent'}});

			expect(newState.bod).to.equal(2);
			expect(newState.baseSpent).to.equal(2);
		})

		it('should not let an attribute be higher then the max and return state', () => {
			const maximum = 5;
			const newState = reducer(state, {type: 'INCREMENT_ATTRIBUTE', parameter: {attribute: 'cha', max: maximum, maxCap: false, spend: 'baseSpent'}});

			expect(newState).to.equal(state);
		})

		it('should lower the max by one and return state if the attibute can not be incremented', () => {
			const maximum = 6;
			const newState = reducer(state, {type: 'INCREMENT_ATTRIBUTE', parameter: {attribute: 'cha', min: 1, max: maximum, maxCap: true, spend: 'baseSpent'}});

			expect(newState).to.equal(state);
		})

		it('should increase specialSpent when increasing special attibutes, like edge', () => {
			const newState = reducer(state, {type: 'INCREMENT_ATTRIBUTE', parameter: {attribute: 'edg', max: 5, maxCap: false, spend: 'specialSpent'}});

			expect(newState.edg).to.equal(1);
			expect(newState.specialSpent).to.equal(1);
		})
	});

	describe('DECREMENT_ATTRIBUTE', () => {
		it('should make a new state with the attribute decreased by 1 and decrease the spent points', () => {
			const newState = reducer(state, {type: 'DECREMENT_ATTRIBUTE', parameter: {attribute: 'agi', max: 6, maxCap: false, spend: 'baseSpent'}});

			expect(newState.agi).to.equal(2);
			expect(newState.baseSpent).to.equal(0);
		});

		it('should return state if attribute is lowered before 0', () => {
			const newState = reducer(state, {type: 'DECREMENT_ATTRIBUTE', parameter: {attribute: 'str', max: 8, maxCap: false, spend: 'baseSpent'}});

			expect(newState).to.equal(state);
		})
	});

});
