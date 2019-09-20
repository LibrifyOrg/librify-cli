const http = require("http");
const fs = require("fs");
const path = require("path");
const settings = require("../settings.json");

module.exports = function(args) {
	let req = http.request("http://localhost/registry/api/logout", {method: "POST", headers: {authorization: `Bearer ${settings.token}`}}, res => {
		let data = "";
		
		res.on("data", chunk => data += chunk);
		res.on("end", () => {
			if(res.statusCode !== 200) return console.error(`ERR: There was an error while logging out (${JSON.parse(data).message})`);

			settings.token = undefined;
			settings.username = undefined;

			fs.writeFileSync(path.join(__dirname, "../settings.json"), JSON.stringify(settings));

			console.log("You are now logged out");
		});
	});

	req.end();
}