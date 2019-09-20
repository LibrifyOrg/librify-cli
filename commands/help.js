module.exports = function(args) {
	if(args.includes("--silent")) return;

	console.log("Usage: librimod <command>\n" +
				"\n" +
				"For <command> you can choose from:\n" +
				"    create, c".padEnd(40, " ") + "Create your new librimod.\n" + 
				"    help, h".padEnd(40, " ") + "Display this menu containing information about the command usage.\n" +
				"    publish, p".padEnd(40, " ") + "Publish the unpublished version for the module to the librimod registry.\n" +
				"    version, v".padEnd(40, " ") + "Upgrade the version of your librimod. Use \"librimod publish\" to push your changes to the registry.\n" +
				"      --path, --minor, --major".padEnd(40, " ") + "Upgrade the version with a patch, minor or major change respectively.\n" +
				"    test, t".padEnd(40, " ") + "Test your librimod using a predefined installation of Librify.\n" +
				"    login, li <username> <password>".padEnd(40, " ") + "Log into your account at the librimod registry.\n" +
				"    logout, lo".padEnd(40, " ") + "Log out of your current account.\n" +
				"    register, r <username> <password>".padEnd(40, " ") + "Register a librimod account, needed for publishing librimods.\n" +
				"    me".padEnd(40, " ") + "See whose account is currently logged in.\n"
	);
}