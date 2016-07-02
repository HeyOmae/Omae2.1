var reducer = require('../../src/reducers/quality');

describe('quality', () => {

	let state = {
		positive: [],
		negative: [],
		display: ''
	};

	it('should not change the passed state', (done) => {

		const state = Object.freeze({});
		reducer(state, {type: 'INVALID'});

		done();
	});

	describe('EXPAND_LIST', () => {
		it('should set the display to the string passed into it', () => {
			let newState = reducer(state);
		});
	});

});
