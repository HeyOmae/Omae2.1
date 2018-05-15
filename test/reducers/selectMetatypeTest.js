/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
const reducer = require('../../src/reducers/selectMetatype');

describe('selectMetatype', () => {
	const state = { typeName: 'human', priority: 'A' };

	it('should not change the passed state', (done) => {
		const newState = reducer(state, { type: 'INVALID' });

		done();
		expect(newState).to.equal(state);
	});

	it('should make a new state that changes metatype', () => {
		const newState = reducer(state, { type: 'SELECT_METATYPE', parameter: { typeName: 'troll', priority: 'A' } });

		expect(newState).to.eql({ typeName: 'troll', priority: 'A' });
		expect(state).to.eql({ typeName: 'human', priority: 'A' });
	});

	it('should make a new state that changes metatype and priority', () => {
		const newState = reducer(state, { type: 'SELECT_METATYPE', parameter: { typeName: 'troll', priority: 'B' } });

		expect(newState).to.eql({ typeName: 'troll', priority: 'B' });
		expect(state).to.eql({ typeName: 'human', priority: 'A' });
	});
});
