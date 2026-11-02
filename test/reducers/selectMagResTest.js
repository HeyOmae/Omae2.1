/* eslint-env node, mocha */
/* eslint no-console: 0 */
import reducer from '../../src/reducers/selectMagRes';

describe('selectMagRes', () => {
	const state = 'Mage';

	it('should not change the passed state', () => {
		const newState = reducer(state, { type: 'INVALID' });

		expect(newState).to.equal(state);
	});

	it('should make a new state that changes magicType', () => {
		const newState = reducer(state, { type: 'SELECT_MAGICTYPE', parameter: 'Adept' });

		expect(newState).to.equal('Adept');
		expect(state).to.equal('Mage');
	});
});
