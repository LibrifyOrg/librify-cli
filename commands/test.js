const path = require("path");
const fs = require("fs");
const rimraf = require("rimraf");
const cp = require("child_process");
const util = require("util");
const ncp = require("ncp").ncp;

module.exports = function(args) {
	let configPath = path.join(process.cwd(), "librimod.json");
	let packagePath = path.join(process.cwd(), "package.json");
	let config;

	if(fs.existsSync(configPath)) {
		config = require(configPath);
	}
	else {
		try {
			config = require(packagePath);
		}
		catch {
			return console.error("ERR: Can't find the package.json");
		}
	}

	if(config === undefined) {
		return console.error("ERR: The librimod config wasn't found in librimod.json or package.json");
	}

	let testFolder = args[0] || config.testFolder;

	if(!testFolder) {
		return console.error("ERR: No folder for the test installation has been provided in the config");
	}

	if(config.publish) {
		console.log(`Executing the publish hook`);

		process.stdout.write(cp.execSync(config.publish, {cwd: process.cwd()}).toString());
	}

	testFolder = path.join(process.cwd(), testFolder);
	let pluginFolder = path.join(testFolder, "./plugins/", `./${config.name}/`);

	if(!fs.existsSync(pluginFolder) || !fs.statSync(pluginFolder).isDirectory()) {
		fs.mkdirSync(pluginFolder);
	}

	util.promisify(rimraf)(pluginFolder)
	.then(() => {
		if(config.dist) {
			console.log(`Copying the dist folder to ${pluginFolder}`);

			return util.promisify(ncp)(path.join(process.cwd(), config.dist), pluginFolder);
		}
		else {
			console.log(`Copying the project folder to ${pluginFolder}`);

			return util.promisify(ncp)(process.cwd(), pluginFolder);
		}
	}, err => console.error(`ERR: There was an error while cleaning (${err.message})`));
	/*.then(() => {
		console.log(`Starting the librify installation`);

		cp.spawn(/^win/.test(process.platform) ? "npm.cmd" : "npm", ["run", "dev"], {cwd: testFolder}).stdout.on("data", data => process.stdout.write(data));
	}, err => console.error(`ERR: There was an error while copying (${err.message})`));*/
}