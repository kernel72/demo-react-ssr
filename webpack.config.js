
const webpack = require('webpack');
const path = require('path');
const distDir = path.resolve(__dirname, 'dist');

module.exports = {
	entry: "./src/app.js",
	output: {
		path: distDir,
		filename: 'bundle.js'
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: {
				presets: ['react', 'env']
			}
		}]
	},
	plugins: [
		new webpack.ProvidePlugin({
			React: 'react'
		})
	]
};
