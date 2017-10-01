/**
 * Default dev server configuration.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./Base');

class WebpackDevConfig extends WebpackBaseConfig {

	constructor() {
		super();
		this.config = {
			devtool: 'cheap-module-source-map',
			entry: [
				'react-hot-loader/patch',
				'webpack-dev-server/client?http://0.0.0.0:8000/',
				'webpack/hot/only-dev-server',
				'./client.js'
			],
			plugins: [
				new webpack.HotModuleReplacementPlugin(),
				new webpack.NamedModulesPlugin(),
				new webpack.NoEmitOnErrorsPlugin()
			]
		};
	}
}

module.exports = WebpackDevConfig;
