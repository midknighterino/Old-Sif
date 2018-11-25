const {MessageEmbed} = require("discord.js");
module.exports = (client) => {
  client.permlevel = message => {
    let permlvl = 0;

    const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  };

  client.getSettings = (guild) => {
    const defaults = client.config.defaultSettings || {};
    if (!guild) return defaults;
    const guildData = client.settings.get(guild) || {};
    const returnObject = {};
    Object.keys(defaults).forEach((key) => {
      returnObject[key] = guildData[key] ? guildData[key] : defaults[key];
    });
    return returnObject;
  };

  client.generateModEmbed = async (reciever, action, giver, reason, time) => {
    switch(action) {
    case "Ban": {
      let embed = new MessageEmbed()
        .setTitle("BANNED")
        .setDescription(`\n**Member banned**: <@${reciever}>\n\n**By staff member**: <@${giver.user.id}>\n\n**Comments**: \`${reason}\``)
        .setColor(0xFF0000)
        .setImage("https://i.imgur.com/JeOHHmj.png");
      return embed;
    }
    case "Kick": {
      let embed = new MessageEmbed()
        .setTitle("KICKED")
        .setDescription(`\n**Member kicked**: <@${reciever.user.id}>\n\n**By staff member**: <@${giver.user.id}>\n\n**Comments**: \`${reason}\``)
        .setColor(0xFFD700)
        .setImage("https://i.imgur.com/3U3eFVE.png");
      return embed;
    }
    case "Warn": {
      let embed = new MessageEmbed()
        .setTitle("WARNED")
        .setDescription(`\n*If you carry on you will be muted or banned. Please revisit the server rules.*\n\n**Member warned**: <@${reciever.user.id}>\n\n**By staff member**: <@${giver.user.id}>\n\n**Comments**: \`${reason}\``)
        .setColor(0x008B8B)
        .setImage("https://i.imgur.com/84ZH535.png?1");
      return embed;
    }
    case "Mute": {
      let embed = new MessageEmbed()
        .setTitle("MUTED")
        .setDescription(`\n*You have lost the ability to chat in the usual voice and text channels.*\n\n**Member muted**: <@${reciever.user.id}>\n\n**By staff member**: <@${giver.user.id}>\n\n**For duration**: ${time}\n\n**Reason**: ${reason}`)
        .setColor(0x800080)
        .setImage("https://i.imgur.com/ebgo91a.png");
      return embed;
    }
    case "Unmute": {
      let embed = new MessageEmbed()
        .setTitle("UNMUTED")
        .setDescription(`\n*You have regained the ability to chat in the usual voice and text channels.*\n\n**Member unmuted**: <@${reciever.user.id}>\n\n**By staff member**: <@${giver.user.id}>`)
        .setColor(0x90EE90)
        .setImage("https://i.imgur.com/9Znmrvm.png");
      return embed;
    }
    }
  };

  client.awaitReply = async (msg, question, limit = 60000) => {
    const filter = m => m.author.id === msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  };

  client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
      text = await text;
    if (typeof evaled !== "string")
      text = require("util").inspect(text, {depth: 1});

    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

    return text;
  };

  client.loadCommand = (commandName) => {
    try {
      client.logger.log(`Loading Command: ${commandName}`);
      const props = require(`../commands/${commandName}`);
      if (props.init) {
        props.init(client);
      }
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Unable to load command ${commandName}: ${e}`;
    }
  };

  client.unloadCommand = async (commandName) => {
    let command;
    if (client.commands.has(commandName)) {
      command = client.commands.get(commandName);
    } else if (client.aliases.has(commandName)) {
      command = client.commands.get(client.aliases.get(commandName));
    }
    if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;
  
    if (command.shutdown) {
      await command.shutdown(client);
    }
    const mod = require.cache[require.resolve(`../commands/${commandName}`)];
    delete require.cache[require.resolve(`../commands/${commandName}.js`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
    return false;
  };

  Object.defineProperty(String.prototype, "toProperCase", {
    value: function() {
      return this.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
  });

  Object.defineProperty(Array.prototype, "random", {
    value: function() {
      return this[Math.floor(Math.random() * this.length)];
    }
  });

  client.wait = require("util").promisify(setTimeout);

  process.on("uncaughtException", (err) => {
    console.log(err.stack)
  });

  process.on("unhandledRejection", err => {
    console.log(err.stack)
  });

  client.average = (arr) => {
    return arr.reduce( ( p, c ) => p + c, 0 ) / arr.length;
  }
};