const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
const config = require("../../config.js");
const { Client, Util } = require('discord.js');
const botsdata = require("../database/models/botlist/bots.js");
module.exports = {
  name: "vote",
  aliases: ["v"],
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
         const votes = require("../database/models/botlist/vote.js");
      let botdata = await botsdata.findOne({ botID: bot.id });
      let x = await votes.findOne({user: message.author.id,bot: bot.id})
      if(x) return message.channel.send("You can only vote in 12 Hours.")
      await votes.findOneAndUpdate({bot: bot.id, user: message.author.id }, {$set: {Date: Date.now(), ms: 43200000 }}, {upsert: true})
      await botsdata.findOneAndUpdate({botID: bot.id}, {$inc: {votes: 1}})
      client.channels.cache.get("849623735047946303").send(`**${message.author.username}** voted **${botdata.username}** **\`(${botdata.votes + 1} votes)\`**`)
      message.channel.send(`Done You have voted for <@${bot.id}>`)


 }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["v"],
  permLevel: 0
};