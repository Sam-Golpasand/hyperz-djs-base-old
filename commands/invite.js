module.exports = {
    name: 'invite',
    description: 'A Command.',
    aliases: ['inv'],
    async execute(client, message, args, Discord, config){
        const pingEmbed = new Discord.MessageEmbed()
        .setColor(config["main_config"].colorhex)
        .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL()}`, `${config["other_configuration"].serverinvite}`)
        .setDescription(`**Invite:** [here](${config["other_configuration"].serverinvite})`)
        .setTimestamp()
        .setFooter(`${config["main_config"].copyright}`)
        
        message.channel.send(pingEmbed).then(msg => msg.delete({ timeout: 10000 })).catch(e => {if(config["main_config"].debugmode) return console.log(e);});
        message.delete().catch(e => {if(config["main_config"].debugmode) return console.log(e);});
    },
}