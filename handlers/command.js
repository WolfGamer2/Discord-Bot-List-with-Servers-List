const {readdirSync} = require('fs');
const ascii = require('ascii-table')
let table = new ascii("Commands");
const db  = require("quick.db")
table.setHeading('Command', ' Load status');
module.exports= (client) => {
    readdirSync('./src/commands/').forEach(dir => {
    
        const commands = readdirSync(`./src/commands/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(`../src/commands/${file}`);
           
            if(pull.name){
                client.commands.set(pull.name, pull);
                
            } else {
             
                continue;
            }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    });
    
}