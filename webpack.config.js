const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devtool: 'eval-source-map',
	mode: 'production',
	entry: './src/index.js',
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
		}),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10240, // Set the limit to 10KB (10240 bytes)
							name: '[name].[ext]', // Specify the emitted file name
							outputPath: 'images/', // Output path for emitted files
						},
					},
				],
			},
		],
	},
};
