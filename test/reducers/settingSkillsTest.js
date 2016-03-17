/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
var reducer = require('../../src/reducers/settingSkills');

describe('settingSkills', () => {

	let state = {
		active: {
			longarms: {rating: 1, attribute: 'agi'},
			palming: {rating: 2, attribute: 'agi'},
			con: {rating: 6, attribute: 'cha'},
			gymastics: {rating: 4, attribute: 'agi', min: 2}
		},
		groups: {
			acting: {rating: 1}
		},
		skillPointsSpent: 3,
		GroupPointSpent: 0,
		showSkill: ''
	};

	it('should not change the passed state', (done) => {
		reducer(state, {type: 'INVALID'});

		done();
	});

	describe('INCREMENT_SKILL', () => {
		it('should add a rating 1 skill to state if not defined', () => {
			let newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: {name: 'pistol', category: 'active', max: 6, attribute: 'agi' }});

			expect(newState.active.pistol.rating).to.equal(1);
			expect(newState.skillPointsSpent).to.equal(4);
			expect(newState.active.pistol.attribute).to.equal('agi');
		});

		it('should increment a skill that\'s already defined in the state', () => {
			let newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: {name: 'longarms', category: 'active', max: 6, attribute: 'agi' }});

			expect(newState.active.longarms.rating).to.equal(2);
			expect(newState.skillPointsSpent).to.equal(4);
			expect(newState.active.longarms.attribute).to.equal('agi');
		});

		it('should return state if increment a skill higher then the max', () => {
			let newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: {name: 'con', category: 'active', max: 6, attribute: 'cha' }});

			expect(newState).to.equal(state);
			expect(newState.skillPointsSpent).to.equal(3);
		});

		it('should return state if incrementing a skill higher then the max with a higher min', () => {
			let newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: {name: 'gymastics', category: 'active', max: 6, attribute: 'agi' }});

			expect(newState).to.equal(state);
			expect(newState.skillPointsSpent).to.equal(3);
		});
	});

	describe('DECREMENT_SKILL', () => {
		it('should decrement a skill that\'s already defined in the state', () => {
			let newState = reducer(state, {type: 'DECREMENT_SKILL', parameter: {name: 'palming', category: 'active', max: 6, attribute: 'agi' }});

			expect(newState.active.palming.rating).to.equal(1);
			expect(newState.skillPointsSpent).to.equal(2);
		});

		it('should delete a skill that\'s decremented to 0 in the state', () => {
			let newState = reducer(state, {type: 'DECREMENT_SKILL', parameter: {name: 'longarms', category: 'active', max: 6, attribute: 'agi' }});

			expect(newState.active.longarms).to.be.undefined;
			expect(newState.skillPointsSpent).to.equal(2);
			expect(state.active.longarms.rating).to.equal(1);
		});

		it('should return state if attempting to decrement a skill that is not defined', () => {
			let newState = reducer(state, {type: 'DECREMENT_SKILL', parameter: {name: 'pistol', category: 'active', max: 6, attribute: 'agi' }});

			expect(newState).to.equal(state);
			expect(newState.skillPointsSpent).to.equal(3);
		});
	});

	describe('SHOW_SKILL', () => {
		it('should set showSkill to Agility', () => {
			let newState = reducer(state, {type: 'SHOW_SKILL', parameter: {skillToShow: 'Agility' }});

			expect(newState.showSkill).to.equal('Agility');
		});

		it('should set showSkill to an empty string if the same attribute is selected', ()=>{
			const skillShowState = {
				showSkill: 'Agility'
			};

			let newState = reducer(skillShowState, {type: 'SHOW_SKILL', parameter: {skillToShow: 'Agility' }});
			expect(newState.showSkill).to.equal('');
		});

		it('should change the current skill to a new skill', ()=>{
			const skillShowState = {
				showSkill: 'Agility'
			};

			let newState = reducer(skillShowState, {type: 'SHOW_SKILL', parameter: {skillToShow: 'Body' }});
			expect(newState.showSkill).to.equal('Body');
		})
	});

	describe('INCREMENT_SKILLGROUP', () => {

	})

});
