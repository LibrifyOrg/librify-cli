#! /usr/bin/env node

const helpCommand = require("./commands/help");
const publishCommand = require("./commands/publish");
const loginCommand = require("./commands/login");
const logoutCommand = require("./commands/logout");
const meCommand = require("./commands/me");
const versionCommand = require("./commands/version");
const createCommand = require("./commands/create");
const testCommand = require("./commands/test");
const registerCommand = require("./commands/register");
const commands = [
	{name: ["help", "h"], callback: helpCommand},
	{name: ["publish", "p"], callback: publishCommand},
	{name: ["login", "li"], callback: loginCommand},
	{name: ["logout", "lo"], callback: logoutCommand},
	{name: ["version", "v"], callback: versionCommand},
	{name: ["me"], callback: meCommand},
	{name: ["create", "c"], callback: createCommand},
	{name: ["test", "t"], callback: testCommand},
	{name: ["register", "r"], callback: registerCommand}
];

const args = process.argv;
args.shift();
args.shift();

const commandArg = args.shift();

for(let command of commands) {
	if(command.name.includes(commandArg)){
		return command.callback(args);
	}
}

helpCommand([]);