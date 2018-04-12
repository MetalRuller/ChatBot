const Discord = require('discord.js');
const tokens = require("./token");
const instantiateCommands = require("./instantiateCommands");
const instantiateUtilities = require("./instantiateUtilities");
const client = new Discord.Client();
client.setMaxListeners(0);

const commandList = new (require('./src/CommandContainer'));
const cache = new (require('./src/Cache'));
const dependencyGraph = {
    'discordClient': client,
    'commandPrefix': '!',
    'commandList': commandList,
    'https': require('https'),
    'Date': Date,
    'JSON': JSON,
    'Cache': cache
};
cache.initialize(dependencyGraph);

for (let key in instantiateCommands) {
    if (!instantiateCommands.hasOwnProperty(key)) continue;
    let commandPath = './src/Command/' + instantiateCommands[key];
    let command = new (require(commandPath));
    command.initialize(dependencyGraph);

    commandList.add(key, command);
}

for (let key in instantiateUtilities) {
    if (!instantiateUtilities.hasOwnProperty(key)) continue;
    let utilityPath = './src/Utility/' + instantiateUtilities[key];
    let utility = new (require(utilityPath));
    utility.initialize(dependencyGraph);
}

client.on('ready', () => {
    client.user.setActivity("on Shotbow");
    console.log("Successfully logged in!");
});

client.login(tokens.getToken());
