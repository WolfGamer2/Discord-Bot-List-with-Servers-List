/*=======================================================================================*/
const Discord = require("discord.js");
const { Client, Collection } = require("discord.js");
const client = (global.Client = new Client())
const config = require("./config.js");
global.config = config;
const fs = require("fs");
const fetch = require("node-fetch");
client.htmll = require('cheerio');




/*=======================================================================================*/



/*=======================================================================================*/
require('events').EventEmitter.prototype._maxListeners = 100;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./src/commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
client.on('message', async message => {
    let p = config.bot.prefix
    let client = message.client;
    if (message.author.bot) return;
    if (!message.content.startsWith(p)) return;
  
    let params = message.content.split(" ").slice(1);
    const args = message.content.slice(p.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
    

    let command = client.commands.get(cmd)
  if(!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
    command.run(client, message, params, p, args);
    }
})
/*=======================================================================================*/


/*=======================================================================================*/
client.on('ready',async () => {


    console.log("(!) Bot successfully connected to discord.");
    let botsSchema = require("./src/database/models/botlist/bots.js");
    const bots = await botsSchema.find();
    client.user.setPresence({ activity: { type: 'WATCHING', name: 'dumbbotlist.tk | '+bots.length+' bots' }, status: "idle" });
})
/*=======================================================================================*/



/*=======================================================================================*/
const claudette = require("./src/database/models/uptime.js")
    setInterval(() => {
        claudette.find({}, function (err, docs) {
            if(err) console.log(err)
            if(!docs) return;
            docs.forEach(docs => {
                fetch(docs.link).catch()
            })
        })
    }, 10000)

client.on('guildMemberRemove', async member => {
    if(member.guild.id !== config.serverID) return
        claudette.find({ userID: member.id }, async function (err,docs) {
            await docs.forEach(async a => {
            await claudette.findOneAndDelete({ userID: member.id, code: a.code, server: a.server, link: a.link })
            })
        })
    })
/*=======================================================================================*/


/*=======================================================================================*/
const votes = require('./src/database/models/botlist/vote.js')
    client.on('ready', async () => {
        setInterval(async () => {
            let datalar = await votes.find()
            if(datalar.length <= 0) return
            datalar.forEach(async a => {
                let süre = a.ms - (Date.now() - a.Date)
                if(süre > 0) return
                await votes.findOneAndDelete({ bot: a.bot, user: a.user })
            })
        }, 30000)
})
/*=======================================================================================*/


/*=======================================================================================*/
client.on('guildMemberRemove', async member => {
    const botlar = require('./src/database/models/botlist/bots.js')
    let data = await botlar.findOne({ ownerID: member.id })
    if(!data) return
    let find = await botlar.find({ ownerID: member.id })
    await find.forEach(async b => {
        member.guild.members.cache.get(b.botID).kick();
        await botlar.deleteOne({ botID: b.botID })
    })
})
client.on("guildMemberAdd", async (member) => {
  

   
  let guild = client.guilds.cache.get(config.serverID);
  
  if (member.user.bot) {
    try {
      guild.member(member.id).roles.add(roles.bot);
    } catch (error) {
      
    }
  }
});
/*=======================================================================================*/




/*=======================================================================================*/
require("./src/server.js")(client);
require("./src/database/connect.js")(client);
client.login("ODQ5NjE3MjgwMjQ1NDMyMzQw.YLdxwA.jar8kQs9qV5t1xQqNJ9P9L9RDNY");
/*=======================================================================================*/