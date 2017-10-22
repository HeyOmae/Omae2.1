const webpackCfg = require('./webpack.config')('test');

module.exports = function karmaConfig(config) {

	config.set({
		browsers: ['ChromeHeadless'],
		customLaunchers: {
			ChromeHeadless: {
				base: 'Chrome',
				flags: [
					'--no-sandbox',
					// See https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
					'--headless',
					'--disable-gpu',
					// Without a remote debugging port, Google Chrome exits immediately.
					'--remote-debugging-port=9222',
				]
			}
		},
		files: [
			'test/loadtests.js'
		],
		port: 8080,
		captureTimeout: 60000,
		frameworks: [
			'mocha',
			'chai',
			'sinon',
			'sinon-chai'
		],
		client: {
			captureConsole: true,
			mocha: {}
		},
		singleRun: true,
		reporters: ['mocha', 'coverage-istanbul'],
		coverageIstanbulReporter: {
			reports: ['html', 'lcovonly', 'text'],
			fixWebpackSourcePaths: true
		},
		mochaReporter: {
			output: 'autowatch'
		},
		preprocessors: {
			'test/loadtests.js': ['webpack', 'sourcemap']
		},
		webpack: webpackCfg,
		webpackServer: {
			noInfo: true
		}
	});
};
