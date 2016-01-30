var reducer = require('../../src/reducers/selectMetatype'),
	expect = require('chai').expect;;

describe('selectMetatype', () => {

	it('should not change the passed state', (done) => {

		const state = Object.freeze({});
		reducer(state, {type: 'INVALID'});

		done();
	});

	it('should make a new state that changes metatype', () => {
		let newState = reducer(state, {type: 'SET_PRIORITY', priority: {rating: 'B', category: 'metatype'}});

		expect(newState.priority.metatype).to.equal('B');
	});
});
