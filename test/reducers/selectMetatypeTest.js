/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
var reducer = require('../../src/reducers/selectMetatype');

describe('selectMetatype', () => {
	const state = 'human';

	it('should not change the passed state', (done) => {
		let newState = reducer(state, {type: 'INVALID'});

		done();
		expect(newState).to.equal(state);
	});

	it('should make a new state that changes metatype', () => {
		let newState = reducer(state, {type: 'SET_METATYPE', parameter: {selected: 'troll'} });

		expect(newState).to.equal('troll');
	});
});
