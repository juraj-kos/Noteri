const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/index.ts",
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: "babel-loader",
				},
				exclude: /node_modules/,
			},
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						options: { minimize: true },
					},
				],
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: "svg-inline-loader",
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
		}),
	],
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
};
