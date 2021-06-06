const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
const config = require("../../config.js");
const { Client, Util } = require('discord.js');
const botsdata = require("../database/models/botlist/bots.js");
const parseMilliseconds = require("parse-ms")
module.exports = {
  name: "give-votes",
  aliases: ["give"],
 run: async(client, message, args) => {
   if(message.author.id === "720632216236851260")
{
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
      
    
         const votes = require("../database/models/botlist/vote.js");
      let botdata = await botsdata.findOne({ botID: bot.id });
      if(!botdata)
      {
        return message.channel.send("Not a bot");
      }
      let x = await votes.findOne({user: message.author.id,bot: bot.id})
  
      await votes.findOneAndUpdate({bot: bot.id, user: message.author.id }, {$set: {Date: Date.now(), ms: 43200000 }}, {upsert: true})
      await botsdata.findOneAndUpdate({botID: bot.id}, {$inc: {votes: args[1]}})
     
      message.channel.send(`Done You have voted for <@${bot.id}>`)
    

 }
 }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["v"],
  permLevel: 0
};