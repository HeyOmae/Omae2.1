var reducer = require('../../src/reducers/karma');

describe('karma', () => {

	it('should not change the passed state', (done) => {
		const state = Object.freeze({});
		reducer(state, {type: 'INVALID'});

		done();
	});

	let state = 2;

	it('should increase karma', () => {
		const newState = reducer(state, {type: 'KARMA', parameter: {karmaPoints: 5}});

		expect(newState).to.equal(7);
		expect(state).to.equal(2);
	});

	it('should decrease karma', () => {
		const newState = reducer(state, {type: 'KARMA', parameter: {karmaPoints: -5}});

		expect(newState).to.equal(-3);
		expect(state).to.equal(2);
	});

	it('should set karma based off of the selected metatype', () => {
		const newState = reducer(state, {type: 'SELECT_METATYPE', parameter: {karmaOldCost: 2, karmaNewCost: 4}});

		expect(newState).to.equal(0);
		expect(state).to.equal(2);
	});
});
