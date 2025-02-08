const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {
  
    const websiteEmbed = new Discord.MessageEmbed()
    .setColor(0x9b00ff)
    .setTitle(`🖥️ | ${client.user.username} Website`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Visit the official Legendary Royale™ Website [here](https://legendary-royale.net)!`)
    .setFooter(`${prefix} | ${client.user.username}`)
    .setTimestamp()
    message.channel.send(websiteEmbed)
    .then(message.react("🖥️"));
  }

  module.exports.help = {
    name: "website"
}