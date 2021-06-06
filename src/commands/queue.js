const Discord = require('discord.js')
const vcodes = require("vcodes.js");
const botdata = require("../database/models/botlist/bots.js")
module.exports = {
  name: "staff-queue",
  aliases: ["queue-staff"],
 run: async(client, message, args) => {
   if(message.member.roles.cache.has("849653061893750824") || message.member.roles.cache.has("849653292769869855"))
{
   let x = await botdata.find();
   const embed = new Discord.MessageEmbed()
   .setTitle("Dumb Bot list Queue")
 let test = x.filter(a => a.status === "UnApproved");
 if(!test[0])
 {
   return message.channel.send("**Your Job is Done!!**");
 }
 console.log(test)
 test.map(b => {
   if(!b)
   {
      return embed.setDescription("**Your Job is done!!!**")
   }
    embed.addField(`${b.username}`, `[Invite:](https://discord.com/api/oauth2/authorize?client_id=${b.botID}&permissions=0&scope=bot)`)
  })

  await message.channel.send(embed)
   
 
}



 }
}