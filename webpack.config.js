const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	entry: './src/index.js',
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
		}),
	],
};
