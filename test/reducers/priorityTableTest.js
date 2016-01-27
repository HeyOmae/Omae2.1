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

		const state = Object.freeze({});
		reducer(state, {type: 'INVALID'});
		done();
	});

	it('should change state.priority.metatype to rating B', () => {

		let newState = reducer(state, {type: 'SET_PRIORITY', priority: {rating: 'B', category: 'metatype'}});

		expect(newState.priority.metatype).to.equal('B');
	})
});
