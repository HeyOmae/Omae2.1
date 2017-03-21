const reducer = require('../../src/reducers/settingSkills');

describe('settingSkills', () => {

	const state = {
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
			hacking: {rating: 1, attribute: 'log', groupRating: 3},
			summoning: {magicSkillRating: 4, attribute: 'mag'},
			binding: {rating: 1, magicSkillRating: 4, attribute: 'mag'},
			banishing: {rating: 1, attribute: 'mag'}
		},
		groups: {
			acting: {rating: 1},
			cracking: {rating: 3}
		},
		magicSkills: ['summoning', 'binding'],
		skillPointsSpent: 3,
		groupPointSpent: 1,
		showSkill: ''
	};

	it('should not change the passed state', (done) => {
		reducer(state, {type: 'INVALID'});

		done();
	});

	describe('ADD_SKILL', () => {
		it('should add a rating 1 skill to state if not defined', () => {
			const newState = reducer(state, {type: 'ADD_SKILL', parameter: {name: 'pistol', category: 'active', max: 6, attribute: 'agi' }});

			expect(newState.active.pistol.rating).to.equal(1);
			expect(newState.skillPointsSpent).to.equal(4);
			expect(newState.active.pistol.attribute).to.equal('agi');
		});

		it('should return state if the skill is already defined', () => {
			const newState = reducer(state, {type: 'ADD_SKILL', parameter: {name: 'longarms', category: 'active', max: 6, attribute: 'agi' }});

			expect(newState.active.longarms.rating).to.equal(1);
			expect(newState.skillPointsSpent).to.equal(3);
			expect(newState.active.longarms.attribute).to.equal('agi');
		})
	});

	describe('REMOVE_SKILL', () => {
		describe('should remove a skill not in a skillgroup and', () => {
			it('refund the skillPointsSpent based off the skill rating', () => {
				const newState = reducer(state, {type: 'REMOVE_SKILL', parameter: {name: 'longarms', category: 'active', max: 6, attribute: 'agi' }});

				expect(newState.active.longarms).to.be.undefined;
				expect(newState.skillPointsSpent).to.equal(2);
				expect(state.active.longarms.rating).to.equal(1);
			});

			it('refund the skillPointsSpent based off skill rating and specialization', () => {
				const newState = reducer(state, {type: 'REMOVE_SKILL', parameter: {name: 'palming', category: 'active', max: 6, attribute: 'agi' }});

				expect(newState.active.palming).to.be.undefined;
				expect(newState.skillPointsSpent).to.equal(0);
				expect(state.active.palming.rating).to.equal(2);
				expect(state.active.palming.spec).to.equal('Pickpocketing');
			})
		});



		it('should not delete a skill from a skill group', () => {
			const newState = reducer(state, {type: 'REMOVE_SKILL', parameter: {name: 'running', category: 'active', max: 6, attribute: 'str'}});

			expect(newState.active.running.rating).to.equal(1);
			expect(newState.active.running.groupRating).to.equal(1);
			expect(newState.skillPointsSpent).to.equal(3);
		});

		it('should return state if attempting to decrement a skill that is not defined', () => {
			const newState = reducer(state, {type: 'REMOVE_SKILL', parameter: {name: 'pistol', category: 'active', max: 6, attribute: 'agi' }});

			expect(newState).to.equal(state);
			expect(newState.skillPointsSpent).to.equal(3);
		});

		it('should remove a free skill', () => {
			const newState = reducer(state, {type: 'REMOVE_SKILL', parameter: {name: 'binding', category: 'active', max: 6, attribute: 'mag' }});

			expect(newState.magicSkills).to.deep.equal(['summoning']);
			expect(state.magicSkills).to.deep.equal(['summoning', 'binding']);
			expect(newState.skillPointsSpent).to.equal(2);
		});
	});

	describe('INCREMENT_SKILL', () => {
		it('should increment a skill that\'s already defined in the state', () => {
			const newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: {name: 'longarms', category: 'active', max: 6, attribute: 'agi' }});

			expect(newState.active.longarms.rating).to.equal(2);
			expect(newState.skillPointsSpent).to.equal(4);
			expect(newState.active.longarms.attribute).to.equal('agi');
		});

		it('should return state if increment a skill higher then the max', () => {
			const newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: {name: 'con', category: 'active', max: 6, attribute: 'cha' }});

			expect(newState).to.equal(state);
			expect(newState.skillPointsSpent).to.equal(3);
		});

		it('should return state if incrementing a skill higher then the max with a higher groupRating', () => {
			const newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: {name: 'gymastics', category: 'active', max: 6, attribute: 'agi' }});

			expect(newState).to.equal(state);
			expect(newState.skillPointsSpent).to.equal(3);
		});

		it('should return state if the skill is not defined', () => {
			const newState = reducer(state, {type: 'INCREMENT_SKILL', parameter: {name: 'pistol', category: 'active', max: 6, attribute: 'agi' }});

			expect(newState.active.pistol).to.be.undefined;
			expect(newState.skillPointsSpent).to.equal(3);
		});
	});

	describe('DECREMENT_SKILL', () => {
		it('should decrement a skill that is already defined in the state', () => {
			const newState = reducer(state, {type: 'DECREMENT_SKILL', parameter: {name: 'palming', category: 'active', max: 6, attribute: 'agi' }});

			expect(newState.active.palming.rating).to.equal(1);
			expect(newState.skillPointsSpent).to.equal(2);
		});

		it('should return state if attempting to decrement a skill that is not defined', () => {
			const newState = reducer(state, {type: 'DECREMENT_SKILL', parameter: {name: 'pistol', category: 'active', max: 6, attribute: 'agi' }});

			expect(newState).to.equal(state);
			expect(newState.skillPointsSpent).to.equal(3);
		});
	});

	describe('SET_MAGIC_SKILLS', ()=> {
		it('should create a skill with magicPoints', () => {
			const newState = reducer(state, {type: 'SET_MAGIC_SKILLS', parameter: {magicSkills: [
				{name: 'summoning', category: 'active', rating: 4, attribute: 'mag'},
				{name: 'spellcasting', category: 'active', rating: 4, attribute: 'mag'}
				]}});

			expect(newState.active.spellcasting.magicSkillRating).to.equal(4);
			expect(newState.active.spellcasting.attribute).to.equal('mag');
			expect(newState.magicSkills).to.eql(['summoning', 'spellcasting']);

			expect(state.active.spellcasting).to.equal(undefined);
			expect(state.magicSkills).to.eql(['summoning', 'binding']);
		});

		it('should add magicPoints to a skill that already exists', () => {
			const newState = reducer(state, {type: 'SET_MAGIC_SKILLS', parameter: {magicSkills: [
				{name: 'summoning', category: 'active', rating: 4, attribute: 'mag'},
				{name: 'banishing', category: 'active', rating: 4, attribute: 'mag'}
				]}});

			expect(newState.active.banishing.magicSkillRating).to.equal(4);
			expect(newState.active.banishing.attribute).to.equal('mag');
			expect(newState.magicSkills).to.eql(['summoning', 'banishing']);

			expect(state.active.banishing).to.deep.equal({rating: 1, attribute: 'mag'});
			expect(state.magicSkills).to.eql(['summoning', 'binding'])

		});

		it('should delete a skill with no rating or skill group rating', () => {
			const newState = reducer(state, {type: 'SET_MAGIC_SKILLS', parameter: {magicSkills: [
				{name: 'counterspelling', category: 'active', rating: 4, attribute: 'mag'},
				{name: 'binding', category: 'active', rating: 4, attribute: 'mag'}
				]}});

			expect(newState.active.summoning).to.equal(undefined);
			expect(newState.active.counterspelling.magicSkillRating).to.equal(4);
			expect(newState.active.binding.magicSkillRating).to.equal(4);
			expect(newState.magicSkills).to.eql(['counterspelling', 'binding']);

			expect(state.active.summoning.magicSkillRating).to.equal(4);
			expect(state.magicSkills).to.eql(['summoning', 'binding']);
		});

		it('should remove the magicSkillRating of a skill if no longer selected and not delete it', () => {
			const newState = reducer(state, {type: 'SET_MAGIC_SKILLS', parameter: {magicSkills: [
				{name: 'summoning', category: 'active', rating: 4, attribute: 'mag'},
				{name: 'counterspelling', category: 'active', rating: 4, attribute: 'mag'}
				]}});

			expect(newState.active.binding.rating).to.equal(1);
			expect(newState.active.binding.magicSkillRating).to.equal(undefined);
			expect(newState.active.counterspelling.magicSkillRating).to.equal(4);
			expect(newState.magicSkills).to.eql(['summoning', 'counterspelling']);

			expect(state.active.binding.rating).to.equal(1);
			expect(state.active.binding.magicSkillRating).to.equal(4);
			expect(state.active.counterspelling).to.equal(undefined);
			expect(state.magicSkills).to.eql(['summoning', 'binding']);
		});

		it('should delete skills if passing in a skill with no name', () => {
			const newState = reducer(state, {type: 'SET_MAGIC_SKILLS', parameter: {magicSkills: [
				{name: '', category: 'active', rating: 4, attribute: undefined},
				{name: 'binding', category: 'active', rating: 4, attribute: 'mag'}
				]}});

			expect(newState.active.binding.magicSkillRating).to.equal(4);
			expect(newState.active.binding.rating).to.equal(1);
			expect(newState.active.summoning).to.equal(undefined);
			expect(newState.magicSkills).to.eql(['', 'binding']);

			expect(state.active.binding.rating).to.equal(1);
			expect(state.active.binding.magicSkillRating).to.equal(4);
			expect(state.active.summoning.magicSkillRating).to.equal(4);
			expect(state.magicSkills).to.eql(['summoning', 'binding']);
		});

		it('should delete both skills if passing in both skills with no name', () => {
			const newState = reducer(state, {type: 'SET_MAGIC_SKILLS', parameter: {magicSkills: [
				{name: '', category: 'active', rating: 4, attribute: undefined},
				{name: '', category: 'active', rating: 4, attribute: undefined}
				]}});

			expect(newState.active.binding.magicSkillRating).to.equal(undefined);
			expect(newState.active.binding.rating).to.equal(1);
			expect(newState.active.summoning).to.equal(undefined);
			expect(newState.magicSkills).to.eql(['', '']);

			expect(state.active.binding.rating).to.equal(1);
			expect(state.active.binding.magicSkillRating).to.equal(4);
			expect(state.active.summoning.magicSkillRating).to.equal(4);
			expect(state.magicSkills).to.eql(['summoning', 'binding']);
		});

		it('should reset the magicSkills if passed in null', () => {
			const newState = reducer(state, {type: 'SET_MAGIC_SKILLS', parameter: {magicSkills: [
				null,
				null
				]}});

			expect(newState.active.binding.magicSkillRating).to.equal(undefined);
			expect(newState.active.binding.rating).to.equal(1);
			expect(newState.magicSkills).to.eql(['', '']);
			expect(newState.active.summoning).to.equal(undefined);

			expect(state.active.binding.rating).to.equal(1);
			expect(state.active.binding.magicSkillRating).to.equal(4);
			expect(state.active.summoning.magicSkillRating).to.equal(4);
			expect(state.magicSkills).to.eql(['summoning', 'binding']);
		});

		it('should not be able to set both free skills to the same skill', () => {
			const newState = reducer(state, {type: 'SET_MAGIC_SKILLS', parameter: {magicSkills: [
				{name: 'binding', category: 'active', rating: 4, attribute: 'mag'},
				{name: 'binding', category: 'active', rating: 4, attribute: 'mag'}
				]}});

			expect(newState).to.equal(state);
		});

		it('should not copy the previous skill when changing', () => {

			const newState = reducer(state, {type: 'SET_MAGIC_SKILLS', parameter: {magicSkills: [
				{name: 'summoning', category: 'active', rating: 4, attribute: 'mag'},
				{name: 'alchemy', category: 'active', rating: 4, attribute: 'mag'}
				]}});

			expect(newState.active.alchemy.rating).to.equal(undefined);
			expect(newState.active.alchemy.magicSkillRating).to.equal(4);

			expect(state.active.alchemy).to.equal(undefined);
		});
	});

	describe('INCREMENT_SKILLGROUP', () => {
		it('should create skills with groupRating value of 1 if skills are not created yet', () => {
			const newState = reducer(state, {type: 'INCREMENT_SKILLGROUP', parameter: {name: 'closecombat', category: 'groups', skillsInGroup: {blades: 'agi', clubs: 'agi', unarmedcombat: 'agi'}}});

			expect(newState.groups.closecombat.rating).to.equal(1);
			expect(newState.active.blades.groupRating).to.equal(1);
			expect(newState.active.clubs.groupRating).to.equal(1);
			expect(newState.active.unarmedcombat.groupRating).to.equal(1);
			expect(newState.groupPointSpent).to.equal(2);
		});

		it('should add groupRating value of a skill that already has skill points spent on it', () => {
			const newState = reducer(state, {type: 'INCREMENT_SKILLGROUP', parameter: {name: 'firearms', category: 'groups', skillsInGroup: {automatics: 'agi', longarms: 'agi', pistols: 'agi'}}});

			expect(newState.groups.firearms.rating).to.equal(1);
			expect(newState.active.automatics.groupRating).to.equal(1);
			expect(newState.active.longarms.groupRating).to.equal(1);
			expect(newState.active.longarms.rating).to.equal(1);
			expect(newState.active.pistols.groupRating).to.equal(1);
			expect(newState.groupPointSpent).to.equal(2);
		});

		it('should incrememt the groupRating of all skills in the skill group', () => {
			const newState = reducer(state, {type: 'INCREMENT_SKILLGROUP', parameter: {name: 'acting', category: 'groups', skillsInGroup: {con: 'cha', impersonation: 'cha', performance: 'cha'}}});

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
			const newState = reducer(state, {type: 'DECREMENT_SKILLGROUP', parameter: {name: 'acting', category: 'groups', skillsInGroup: {con: 'cha', impersonation: 'cha', performance: 'cha'}}});

			expect(newState.groups.acting).to.equal(undefined);
			expect(newState.active.con.groupRating).to.equal(undefined);
			expect(newState.active.con.rating).to.equal(6);
			expect(newState.active.impersonation).to.equal(undefined);
			expect(newState.active.performance).to.equal(undefined);
			expect(newState.groupPointSpent).to.equal(0);

			expect(state.active.con.groupRating).to.equal(1);
		});

		it('decrement all skill\'s groupRating and the skill group\' rating', () => {
			const newState = reducer(state, {type: 'DECREMENT_SKILLGROUP', parameter: {name: 'cracking', category: 'groups', skillsInGroup: {cybercombat: 'log', electronicwarfare: 'log', hacking: 'log'}}});

			expect(newState.groups.cracking.rating).to.equal(2);
			expect(newState.active.cybercombat.groupRating).to.equal(2);
			expect(newState.active.cybercombat.rating).to.equal(1);
			expect(newState.active.electronicwarfare.groupRating).to.equal(2);
			expect(newState.active.hacking.groupRating).to.equal(2);
			expect(newState.groupPointSpent).to.equal(0);

			// check to see if state is not mutated
			expect(state.active.cybercombat.groupRating).to.equal(3);
		});

		it('should return state if an invalid skill group name is passed in', () => {
			const newState = reducer(state, {type: 'DECREMENT_SKILLGROUP', parameter: {name: 'invalid', category: 'groups', skillsInGroup: {cybercombat: 'log', electronicwarfare: 'log', hacking: 'log'}}});

			expect(newState).to.equal(state);
		});
	});

	describe('SET_SPEC', () => {
		it('should add a spec to a skill that does not have a spec', () => {
			const newState = reducer(state, {type: 'SET_SPEC', parameter: {name: 'longarms', category: 'active', spec: 'Rifles'}});

			expect(newState.active.longarms.spec).to.equal('Rifles');
			expect(state.active.longarms.spec).to.equal(undefined);
			expect(newState.skillPointsSpent).to.equal(4);
		});

		it('should change a spec of a skill that already has a spec', () => {
			const newState = reducer(state, {type: 'SET_SPEC', parameter: {name: 'palming', category: 'active', spec: 'Pilfering'}});

			expect(newState.active.palming.spec).to.equal('Pilfering');
			expect(state.active.palming.spec).to.equal('Pickpocketing');
			expect(newState.skillPointsSpent).to.equal(3);
		});

		it('should delete the spec if set to "–"', () => {
			const newState = reducer(state, {type: 'SET_SPEC', parameter: {name: 'palming', category: 'active', spec: '–'}});

			expect(newState.active.palming.spec).to.equal(undefined);
			expect(state.active.palming.spec).to.equal('Pickpocketing');
			expect(newState.skillPointsSpent).to.equal(2);
		});

		it('should return state if spec is undefined', () => {
			const newState = reducer(state, {type: 'SET_SPEC', parameter: {name: 'palming', category: 'active', spec: undefined}});

			expect(newState).to.eql(state);
			expect(newState.skillPointsSpent).to.equal(3);
		});

		it('should return state if skill is falsy', () => {
			const newState = reducer(state, {type: 'SET_SPEC', parameter: {name: 'navigation', category: 'active', spec: 'GPS'}});

			expect(newState).to.eql(state);
			expect(newState.skillPointsSpent).to.equal(3);
		});

	});

});
