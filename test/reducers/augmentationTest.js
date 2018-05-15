const reducer = require('../../src/reducers/gear/augmentation');

describe('augmentation reducer', () => {
	const state = {
		grade: 0,
	};
	it('should not change the passed state', (done) => {
		reducer(state, { type: 'INVALID' });

		done();
	});

	describe('SELECT_GRADE', () => {
		it('should set all the details about the grade', () => {
			const grade = 1;
			const newState = reducer(state, { type: 'SELECT_GRADE', parameter: { grade } });

			expect(newState.grade).to.equal(grade);
		});
	});
});
