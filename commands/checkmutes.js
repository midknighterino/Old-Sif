let {MessageEmbed} = require("discord.js");
exports.run = async (client, message) => {
  let muteRole = message.guild.roles.find(r => r.name === message.settings.muteRole);
  if(!muteRole) return message.channel.send("Error: Please create a muterole");
  let muted = message.guild.members.filter(r => r.roles.has(muteRole.id));
  let embed = new MessageEmbed()
    .setTitle(`Muted members in ${message.guild.name}`)
    .setDescription(muted.map(m => `${m.user.tag}`).join("\n"))
  message.channel.send(embed)
};


exports.help = {
  name: "checkmutes",
  description: "Show muted people.",
  usage: "checkmutes",
  category: "Moderation"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};