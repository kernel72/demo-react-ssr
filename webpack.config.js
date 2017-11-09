
const webpack = require('webpack');
const path = require('path');
const distDir = path.resolve(__dirname, 'dist');

const rules = [{
	test: /\.jsx?$/,
	exclude: /node_modules/,
	loader: 'babel-loader',
	options: {
		presets: ['react', 'env']
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
		})
	]
}];
