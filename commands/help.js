module.exports = function(args) {
	if(args.includes("--silent")) return;

	console.log("Usage: librimod <command>\n" +
				"\n" +
				"For <command> you can choose from:\n" +
				"    create".padEnd(40, " ") + "Create your new librimod.\n" + 
				"    help".padEnd(40, " ") + "Display this menu containing information about the command usage.\n" +
				"    publish".padEnd(40, " ") + "Publish the unpublished version for the module to the librimod registry.\n" +
				"    version".padEnd(40, " ") + "Upgrade the version of your librimod. Use \"librimod publish\" to push your changes to the registry.\n" +
				"        --path, --minor, --major".padEnd(40, " ") + "Upgrade the version with a patch, minor or major change respectively.\n" +
				"    login".padEnd(40, " ") + "Log into your account at the librimod registry. Accounts can be created from the librimod website.\n" +
				"    logout".padEnd(40, " ") + "Log out of your current account."
	);
}