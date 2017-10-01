/**
 * Webpack configuration base class
 */
const path = require('path');

class WebpackBaseConfig {

	constructor() {
		this._config = {};
	}

	/**
	 * Set the config data.
	 * This will always return a new config
	 * @param {Object} data Keys to assign
	 * @return {Object}
	 */
	set config(data) {
		this._config = Object.assign({}, this.defaultSettings, data);
		return this._config;
	}

	/**
	 * Get the global config
	 * @return {Object} config Final webpack config
	 */
	get config() {
		return this._config;
	}

	/**
	 * Get the environment name
	 * @return {String} The current environment
	 */
	get env() {
		return 'dev';
	}

	/**
	 * Get the absolute path to src directory
	 * @return {String}
	 */
	get srcPathAbsolute() {
		return path.resolve('./src');
	}

	/**
	 * Get the absolute path to tests directory
	 * @return {String}
	 */
	get testPathAbsolute() {
		return path.resolve('./test');
	}

	/**
	 * Get the default settings
	 * @return {Object}
	 */
	get defaultSettings() {
		return {
			context: this.srcPathAbsolute,
			devtool: 'eval',
			devServer: {
				contentBase: './src/',
				publicPath: '/assets/',
				historyApiFallback: true,
				hot: true,
				port: 8000
			},
			entry: './index.js',
			module: {
				rules: [
					{
						enforce: 'pre',
						test: /\.js?$/,
						include: this.srcPathAbsolute,
						exclude: /node_modules/,
						loader: 'babel-loader',
						options: {
							presets: ['env']
						}
					},
					{
						test: /\.(png|jpg|gif|mp4|ogg|svg|woff|woff2)$/,
						loader: 'file-loader'
					},
					{
						test: /^.((?!cssmodule).)*\.(sass|scss)$/,
						loaders: [
							{ loader: 'style-loader' },
							{ loader: 'css-loader' },
							{ loader: 'sass-loader' }
						]
					},
					{
						test: /\.json$/,
						loader: 'json-loader'
					},
				]
			},
			output: {
				path: path.resolve('./dist/assets'),
				filename: 'app.js',
				publicPath: './assets/'
			},
			plugins: [],
			resolve: {
				alias: {
					actions: `${this.srcPathAbsolute}/actions/`,
					components: `${this.srcPathAbsolute}/components/`,
					containers: `${this.srcPathAbsolute}/containers/`,
					config: `${this.srcPathAbsolute}/config/${this.env}.js`,
					images: `${this.srcPathAbsolute}/images/`,
					sources: `${this.srcPathAbsolute}/sources/`,
					stores: `${this.srcPathAbsolute}/stores/`,
					styles: `${this.srcPathAbsolute}/styles/`,
					'~': `${this.srcPathAbsolute}/`,
					data: `${this.srcPathAbsolute}/data/`

				},
				extensions: ['.js', '.jsx'],
				modules: [
					this.srcPathAbsolute,
					'node_modules'
				]
			}
		};
	}
}

module.exports = WebpackBaseConfig;
