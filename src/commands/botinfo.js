const Discord = require('discord.js');
const client = new Discord.Client();
const bots = require("../database/models/botlist/bots.js");
module.exports = {
  name: "botinfo",
  aliases: [],
 run: async(client, message, args) => {
  
    var bot = message.mentions.users.first()
    if(bot)
    {
      var bot = bot;
    } else {
      var bot = args[0];
     var bot = client.users.cache.get(bot)
    }
    if(!bot)
    {
      return message.channel.send("You have given an invalid bot id or mention")
    }
    
   let b = await bots.findOne({ botID: bot.id });
   if(!b) return message.channel.send("Invalid bot id.")
   let website = b.website ?  " | [Website]("+b.website+")" : "";
   let github = b.github ? " | [Github]("+b.github+")" : "";
   let discord = b.support ? " | [Support Server]("+b.support+")" : "";
   let coowner;
   if(!b.coowners.length <= 0) {
     coowner = b.coowners.map(a => "<@"+a+">").join("\n");
   } else {
     coowner = "";
   }
   const embed = new Discord.MessageEmbed()
   .setThumbnail(b.avatar)
   .setAuthor(b.username+"#"+b.discrim, b.avatar)
   .setDescription("**[Vote for the bot named "+b.username+"#"+b.discrim+" in Dumb Bot List.](https://dumbbotlist.tk/bot/"+b.botID+"/vote)**")
   .addField("ID", b.botID, true)
   .addField("Username", b.username, true)
   .addField("Discriminator", b.discrim, true)
   .addField("Votes", b.votes, true)
   .addField("Certificate", b.certificate, true)
   .addField("Short Description", b.shortDesc, true)
   .setColor("#7289da")
   .addField("Server Count", `${b.serverCount || "N/A"}`, true)
   .addField("Owner(s)", `<@${b.ownerID}>\n${coowner.replace("<@>", "")}`, true)
   .addField("Links", `[Invite](https://discord.com/oauth2/authorize?client_id=${b.botID}&scope=bot&permissions=8)${website}${discord}${github}`, true)
   message.channel.send(embed)
}
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
  };
  
  exports.help = {
    name: "bot-info",
    description: "",
    usage: ""
  };