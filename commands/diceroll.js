const d20 = require("d20");
const {MessageEmbed} = require("discord.js");
exports.run = async (client, message, args) => {
  const diceRolls = d20.verboseRoll(args[0] || "1d6");
  const embed = new MessageEmbed()
    .setTitle("DICE!")
    .setDescription(diceRolls.join(", "))
    .addField("Average", client.average(diceRolls), true)
    .addField("Sum", diceRolls.reduce((a, b) => a + b), true)

  message.channel.send(embed)
};


exports.help = {
  name: "dice",
  description: "roll a dice on wyr",
  usage: "dice [dnddiceformat]",
  category: "Fun"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};