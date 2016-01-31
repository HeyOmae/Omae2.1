/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
var reducer = require('../../src/reducers/priorityTable');

describe('priorityTable', () => {

	const state = Object.freeze({
		metatype: 'A',
		attribute: 'B',
		magres: 'C',
		skills: 'D',
		resouces: 'E'
	});

	it('should not change the passed state', (done) => {
		const state = Object.freeze({hello: 'goodbye'});
		let newState = reducer(state, {type: 'INVALID'});
		expect(newState.hello).to.equal('goodbye');
		done();
	});

	it('should make a new state that changes state[category] to a different rating', () => {

		let newState = reducer(state, {type: 'SET_PRIORITY', parameter: {rating: 'B', category: 'metatype'}});

		expect(newState.metatype).to.equal('B');
	});
});
