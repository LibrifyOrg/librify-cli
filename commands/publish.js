const path = require("path");
const fs = require("fs");
const http = require("http");
const tar = require("tar");
const cp = require("child_process");
const settings = require("../settings.json");

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
	else if(config.name === undefined || config.version === undefined || config.author === undefined || config.index === undefined) {
		return console.error("ERR: The librimod config is missing required settings");
	}

	if(config.publish) {
		console.log(`Executing the publish hook`);

		process.stdout.write(cp.execSync(config.publish, {cwd: process.cwd()}).toString());
	}

	console.log(`Publishing the librimod ${config.name} with version ${config.version}`);

	let req = http.request("http://localhost/registry/api/publish", {method: "POST", headers: {authorization: `Bearer ${settings.token}`}}, res => {
		let data = "";
		
		res.on("data", chunk => data += chunk);
		res.on("end", () => {
			if(res.statusCode !== 200) return console.error(`ERR: There was an error while publishing (${JSON.parse(data).message})`);

			console.log("The librimod has been published");
		});
	});

	req.write(`${JSON.stringify({name: config.name, version: config.version, contributors: config.contributors, author: config.author})}\n\n`);
	tar.create({gzip: true, filter: path => !path.includes(".git") && !path.includes("node_modules"), cwd: path.join(process.cwd(), config.dist)}, ["./"]).pipe(req);
}