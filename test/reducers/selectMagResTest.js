/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
var reducer = require('../../src/reducers/selectMagRes');

describe('selectMagRes', () => {
	const state = 'Mage'

	it('should not change the passed state', (done) => {
		let newState = reducer(state, {type: 'INVALID'});

		done();
		expect(newState).to.equal(state);
	});

	it('should make a new state that changes magicType', () => {
		let newState = reducer(state, {type: 'SELECT_MAGICTYPE', parameter: 'Adept' });

		expect(newState).to.equal('Adept');
	});
});
