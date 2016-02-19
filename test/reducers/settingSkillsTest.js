/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
var reducer = require('../../src/reducers/settingSkills');

describe('settingSkills', () => {

	const state = {
		active: {
			longarms: {rating: 1},
			palming: {rating: 2},
			con: {rating: 6}
		},
		skillPointsSpent: 3,
		GroupPointSpent: 0
	};

	it('should not change the passed state', (done) => {
		reducer(state, {type: 'INVALID'});

		done();
	});

	it('should add a rating 1 skill to state if not defined', () => {
		let newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: {name: 'pistol', category: 'active', max: 6 }});

		expect(newState.pistol.rating).to.equal(1);
		expect(newState.skillPointsSpent).to.equal(4);
	});

	it('should increment a skill that\'s already defined in the state', () => {
		let newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: {name: 'longarms', category: 'active', max: 6 }});

		expect(newState.longarms.rating).to.equal(2);
		expect(newState.skillPointsSpent).to.equal(4);
	});

	it('should not increment a skill higher then the max', () => {
		let newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: {name: 'con', category: 'active', max: 6 }});

		expect(newState.con.rating).to.equal(6);
		expect(newState.skillPointsSpent).to.equal(3);
	});

	it('should decrement a skill that\'s already defined in the state', () => {
		let newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: {name: 'palming', category: 'active', max: 6 }});

		expect(newState.palming.rating).to.equal(1);
		expect(newState.skillPointsSpent).to.equal(2);
	});

	it('should delete a skill that\'s decremented to 0 in the state', () => {
		let newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: {name: 'longarms', category: 'active', max: 6 }});

		expect(newState.longarms).to.be.undefined;
		expect(newState.skillPointsSpent).to.equal(2);
	});
});
