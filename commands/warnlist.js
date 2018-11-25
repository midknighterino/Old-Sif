const {MessageEmbed} = require("discord.js");
exports.run = async (client, message) => {
  let member = message.mentions.users.first();
  if(!member) member = message.author;

  if(client.warns.has(`${message.guild.id}-${member.id}`)) {
    let embed = new MessageEmbed()
      .setTitle(`Warns for ${member.username}`)
      .setDescription(client.warns.get(`${message.guild.id}-${member.id}`).map((v, i) => `${i + 1}: ${v.reason}: ${v.timeOfIncident}`).join("\n"));
    return message.channel.send(embed);
  } else {
    return message.channel.send("Error: This user has no warns.");
  }
};

exports.help = {
  name: "checkwarns",
  description: "Show your warns.",
  usage: "checkwarns",
  category: "Moderation"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["chwarns"],
  permLevel: "User"
};