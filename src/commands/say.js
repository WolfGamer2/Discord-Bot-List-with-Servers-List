module.exports = {
  name: "say",
  aliases: ["s"],
 run: async(client, message, args) => {
if(!args[0])
{
  return message.channel.send("give me something to say.");
}
if(message.member.roles.cache.has("849653061893750824") || message.member.roles.cache.has("849653292769869855"))
{
message.channel.send(args.join(" "));
}
 }
}