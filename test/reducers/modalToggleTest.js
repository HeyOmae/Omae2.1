var reducer = require('../../src/reducers/modalToggle');

describe('modalToggle', () => {
	let state = '';

	it('should not change the passed state', (done) => {

		const state = Object.freeze({});
		reducer(state, {type: 'INVALID'});

		done();
	});

	describe('TOGGLE_MODAL', () => {
		it('should make a new state that changes the selected modal', () => {
			let newState = reducer(state, {type: 'TOGGLE_MODAL', parameter: 'TestingModal' });

			expect(newState).to.equal('TestingModal');
			expect(state).to.equal('');
		});

		it('should make a new state that clears the selected modal', () => {
			state = 'TestingModal';
			let newState = reducer(state, {type: 'TOGGLE_MODAL', parameter: 'TestingModal' });

			expect(newState).to.equal('');
			expect(state).to.equal('TestingModal');
		});
	});
});
