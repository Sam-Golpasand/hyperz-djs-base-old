const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['Command', 'Event'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord, config)
})

client.login(config["main_config"].token)
// This base is outdated
