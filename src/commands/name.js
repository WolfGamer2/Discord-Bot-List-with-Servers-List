const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const botdata = require("../database/models/botlist/bots.js")
module.exports = {
  name: "all-name",
  aliases: ["name-all", "allbots", "ab", "nameall"],
 run: async(client, message, args) => {
   if(message.member.roles.cache.has("849623732925366289"))
{
   let x = await botdata.find();
    count = 0;
   const embed = new Discord.MessageEmbed()
   .setTitle("All Bots with Owner mention and bot mention")
   x.forEach(bot => {
     embed.addField(`${count + 1}`, `Bot: <@${bot.botID}> Owner: <@${bot.ownerID}>`)
     count = count + 1;
  
   })
   await message.channel.send(embed);
 
}



 }
}