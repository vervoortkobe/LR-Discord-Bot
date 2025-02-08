const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    if(message.author.id === `408289224761016332` || // AndroidNation#9041
      message.author.id === `299217118682152961` || // !TredoxModz#6034
      message.author.id === `244560322604695552` || // Der echte Jim Knopf#1011
      message.author.id === `302907024780296193` || // felixisaac.dev#5466
      message.author.id === `237490126714961920`    // Tsunami#6271
      ) {
    
      message.channel.send(`☑️ | Pls check your dm's, ${message.author}!`);
  
      const inviteEmbed = new Discord.MessageEmbed()
      .setColor(0x9b00ff)
      .setTitle(`🤖 | ${client.user.username} Invite`)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`You can invite ${client.user.username} [here](https://discordapp.com/api/oauth2/authorize?client_id=672476174965932050&permissions=8&scope=bot)!`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      message.author.send(inviteEmbed)
      .then(message.react("🤖"));
  
    } else {
    
      return message.channel.send(`❌ | I couldn't send you the invite, because you are not an owner (AndroidNation#9041, !TredoxModz#6034, Der echte Jim Knopf#1011, felixisaac.dev#5466 or Tsunami#6271) of this bot!`);
    
    }
  }

  module.exports.help = {
    name: "invite"
}