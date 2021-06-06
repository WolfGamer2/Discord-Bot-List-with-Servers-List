const Discord = require("discord.js");
const fs = require("fs");
const cnf = require('../../config.js');

module.exports = {
  name: "help",
  aliases: [],
 run: async(client, message, args) => {
const embed = new Discord.MessageEmbed()
.setDescription("Help of dumbbotlist.tk Official bot")
.addField("Commands list", "`eval`, `nameall`, `staff-queue`, `bots`, `botinfo`, `say`, `totalbots`, `verify`, `vote`, `check`, `announce`, `decline`, `approve`, `certi give`, `certi decline`")
message.channel.send(embed)
 }
}