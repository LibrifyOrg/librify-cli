const http = require("http");

module.exports = function(args) {
	let username = args[0];
	let password = args[1];

	if(username === undefined || password === undefined) {
		return console.error("ERR: No username and/or password were supplied");
	}

	let req = http.request("http://localhost/registry/api/register", {method: "POST"}, res => {
		let data = "";

		res.setEncoding("utf8");
		res.on("data", chunk => data += chunk);
		res.on("end", () => {
			if(res.statusCode !== 200) return console.error(`ERR: There was an error while registering (${JSON.parse(data).message})`);
			
			console.log(`You've now registered the user ${JSON.parse(data).username}`);
		});
	});

	req.end(JSON.stringify({username, password}));
}