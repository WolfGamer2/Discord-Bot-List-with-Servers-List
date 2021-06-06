const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
const config = require("../../config.js");
const { Client, Util } = require('discord.js');
const botsdata = require("../database/models/botlist/bots.js");
const parseMilliseconds = require("parse-ms")
module.exports = {
  name: "voted",
  aliases: ["check-voted", "check"],
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

      let x = await votes.findOne({user: message.author.id,bot: bot.id})
          let botdata = await botsdata.findOne({ botID: bot.id });
        if(!botdata)
      {
        return message.channel.send("Not a bot");
      }
      
      
      if(x)
      {
        var timeleft = await parseMilliseconds(x.ms - (Date.now() - x.Date));
       var hour = timeleft.hours;
       var minutes = timeleft.minutes;
       var seconds = timeleft.seconds;
   
        return await message.channel.send(`You can vote again in ${hour}h ${minutes}m ${seconds}s`);
       
      } else {
        return message.channel.send("You can vote again");
      }

 }
 }