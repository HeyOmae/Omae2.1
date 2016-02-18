/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
var reducer = require('../../src/reducers/settingSkills');

describe('settingSkills', () => {

	const state = Object.freeze({
		longarms: {rating: 1},
		palming: {rating: 2},
		skillPointsSpent: 3,
		GroupPointSpent: 0
	});

	it('should not change the passed state', (done) => {
		reducer(state, {type: 'INVALID'});

		done();
	});

	it('should add a rating 1 skill to state if not defined', () => {
		let newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: 'pistol'});

		expect(newState.pistol.rating).to.equal(1);
		expect(newState.skillPointsSpent).to.equal(4);
	});

	it('should increment a skill that\'s already defined in the state', () => {
		let newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: 'longarms'});

		expect(newState.longarms.rating).to.equal(2);
		expect(newState.skillPointsSpent).to.equal(4);
	});

	it('should decrement a skill that\'s already defined in the state', () => {
		let newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: 'palming'});

		expect(newState.palming.rating).to.equal(1);
		expect(newState.skillPointsSpent).to.equal(2);
	});

	it('should delete a skill that\'s decremented to 0 in the state', () => {
		let newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: 'longarms'});

		expect(newState.longarms).to.be.undefined;
		expect(newState.skillPointsSpent).to.equal(2);
	});
});
