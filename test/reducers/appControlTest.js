/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
var reducer = require('../../src/reducers/appControl');

describe('appControl', () => {
	it('should not change the passed state', () => {

		const state = Object.freeze({});
		const newState = reducer(state, {type: 'INVALID'});

		expect(newState).to.equal(state);
	});

	it('change summaryFix to true if state.summaryFix is false and passed in as true', () => {
		const initState = {
			summaryFix: false
		}

		const newState = reducer(initState, {type: 'FIX_SUMMARY', parameter: {summaryFix: true}});

		expect(newState.summaryFix).to.equal(true);
	});

	it('return state if state.summaryFix is false and being set to false', () => {
		const initState = {
			summaryFix: false
		}

		const newState = reducer(initState, {type: 'FIX_SUMMARY', parameter: {summaryFix: false}});

		expect(newState).to.equal(initState);
	});
});

