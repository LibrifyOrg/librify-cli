const http = require("http");
const fs = require("fs");
const path = require("path");
const settings = require("../settings.json");

module.exports = function(args) {
	if(settings.token) console.error("ERR: Please log out using \"librimod logout\" before logging in.");

	let username = args[0];
	let password = args[1];

	if(username === undefined || password === undefined) {
		return console.error("ERR: No username and/or password were supplied");
	}

	let req = http.request("http://localhost/registry/api/login", {method: "POST"}, res => {
		let data = "";

		res.setEncoding("utf8");
		res.on("data", chunk => data += chunk);
		res.on("end", () => {
			if(res.statusCode !== 200) return console.error(`ERR: There was an error while logging in (${JSON.parse(data).message})`);

			let parsedData = JSON.parse(data);

			settings.token = parsedData.token;
			settings.username = parsedData.username;

			fs.writeFileSync(path.join(__dirname, "../settings.json"), JSON.stringify(settings));
			console.log("You're now logged in as:", username);
		});
	});

	req.end(JSON.stringify({username, password}));
}