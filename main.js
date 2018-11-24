/*
  Created for a very special server owner, who has downs, Midknight#9439
*/
//Modules to add 
const Discord = require("discord.js");
const { promisify } = require("util");
const r = promisify(require("fs").readdir);
const Enmap = require("enmap");

//Client stuff
const client = new Discord.Client({
  disableEveryone: true
});

//Client config, logger (Which allows for pretty info), and functions
client.config = require("./config.js");
client.logger = require("./modules/logger.js");
require("./modules/functions.js")(client);
/*
  These store valuable data well need, for example a catalogue of all the commands and functions,
  Aliases for commands, etc.
*/
client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({name: "settings"});
client.warns = new Enmap({name: "warns"});
//Init function
const init = async () => {
  //#region Command Loading Functionality
  const cmdFiles = await r("./commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });
  //#endregion Command Loading Functionality


  //#region Event Loading Functionality
  const evtFiles = await r("./events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Loading Event: ${eventName}`);
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
  });
  //#endregion Event Loading Functionality

  //#region Pretty Perms!
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }
  //#endregion Pretty Perms!

  client.login(client.config.token);
};

//Run initialization
init();