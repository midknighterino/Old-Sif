let {MessageEmbed} = require("discord.js");
exports.run = async (client, message) => {
  let admins = message.guild.members.filter(m => m.permissions.has("BAN_MEMBERS") || m.permissions.has("ADMINISTRATOR"));
  let mods = message.guild.members.filter(m => m.permissions.has("MUTE_MEMBERS"));
  mods = mods.filter(m => m.user.bot === false);
  admins = admins.filter(m => m.user.bot === false);
  let announcers = message.guild.members.filter(m => m.permissions.has("MENTION_EVERYONE"));
  announcers = announcers.filter(m => {
    if(m.user.bot) return false;
    return true;
  });
  let bots = message.guild.members.filter(m => m.user.bot);
  let embed = new MessageEmbed()
    .setTitle("Mod List")
    .setDescription(`:crown: ADMINISTRATORS - *Ban perms*:\n\n${admins.map(a => `- ${a.user.tag}`).join("\n")}\n\n:oncoming_police_car: MODERATORS - *Mute perms*:\n\n${mods.map(m => `- ${m.user.tag}`).join("\n")}\n\n:mega: ANNOUNCERS - *Mention everyone perms*:\n\n${announcers.map(m => `- ${m.user.tag}`).join("\n")}\n\n:robot: BOTS - *The automatons of the server*:\n\n${bots.map(m => `- ${m.user.tag}`).join("\n")}`);
  message.channel.send(embed);
};


exports.help = {
  name: "checkstaff",
  description: "Show admins and mods.",
  usage: "checkstaff",
  category: "Moderation"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};