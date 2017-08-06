var reducer = require('../../src/reducers/gear/augmentation');

describe('augmentation reducer', () => {
	const state = {
		grade: {
			id: '23382221-fd16-44ec-8da7-9b935ed2c1ee',
			name: 'Standard',
			ess: '1',
			cost: '1',
			avail: '0',
			source: 'SR5',
			page: '451'
		}
	};
	it('should not change the passed state', (done) => {
		reducer(state, {type: 'INVALID'});

		done();
	});

	describe('SELECT_GRADE', () => {
		it('should set all the details about the grade', () => {
			const grade = {
				id: '75da0ff2-4137-4990-85e6-331977564712',
				name: 'Alphaware',
				ess: '0.8',
				cost: '1.2',
				avail: '+2',
				source: 'SR5',
				page: '451'
			}
				const newState = reducer(state, {type: 'SELECT_GRADE', parameter: {grade}});

				expect(newState.grade).to.equal(grade);
		});
	});
});
