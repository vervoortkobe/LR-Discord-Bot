const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {
  
    let onlineCount = message.guild.members.cache.filter(member => member.presence.status === 'online').size;
    let idleCount = message.guild.members.cache.filter(member => member.presence.status === 'idle').size;
    let dndCount = message.guild.members.cache.filter(member => member.presence.status === 'dnd').size;
    let offlineCount = message.guild.members.cache.filter(member => member.presence.status === 'offline').size;

    const membercountEmbed = new Discord.MessageEmbed()
    .setColor(0x9b00ff)
    .setTitle(`📊 | ${client.user.username} Membercount`)
    .setThumbnail(message.guild.iconURL())
    .setDescription(`**Membercount of** \`${message.guild.name}\``)
    .addField(`Total Count`, `\`${message.guild.members.cache.size}\` Members`, true)
    .addField(`Human Count`, `\`${message.guild.members.cache.filter(member => !member.user.bot).size}\` Humans`, true)
    .addField(`Bot Count`, `\`${message.guild.members.cache.filter(member => member.user.bot).size}\` Bots`, true)
    .addField(`Online | Idle | DND | Offline`, `\`${onlineCount}\` | \`${idleCount}\` | \`${dndCount}\` | \`${offlineCount}\``, true)
    .setTimestamp()
      .setFooter(`${prefix} | ${client.user.username}`)
    message.channel.send(membercountEmbed)
    .then(message.react("📊"));
  }

  module.exports.help = {
    name: "membercount"
}