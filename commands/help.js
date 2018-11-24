
const {MessageEmbed} = require("discord.js");

exports.run = (client, message, args, level) => {
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = message.guild ? client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level) : client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level &&  cmd.conf.guildOnly !== true);

    let categories = Array.from(new Set(myCommands.map(cmd => cmd.help.category)));

    let embed = new MessageEmbed()
      .setColor(0x7FFFD4);
    categories.forEach(i => {
      let cmds = myCommands
        .filter(cmd => cmd.help.category === i)
        .map(c => `\`${c.help.name}\``)
        .join(" ");
      embed.addField(i, cmds);
    });

    message.channel.send(embed);
  } else {
    // Show individual command's help.
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      if (level < client.levelCache[command.conf.permLevel]) return;
      let embed = new MessageEmbed()
        .setTitle(command.help.name)
        .setDescription(command.help.description)
        .addField("Usage", command.help.usage);      
      message.channel.send(embed);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["h", "halp"],
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};
