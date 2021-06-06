const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const botdata = require("../database/models/botlist/bots.js")
module.exports = {
  name: "total-bots",
  aliases: ["t-b", "tb"],
 run: async(client, message, args) => {
   if(message.member.roles.cache.has("849653061893750824") || message.member.roles.cache.has("849653292769869855"))
{
   let x = await botdata.find();
   message.channel.send(`Dumb bot list have total ${x.length} bots currently`);
}



 }
}