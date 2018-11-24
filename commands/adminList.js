let {MessageEmbed} = require("discord.js");
exports.run = async (client, message) => {
  let admins = message.guild.members.filter(m => m.permissions.has("BAN_MEMBERS"));
  let mods = message.guild.members.filter(m => m.permissions.has("MUTE_MEMBERS"));
  let embed = new MessageEmbed()
    .setTitle("Mod List")
    .setDescription(`:crown: ADMINISTRATORS - *ban perms*:\n\n${admins.map(a => `- ${a.user.tag}`).join("\n")}\n\n:oncoming_police_car: MODERATORS - *mute perms*:\n\n ${mods.map(m => `- ${m.user.tag}`).join("\n")}`);
  message.channel.send(embed);
};


exports.help = {
  name: "checkstaff",
  description: "Show admins and mods.",
  usage: "checkstaff",
  category: "Moderation Actions"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};