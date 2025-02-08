const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {
  
    if(message.author.id === `408289224761016332` || // AndroidNation#9041
      message.author.id === `299217118682152961` || // !TredoxModz#6034
      message.author.id === `237490126714961920`    // Tsunami#6271
      ) {
    
      const helpOwnerEmbed = new Discord.MessageEmbed()
      .setColor(0x9b00ff)
      .setTitle(`🤖 | ${client.user.username} Help`)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`Here are my commands:`)
      .addField(`Legendary Royale™ (2)`, `**${prefix}download**, **${prefix}website**`)
      .addField(`Moderation (1)`, `**${prefix}clear**`)
      .addField(`Other (4)`, `**${prefix}membercount**, **${prefix}ping**, **${prefix}say**, **${prefix}translate**`)
      .addField(`Owner (2)`, `**${prefix}eval**, **${prefix}invite**`)
      .setTimestamp()
      .setFooter(`${prefix} | ${client.user.username}`)
      message.channel.send(helpOwnerEmbed)
      .then(message.react("🤖"));
    
    } else {
  
      const helpEmbed = new Discord.MessageEmbed()
      .setColor(0x9b00ff)
      .setTitle(`🤖 | ${client.user.username} Help`)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`Here are my commands:`)
      .addField(`Legendary Royale™ (2)`, `**${prefix}download**, **${prefix}website**`)
      .addField(`Moderation (1)`, `**${prefix}clear**`)
      .addField(`Other (4)`, `**${prefix}membercount**, **${prefix}ping**, **${prefix}say**, **${prefix}translate**`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      message.channel.send(helpEmbed)
      .then(message.react("🤖"));
    }
  }

  module.exports.help = {
    name: "help"
}