const inquirer = require("inquirer");
const path = require("path");
const mustache = require("mustache");
const fs = require("fs");
const cp = require("child_process");
const settings = require("../settings");

module.exports = function(args) {
	inquirer.prompt([
		{type: "string", name: "name", message: "What will be the name of the librimod?", default: path.basename(process.cwd())},
		{type: "string", name: "version", message: "What version will you start with?", default: "0.0.1"},
		{type: "string", name: "author", message: "Who will be the author?", default: settings.username},
		{type: "string", name: "index", message: "What will be the name of the index file?", default: "index.js"},
	])
	.then(awnsers => {
		console.log("Generating build.js and package.json");

		fs.copyFileSync(path.join(__dirname, "../defaults/build.js"), path.join(process.cwd(), "build.js"));

		let packageData = fs.readFileSync(path.join(__dirname, "../defaults/package.json"));

		fs.writeFileSync(path.join(process.cwd(), "package.json"), mustache.render(packageData.toString(), awnsers));

		console.log("Installing all required modules");

		cp.execSync("npm install --save-dev");
	});
}