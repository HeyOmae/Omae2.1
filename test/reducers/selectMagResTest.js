/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
const reducer = require('../../src/reducers/selectMagRes');

describe('selectMagRes', () => {
	const state = 'Mage';

	it('should not change the passed state', (done) => {
		const newState = reducer(state, { type: 'INVALID' });

		done();
		expect(newState).to.equal(state);
	});

	it('should make a new state that changes magicType', () => {
		const newState = reducer(state, { type: 'SELECT_MAGICTYPE', parameter: 'Adept' });

		expect(newState).to.equal('Adept');
		expect(state).to.equal('Mage');
	});
});
