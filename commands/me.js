const settings = require("../settings");

module.exports = function(args) {
	console.log(settings.username || "You're not logged in");
}