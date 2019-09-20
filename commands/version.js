const fs = require("fs");
const semver = require("semver");
const path = require("path");

module.exports = function version(args) {
	let configPath = path.join(process.cwd(), "librimod.json");
	let packagePath = path.join(process.cwd(), "package.json");
	let config;

	if(fs.existsSync(configPath)) {
		try {
			config = require(configPath);
		}
		catch(e) {
			return console.error("ERR: An error occured while parsing librimod.json:", e.message);
		}
	}
	else if(fs.existsSync(packagePath)) {
		try {
			config = require(packagePath);
		}
		catch {
			return console.error("ERR: An error occured while parsing package.json:", e.message);
		}
	}
	else {
		return console.error("ERR: Nor a librimod.json file nor package.json could be found.");
	}

	if(config === undefined) {
		return console.error("ERR: The librimod config wasn't found in librimod.json or package.json");
	}
	else if(config.name === undefined || config.version === undefined || config.author === undefined) {
		return console.error("ERR: The librimod config is missing required settings");
	}

	let release = args[0];

	if(release === undefined) {
		return console.log(config.version);
	}
	else if(!release.startsWith("--")) {
		return console.error("ERR: The option supplied to increment the version is incorrect.");
	}
	
	release = release.substring(2, release.length);

	let newVersion = semver.inc(config.version, release);

	if(newVersion === null) {
		return console.error("ERR: The option supplied to increment the version is incorrect.");
	}

	console.log(`The version was changed from ${config.version} to ${newVersion}`);

	config.version = newVersion;

	if(packageData !== undefined) {
		package.librimod = config;
		fs.writeFileSync(path.join(process.cwd(), "package.json"), JSON.stringify(package));
	}
	else {
		fs.writeFileSync(path.join(process.cwd(), "librimod.json"), JSON.stringify(config));
	}
}