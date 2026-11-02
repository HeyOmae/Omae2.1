/* eslint-env node, mocha */
/* eslint no-console: 0 */


import config from 'config';

describe('appEnvConfigTests', () => {
	it('should load app config file depending on current --env', () => {
		expect(config.appEnv).to.equal('test');
	});
});
