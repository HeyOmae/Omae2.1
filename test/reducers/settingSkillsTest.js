var reducer = require('../../src/reducers/settingSkills');

describe('settingSkills', () => {

	it('should not change the passed state', (done) => {

		const state = Object.freeze({});
		reducer(state, {type: 'INVALID'});

		done();
	});
});
