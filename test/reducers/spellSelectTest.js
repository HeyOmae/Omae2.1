/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
var reducer = require('../../src/reducers/spellSelect');

describe('spellSelect', () => {
	let state = {
		spells: [
			{
				id: '87cb3685-22e8-46fa-890f-f3cfef10a71f',
				name: 'Toxic Wave',
				descriptor: 'Indirect, Elemental, Area',
				category: 'Combat',
				type: 'P',
				range: 'LOS (A)',
				damage: 'P',
				duration: 'I',
				dv: 'F-1',
				source: 'SR5',
				page: '283'
			}
		],
		powers: [],
		complexforms: [
			{
				id: '33e75cd6-cad7-43dd-87ac-9838c83eccb5',
				name: 'Diffusion of [Matrix Attribute]',
				target: 'Device',
				duration: 'S',
				fv: 'L+1',
				bonus: {

				},
				source: 'SR5',
				page: '252'
			},
			{
				id: '6b4ed8d5-75c8-4415-9578-15afa4ac8494',
				name: 'Editor',
				target: 'File',
				duration: 'P',
				fv: 'L+2',
				source: 'SR5',
				page: '252'
			},
			{
				id: 'dbb1d719-c829-4c45-9a53-9ff538865c14',
				name: 'Static Veil',
				target: 'Persona',
				duration: 'S',
				fv: 'L-1',
				source: 'SR5',
				page: '252'
			}
		]
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

		expect(newState.spells[newState.spells.length - 1]).to.eql(newSpell);
		expect(newState.spells.length).to.eql(state.spells.length + 1);
	});

	it('should remove spells from the state.spells', () => {
		const newState = reducer(state, {type: 'REMOVE_SPELL', parameter: {spellIndex: 0}});

		expect(newState.spells[0]).to.not.eql(state.spells[0]);
		expect(newState.spells.length).to.equal(state.spells.length - 1);
	});

	it('should add a complexform to the state.complexforms', () => {
		const newSpell = {
			id: '373638b9-4334-4645-99f5-c3673e4f809b',
			name: 'Cleaner',
			target: 'Persona',
			duration: 'P',
			fv: 'L+1',
			source: 'SR5',
			page: '252'
		},
		newState = reducer(state, {type: 'ADD_COMPLEXFORM', parameter: {newSpell}});

		expect(newState.complexforms[newState.complexforms.length - 1]).to.eql(newSpell);
		expect(newState.complexforms.length).to.eql(state.complexforms.length + 1);
	});

	it('should remove complexform from the state.complexforms', () => {
		const newState = reducer(state, {type: 'REMOVE_COMPLEXFORM', parameter: {spellIndex: 1}});

		expect(newState.complexforms[1]).to.not.eql(state.complexforms[1]);
		expect(newState.complexforms.length).to.equal(state.complexforms.length - 1);
	});
});
