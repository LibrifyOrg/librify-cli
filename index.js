#! /usr/bin/env node

const helpCommand = require("./commands/help");
const commands = [
	{name: ["help", "h"], callback: helpCommand}
];

const args = process.argv;
args.shift();

const commandArg = args.shift();

for(let command of commands) {
	if(command.name.includes(commandArg)){
		return command.callback(args);
	}
}

helpCommand([]);