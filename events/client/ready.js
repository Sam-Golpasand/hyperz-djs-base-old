const figlet = require('figlet');
const chalk = require('chalk');
let i = 0;

module.exports = (client, Discord, config) =>{
  
    let daPort = config["main_config"].port

    const express = require("express");
    const app = express()
    app.listen(daPort)

    try {
        startupScreen(figlet, chalk)
        changeStatus(client, config)
        voiceCon(client, config, chalk)
    } catch(e) {
        console.log(chalk.red(e))
    }

    async function changeStatus(client, config) {
        if (i >= config.presence_config.length) i = 0;
        await client.user.setPresence({
            activity: {
                name: config.presence_config[i].name,
                type: config.presence_config[i].type
            },
            status: config.presence_config[i].status
        });
        i++;
        setTimeout(() => {
            changeStatus(client, config);
        }, 10000)
    };

    async function startupScreen(figlet, chalk) {
            
        figlet('Hyperz', function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.log(chalk.blue(data))
            console.log(`\n\nCreated by ${chalk.blue('Hyperz Development')}\n---\n${client.user.tag} is now ${chalk.green('ready!')}\nGuild Count: ${chalk.blue(client.guilds.cache.size)}\nUser Count: ${chalk.blue(client.users.cache.size)}\nDefault Prefix: ${chalk.blue(config.main_config.prefix)}\nCopyright: ${chalk.blue(config.main_config.copyright)}\n---\nCONSOLE LOGGING BELOW\n---\n\n`)
        });
        
    };

    async function voiceCon(client, config, chalk) {
        
        setTimeout(() => {
            const channel = client.channels.cache.get(config["main_config"].voicechanneltojoin);
            if (!channel) return console.log(chalk.yellow(`The voice channel does not exist (change main_config's voicechanneltojoin)!`));
            channel.join().then(connection => {
                console.log(chalk.green("Successfully connected to the voice channel!"))
            }).catch(e => {
                console.error(e);
            });
        }, 2500)
        
    };

}