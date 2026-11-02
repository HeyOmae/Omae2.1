/* eslint-env node, mocha */
/* eslint no-console: 0 */
import reducer from '../../src/reducers/priorityTable';

describe('priorityTable', () => {
	const state = Object.freeze({
		metatype: 'A',
		attribute: 'B',
		magres: 'C',
		skills: 'D',
		resouces: 'E',
	});

	it('should not change the passed state', () => {
		const frozenState = Object.freeze({ hello: 'goodbye' });
		const newState = reducer(frozenState, { type: 'INVALID' });
		expect(newState.hello).to.equal('goodbye');
	});

	it('should make a new state that changes state[category] to a different rating', () => {
		const newState = reducer(state, { type: 'SET_PRIORITY', parameter: { rating: 'B', category: 'metatype' } });

		expect(newState.metatype).to.equal('B');
	});
});
