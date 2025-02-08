const express = require("express");
var Client = require("uptime-robot");

const app = express();

app.get("/", (req, res) => {
  res.send("online");
});

app.use(express.static("public"));
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port" + listener.address().port);
});

///////////////////////////////////////////////////////////////////////////////////

const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({ allowedMentions: { parse: ["users", "roles"], repliedUser: true }, intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_PRESENCES, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.DIRECT_MESSAGES], partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"] });
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
let prefix = process.env.PREFIX;
const fetch = require("node-fetch");

fs.readdir("./commands/", (err, files) => {
 
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Can/'t find the commands map!");
      return;
    }
   
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} was loaded!`);
      client.commands.set(props.help.name, props);
    });
  });


  client.on("ready", async () => {
    console.log(`${client.user.tag} was started!`);
    client.user.setActivity(`${prefix}help | ${client.user.username}`, {type: "PLAYING"});
  });

////////////////////////////////////////////////////////////////////////////////////////////////////

  client.on("guildMemberAdd", async member => {
    let createdat = Number((Date.now() - member.user.createdAt) / 86400000).toFixed(0);
    if(createdat < 3) {
      member.guild.members.ban(member, { reason: "AUTOMOD: BOT SUSPICION" });

      member.guild.channels.cache.find(c => c.id === "").send(`:white_check_mark: AUTOMOD: BOT SUSCPICION BANNED ${member}!`);
    }
  });

/////////////////////////////////////////////////////////////////////////////////////////////
//ANTISPAM

  const AntiSpam = require('discord-anti-spam');
  const antiSpam = new AntiSpam({
      warnThreshold: 5,
      kickThreshold: 10,
      banThreshold: 15,
      maxInterval: 2000,
      warnMessage: ':helmet_with_cross: | **AUTOMOD** has **warned ${@user}** for **spamming**!',
      kickMessage: ':helmet_with_cross: | **AUTOMOD** has **kicked ${user_tag}** for **spamming**!',
      banMessage: ':helmet_with_cross: | **AUTOMOD** has **banned ${user_tag}** for **spamming**!',
      maxDuplicatesWarning: 5,
      maxDuplicatesKick: 10,
      maxDuplicatesBan: 15,
      exemptPermissions: ['ADMINISTRATOR'],
      ignoreBots: true,
      verbose: true,
      ignoredUsers: []
  });

  client.on('message', async message => {
    if(message.channel.id === "330288282992902144")
    antiSpam.message(message);
  });
  
/////////////////////////////////////////////////////////////////////////////////////////////

  client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    if(message.content.toLowerCase().includes("download")) {
    
      const downloadEmbed = new Discord.MessageEmbed()
      .setColor(0x9b00ff)
      .setTitle(`📥 | ${client.user.username} Download`)
      .setThumbnail(client.user.displayAvatarURL())
      .addField(`❌ | Legendary Royale™`, `Not available anymore!`)
      .addField(`❌ | Legendary Brawl™`, `Not available anymore!`)
      .addField(`❓ | Why are the downloads not available anymore?`, `We, the LR community, stopped.\nSo you can't play our games anymore.\nCheck ${message.guild.channels.cache.find(c => c.id === "413085719611965472")} for more information about this.`)
      .addField(`😄 | Other private servers`, `> [Master Royale](https://masterroyale.net/)
> [Null's Royale](https://nulls.gg/)`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      message.channel.send(downloadEmbed);
    }
   
    if(!message.content.startsWith(prefix)) return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(command.slice(prefix.length));
    if(commandfile) commandfile.run(client, message, args);


});
 
client.login(process.env.TOKEN);