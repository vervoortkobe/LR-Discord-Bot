const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    
    if(message.author.id === `408289224761016332` || // AndroidNation#9041
      message.author.id === `299217118682152961` || // !TredoxModz#6034
      message.author.id === `237490126714961920`    // Tsunami#6271
      ) {
        
      let cmd = args.join(" ");
      if(!cmd) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setDescription(`:x: **|** ***Error: Please define a code to evaluate!***`)
        return message.channel.send(errorEmbed);
      }
        
      if(cmd.toLowerCase().includes("token") || cmd.toLowerCase().includes("config.") || cmd.toLowerCase().includes("process.env")) {
        const errorEmbed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setDescription(`:x: **|** ***Error: That is forbidden!***`)
        return message.channel.send(errorEmbed);
      }

      const clean = text => {
        if(typeof text === "string")
          return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
          else return text;
      }

      try {
        const code = args.slice(0).join(" ");
        let evaled = eval(code);

        if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), { code: "xl" });
      } catch(err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
  }

  module.exports.help = {
    name: "help"
}