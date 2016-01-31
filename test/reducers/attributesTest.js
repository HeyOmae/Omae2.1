/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
var reducer = require('../../src/reducers/attributes');

describe('attributes', () => {
	const state = {
		bod: 1,
		agi: 3,
		rea: 1,
		str: 3,
		wil: 1,
		log: 6,
		int: 1,
		cha: 6
	};

	it('should not change the passed state', (done) => {
		reducer(state, {type: 'INVALID'});

		done();
	});

	describe('INCREMENT_ATTRIBUTE', () => {
		it('should make a new state with the attribute increased by 1', () => {
			const newState = reducer(state, {type: 'INCREMENT_ATTRIBUTE', parameter: {attribute: 'bod', min: 1, max: 6, maxCap: false}});

			expect(newState.bod).to.equal(2);
		});

		it('should set the new state attribute to the minimum if too low', () => {
			const minimum = 3;
			const newState = reducer(state, {type: 'INCREMENT_ATTRIBUTE', parameter: {attribute: 'bod', min: minimum, max: 6, maxCap: false}});

			expect(newState.bod).to.equal(minimum);
		})

		it('should not let an attribute be higher then the max', () => {
			const maximum = 6;
			const newState = reducer(state, {type: 'INCREMENT_ATTRIBUTE', parameter: {attribute: 'cha', min: 1, max: maximum, maxCap: false}});

			expect(newState.cha).to.equal(maximum);
		})

		it('should low the max by one and not allow the attribute to be higher then max if another attirbute is already maxed', () => {
			const maximum = 7;
			const newState = reducer(state, {type: 'INCREMENT_ATTRIBUTE', parameter: {attribute: 'cha', min: 1, max: maximum, maxCap: true}});

			expect(newState.cha).to.equal(maximum - 1);
		})
	});

	describe('DECREMENT_ATTRIBUTE', () => {
		it('should make a new state with the attribute decreased by 1', () => {
			const newState = reducer(state, {type: 'DECREMENT_ATTRIBUTE', parameter: {attribute: 'agi', min: 1, max: 6, maxCap: false}});

			expect(newState.agi).to.equal(2);
		});

		it('should set the new state attribute to the maximum if too high', () => {
			const maximum = 4;
			const newState = reducer(state, {type: 'DECREMENT_ATTRIBUTE', parameter: {attribute: 'log', min: 1, max: maximum, maxCap: false}});

			expect(newState.log).to.equal(maximum);
		})

		it('should not let an attribute be lower then the minimum', () => {
			const minimum = 3;
			const newState = reducer(state, {type: 'DECREMENT_ATTRIBUTE', parameter: {attribute: 'str', min: minimum, max: 8, maxCap: false}});

			expect(newState.str).to.equal(minimum);
		})
	});

});
