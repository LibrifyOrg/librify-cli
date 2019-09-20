const webpack = require("webpack");
const util = require("util");
const path = require("path");
const packageConfig = require("./package.json");
const webpackConfig = {
	entry: ["babel-polyfill", path.join(process.cwd(), packageConfig.index)].concat(packageConfig.entry || []),
	output: {
		path: path.resolve(process.cwd(), packageConfig.dist),
		filename: packageConfig.index
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /\/node_modules\//,
				loader: "babel-loader"
			},
			{
				test: /\.scss$/,
				use: [
					"file-loader",
					"extract-loader",
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
	target: "node"
};

const startTime = process.hrtime();

util.promisify(webpack)(webpackConfig)
.then(() => {
	const endTime = process.hrtime(startTime);

	console.log(`Build ${packageConfig.name} successfully in ${endTime[0]}s and ${endTime[1] / 1000000}ms`);
});