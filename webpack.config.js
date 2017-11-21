
const webpack = require('webpack');
const path = require('path');
const distDir = path.resolve(__dirname, 'dist');

const rules = [{
	test: /\.jsx?$/,
	exclude: /node_modules/,
	loader: 'babel-loader',
	options: {
		presets: ['react', 'env'],
		plugins: [
			"universal-import",
			"syntax-dynamic-import"
		]
	}
}];

const plugins = [
	new webpack.ProvidePlugin({
		React: 'react'
	})
];

module.exports = [{
	target:"web",
	name: "browser",
	entry: "./src/client.entry.js",
	output: {
		path: distDir,
		filename: 'bundle.js'
	},
	module: {
		rules
	},
	plugins: [
		...plugins,
		new webpack.DefinePlugin({
			API_URL: "'/api'"
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
			filename: '[name].[chunkhash].js',
			minChunks: Infinity
		})
	]
}, {
	name: "server",
	target:"node",
	entry: "./src/server.entry.js",
	output: {
		path: distDir,
		filename: 'server.bundle.js',
		libraryTarget: "commonjs2"
	},
	module: {
		rules
	},
	plugins: [
		...plugins,
		new webpack.DefinePlugin({
			API_URL: "'http://localhost:3000/api'"
		}),
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		})
	]
}];
