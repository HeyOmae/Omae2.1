/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
var reducer = require('../../src/reducers/settingSkills');

describe('settingSkills', () => {

	let state = {
		active: {
			longarms: {rating: 1, attribute: 'agi'},
			palming: {rating: 2, attribute: 'agi', spec: 'Pickpocketing'},
			con: {rating: 6, attribute: 'cha', groupRating: 1},
			impersonation: {rating: 0, attribute: 'cha', groupRating: 1},
			performance: {rating: 0, attribute: 'cha', groupRating: 1},
			gymastics: {rating: 0, attribute: 'agi', groupRating: 6},
			running: {rating: 1, attribute: 'str', groupRating: 1},
			cybercombat: {rating: 1, attribute: 'log', groupRating: 3},
			electronicwarfare: {rating: 1, attribute: 'log', groupRating: 3},
			hacking: {rating: 1, attribute: 'log', groupRating: 3}
		},
		groups: {
			acting: {rating: 1},
			cracking: {rating: 3}
		},
		skillPointsSpent: 3,
		groupPointSpent: 1,
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

		it('should return state if incrementing a skill higher then the max with a higher groupRating', () => {
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

		it('should delete a skill that\'s decremented to 0 in the state without a groupRating value', () => {
			let newState = reducer(state, {type: 'DECREMENT_SKILL', parameter: {name: 'longarms', category: 'active', max: 6, attribute: 'agi' }});

			expect(newState.active.longarms).to.be.undefined;
			expect(newState.skillPointsSpent).to.equal(2);
			expect(state.active.longarms.rating).to.equal(1);
		});

		it('should not delete a skill that is reduced to rating 0 with a groupRating value', () => {
			let newState = reducer(state, {type: 'DECREMENT_SKILL', parameter: {name: 'running', category: 'active', max: 6, attribute: 'str'}});

			expect(newState.active.running.rating).to.equal(0);
			expect(newState.active.running.groupRating).to.equal(1);
			expect(newState.skillPointsSpent).to.equal(2);
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
		});
	});

	describe('SET_MAGIC_SKILLS', ()=> {
		it('should create a skill with magicPoints', () => {
			let newState = reducer(state, {type: 'SET_MAGIC_SKILLS', parameter: {name: 'spellcasting', category: 'active', rating: 4, attribute: 'mag'}});

			expect(newState.active.spellcasting.magicSkillRating).to.equal(4);
			expect(state.active.spellcasting).to.equal(undefined);
		});
	});

	describe('INCREMENT_SKILLGROUP', () => {
		it('should create skills with groupRating value of 1 if skills are not created yet', () => {
			let newState = reducer(state, {type: 'INCREMENT_SKILLGROUP', parameter: {name: 'closecombat', category: 'groups', skillsInGroup: {blades: 'agi', clubs: 'agi', unarmedcombat: 'agi'}}});

			expect(newState.groups.closecombat.rating).to.equal(1);
			expect(newState.active.blades.groupRating).to.equal(1);
			expect(newState.active.clubs.groupRating).to.equal(1);
			expect(newState.active.unarmedcombat.groupRating).to.equal(1);
			expect(newState.groupPointSpent).to.equal(2);
		});

		it('should add groupRating value of a skill that already has skill points spent on it', () => {
			let newState = reducer(state, {type: 'INCREMENT_SKILLGROUP', parameter: {name: 'firearms', category: 'groups', skillsInGroup: {automatics: 'agi', longarms: 'agi', pistols: 'agi'}}});

			expect(newState.groups.firearms.rating).to.equal(1);
			expect(newState.active.automatics.groupRating).to.equal(1);
			expect(newState.active.longarms.groupRating).to.equal(1);
			expect(newState.active.longarms.rating).to.equal(1);
			expect(newState.active.pistols.groupRating).to.equal(1);
			expect(newState.groupPointSpent).to.equal(2);
		});

		it('should incrememt the groupRating of all skills in the skill group', ()=> {
			let newState = reducer(state, {type: 'INCREMENT_SKILLGROUP', parameter: {name: 'acting', category: 'groups', skillsInGroup: {con: 'cha', impersonation: 'cha', performance: 'cha'}}});

			expect(newState.groups.acting.rating).to.equal(2);
			expect(newState.active.con.groupRating).to.equal(2);
			expect(newState.active.con.rating).to.equal(6);
			expect(newState.active.impersonation.groupRating).to.equal(2);
			expect(newState.active.performance.groupRating).to.equal(2);
			expect(newState.groupPointSpent).to.equal(2);
		});
	});

	describe('DECREMENT_SKILLGROUP', () => {

		it('should delete skills with rating 0 and the groupRating at 0 but not skills with a rating higher than 0', ()=> {
			let newState = reducer(state, {type: 'DECREMENT_SKILLGROUP', parameter: {name: 'acting', category: 'groups', skillsInGroup: {con: 'cha', impersonation: 'cha', performance: 'cha'}}});

			expect(newState.groups.acting).to.equal(undefined);
			expect(newState.active.con.groupRating).to.equal(undefined);
			expect(newState.active.con.rating).to.equal(6);
			expect(newState.active.impersonation).to.equal(undefined);
			expect(newState.active.performance).to.equal(undefined);
			expect(newState.groupPointSpent).to.equal(0);

			//check to see if state is not mutated
			expect(state.active.con.groupRating).to.equal(1);
		});

		it('decrement all skill\'s groupRating and the skill group\' rating', () => {
			let newState = reducer(state, {type: 'DECREMENT_SKILLGROUP', parameter: {name: 'cracking', category: 'groups', skillsInGroup: {cybercombat: 'log', electronicwarfare: 'log', hacking: 'log'}}});

			expect(newState.groups.cracking.rating).to.equal(2);
			expect(newState.active.cybercombat.groupRating).to.equal(2);
			expect(newState.active.cybercombat.rating).to.equal(1);
			expect(newState.active.electronicwarfare.groupRating).to.equal(2);
			expect(newState.active.hacking.groupRating).to.equal(2);
			expect(newState.groupPointSpent).to.equal(0);

			//check to see if state is not mutated
			expect(state.active.cybercombat.groupRating).to.equal(3);
		});
	});

	describe('SET_SPEC', () => {
		it('should add a spec to a skill that does not have a spec', () => {
			let newState = reducer(state, {type: 'SET_SPEC', parameter: {name: 'longarms', category: 'active', spec: 'Rifles'}});

			expect(newState.active.longarms.spec).to.equal('Rifles');
			expect(state.active.longarms.spec).to.equal(undefined);
			expect(newState.skillPointsSpent).to.equal(4);
		});

		it('should change a spec of a skill that already has a spec', () => {
			let newState = reducer(state, {type: 'SET_SPEC', parameter: {name: 'palming', category: 'active', spec: 'Pilfering'}});

			expect(newState.active.palming.spec).to.equal('Pilfering');
			expect(state.active.palming.spec).to.equal('Pickpocketing');
			expect(newState.skillPointsSpent).to.equal(3);
		});

		it('should delete the spec if set to "–"', () => {
			let newState = reducer(state, {type: 'SET_SPEC', parameter: {name: 'palming', category: 'active', spec: '–'}});

			expect(newState.active.palming.spec).to.equal(undefined);
			expect(state.active.palming.spec).to.equal('Pickpocketing');
			expect(newState.skillPointsSpent).to.equal(2);
		});

		it('should return state if spec is undefined', () => {
			let newState = reducer(state, {type: 'SET_SPEC', parameter: {name: 'palming', category: 'active', spec: undefined}});

			expect(newState).to.eql(state);
			expect(newState.skillPointsSpent).to.equal(3);
		});

		it('should return state if skill is falsy', () => {
			let newState = reducer(state, {type: 'SET_SPEC', parameter: {name: 'navigation', category: 'active', spec: 'GPS'}});

			expect(newState).to.eql(state);
			expect(newState.skillPointsSpent).to.equal(3);
		});

	});

});
