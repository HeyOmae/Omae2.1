/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
var reducer = require('../../src/reducers/spellSelect');

describe('spellSelect', () => {
	let state = {
		spells: [],
		powers: []
	};

	it('should not change the passed state', (done) => {

		const state = Object.freeze({});
		reducer(state, {type: 'INVALID'});

		done();
	});

	it('should add a spell to the state.spells', () => {
		const newSpell = {
			id: 'c78d91cc-fa02-48c3-a243-28823a2038ef',
			name: 'Acid Stream',
			descriptor: 'Indirect, Elemental',
			category: 'Combat',
			type: 'P',
			range: 'LOS',
			damage: 'P',
			duration: 'I',
			dv: 'F-3',
			source: 'SR5',
			page: '283'
		},
		newState = reducer(state, {type: 'ADD_SPELL', parameter: {newSpell}});
		expect(newState.spells[state.spells.length - 1]).to.eql(newSpell);
	});

	it('should remove spells from the state.spells', () => {
		const newState = reducer(state, {type: 'REMOVE_SPELL', parameter: {spellIndex: 0}});
		expect(newState.spells.length).to.equal(state.spells.length - 1);
	});
});
