const inquirer = require("inquirer");
const path = require("path");
const mustache = require("mustache");
const fs = require("fs");
const cp = require("child_process");
const settings = require("../settings");

module.exports = async function(args) {
	const awnsers = await inquirer.prompt([
		{type: "string", name: "name", message: "What will be the name of the librimod?", default: path.basename(process.cwd())},
		{type: "string", name: "version", message: "What version will you start with?", default: "0.0.1"},
		{type: "string", name: "author", message: "Who will be the author?", default: settings.username},
		{type: "string", name: "index", message: "What will be the name of the index file?", default: "index.js"},
	]);
	
	console.log("Generating build.js and package.json");

	fs.copyFileSync(path.join(__dirname, "../defaults/build.js"), path.join(process.cwd(), "build.js"));

	if(!fs.existsSync(path.join(process.cwd(), awnsers.index))) {
		fs.writeFileSync(path.join(process.cwd(), awnsers.index), "");
	}

	if(!fs.existsSync(path.join(process.cwd(), ".gitignore"))) {
		fs.copyFileSync(path.join(__dirname, "../defaults/.gitignore"), path.join(process.cwd(), ".gitignore"));
	}

	let packageData = fs.readFileSync(path.join(__dirname, "../defaults/package.json"));

	fs.writeFileSync(path.join(process.cwd(), "package.json"), mustache.render(packageData.toString(), awnsers));

	console.log("Installing all required modules");

	cp.execSync("npm install --save-dev");
}