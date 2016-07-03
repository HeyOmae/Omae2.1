var reducer = require('../../src/reducers/quality');

describe('quality', () => {

	let state = {
		Positive: [],
		Negative: [],
		display: ''
	};

	it('should not change the passed state', (done) => {

		const state = Object.freeze({});
		reducer(state, {type: 'INVALID'});

		done();
	});

	describe('SELECT_QUALITY', () => {
		it('should add a positive quality to the state.Positive array', () => {
			const newQuality = {
				id: '68cfe94a-fa7e-4129-a9b9-b5d73e3ced99',
				name: 'Ambidextrous',
				karma: '4',
				limit: 'no',
				category: 'Positive',
				source: 'SR5',
				page: '71'
			},
			newState = reducer(state, {type: 'SELECT_QUALITY', parameter: { newQuality }});

			expect(newState.Positive[newState.Positive.length - 1]).to.eql(newQuality);
			expect(state.Positive.length).to.equal(newState.Positive.length - 1);
		});

		it('should add a Negative quality to the state.Negative array', () => {
			const newQuality = {
				id: 'ea7cced4-a201-44a2-9a1b-e10180b1df81',
				name: 'Addiction (Mild)',
				karma: '-4',
				category: 'Negative',
				limit: 'no',
				bonus: {

				},
				source: 'SR5',
				page: '77'
			},
			newState = reducer(state, {type: 'SELECT_QUALITY', parameter: { newQuality }});

			expect(newState.Negative[newState.Negative.length - 1]).to.eql(newQuality);
			expect(state.Negative.length).to.equal(newState.Negative.length - 1);
		});
	});

	describe('REMOVE_QUALITY', () => {
		it('should remove a positive quality from the state.Positive array', () => {
			const newState = reducer(state, {type: 'REMOVE_QUALITY', parameter: { qualityIndex: 1 }});

			expect(newState.Positive.length).to.equal(state.Positive.length - 1);
			expect(state.Positive.length).to.equal(newState.Positive.length + 1);
		});

		it('should remove a Negative quality from the state.Negative array', () => {
			const newState = reducer(state, {type: 'REMOVE_QUALITY', parameter: { qualityIndex: 1 }});

			expect(newState.Negative.length).to.equal(state.Negative.length - 1);
			expect(state.Negative.length).to.equal(newState.Negative.length + 1);
		});
	});

});
