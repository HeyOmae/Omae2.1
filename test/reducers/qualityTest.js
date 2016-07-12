var reducer = require('../../src/reducers/quality');

describe('quality', () => {

	let state = {
		Positive: [
			{
				'id': '5b19dbcd-fb69-4a02-a25a-7ac5342ca576',
				'name': 'Analytical Mind',
				'karma': '5',
				'category': 'Positive',
				'source': 'SR5',
				'page': '72'
			},
			{
				'id': 'c734e46a-d391-45a6-b022-6f18db5019f1',
				'name': 'Bilingual',
				'karma': '5',
				'category': 'Positive',
				'source': 'SR5',
				'page': '72'
			}
		],
		Negative: [
			{
				'id': '25356bae-efcc-46c6-9c4f-66909b9b7233',
				'name': 'Bad Rep',
				'karma': '-7',
				'category': 'Negative',
				'bonus': {
					'notoriety': '3'
				},
				'source': 'SR5',
				'page': '79'
			},
			{
				'id': '62c7ed8f-b534-41e3-84ac-29534826d476',
				'name': 'Combat Paralysis',
				'karma': '-12',
				'implemented': 'False',
				'category': 'Negative',
				'source': 'SR5',
				'page': '80'
			}
		],
		karma: {
			Positive: 10,
			Negative: -19
		}
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
			expect(newState.karma.Positive).to.equal(14);
			expect(state.Positive.length).to.equal(newState.Positive.length - 1);
			expect(state.karma.Positive).to.equal(10);
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
			expect(newState.karma.Negative).to.equal(-23);
			expect(state.Negative.length).to.equal(newState.Negative.length - 1);
			expect(state.karma.Negative).to.equal(-19);
		});
	});

	describe('REMOVE_QUALITY', () => {
		it('should remove a positive quality from the state.Positive array', () => {
			const newState = reducer(state, {type: 'REMOVE_QUALITY', parameter: { qualityIndex: 1, category: 'Positive' }});

			expect(newState.Positive.length).to.equal(state.Positive.length - 1);
			expect(newState.karma.Positive).to.equal(5);
		});

		it('should remove a Negative quality from the state.Negative array', () => {
			const newState = reducer(state, {type: 'REMOVE_QUALITY', parameter: { qualityIndex: 1, category: 'Negative' }});

			expect(newState.Negative.length).to.equal(state.Negative.length - 1);
			expect(newState.karma.Negative).to.equal(-7);
		});
	});

});
