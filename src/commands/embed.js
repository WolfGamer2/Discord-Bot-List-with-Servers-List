const discord = require("discord.js");
module.exports = {
  name: "announcement",
  aliases: ["sendembed", "announce"],
 run: async(client, message, args) => {
if(!args[0])
{
  return message.channel.send("give me something to say in embed.");
}
if(message.member.roles.cache.has("849653061893750824") || message.member.roles.cache.has("849653292769869855"))
{
  const embed = new discord.MessageEmbed()
  .setDescription(args.join(" "))
  .setColor("BLUE")
message.channel.send(embed);
message.delete()
}
 }
}