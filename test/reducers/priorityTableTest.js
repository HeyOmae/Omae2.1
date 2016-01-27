var reducer = require('../../src/reducers/priorityTable'),
	expect = require('chai').expect;

describe('priorityTable', () => {

	const state = Object.freeze({
		priority: {
			metatype: 'A',
			attribute: 'B',
			magres: 'C',
			skills: 'D',
			resouces: 'E'
		}
	});

	it('should not change the passed state', (done) => {

		const state = Object.freeze({hello: 'goodbye'});
		let newState = reducer(state, {type: 'INVALID'});
		expect(newState.hello).to.equal('goodbye');
		done();
	});

	it('should make a new state that changes state.priority[category] to a different rating', () => {

		let newState = reducer(state, {type: 'SET_PRIORITY', priority: {rating: 'B', category: 'metatype'}});

		expect(newState.priority.metatype).to.equal('B');
	});
});
