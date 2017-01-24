var reducer = require('../../src/reducers/appControl');

describe('appControl', () => {
	const initState = Object.freeze({
		summaryFix: false,
		styleTheme: ''
	});

	it('should not change the passed state', () => {
		const state = Object.freeze({});
		const newState = reducer(state, {type: 'INVALID'});

		expect(newState).to.equal(state);
	});

	describe('FIX_SUMMARY', () => {

		it('change summaryFix to true if state.summaryFix is false and passed in as true', () => {
			const newState = reducer(initState, {type: 'FIX_SUMMARY', parameter: {summaryFix: true}});

			expect(newState.summaryFix).to.equal(true);
		});

		it('return state if state.summaryFix is false and being set to false', () => {
			const newState = reducer(initState, {type: 'FIX_SUMMARY', parameter: {summaryFix: false}});

			expect(newState).to.equal(initState);
		});
	});

	describe('STYLE', () => {
		it('should change the styleTheme to what is passed in', () => {
			const newState = reducer(initState, {type: 'STYLE', parameter: {styleTheme: 'cyber-terminal'}});

			expect(newState.styleTheme).to.equal('cyber-terminal');
		});
	});

});

