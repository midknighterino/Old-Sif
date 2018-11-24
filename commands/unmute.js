exports.run = async (client, message) => {
  let member = message.mentions.members.first();
  if(!member) return message.reply("Error: Please specify a member.");
  if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Error: You may not do that, check the role hierarchy.");

  let modLogChannel = message.guild.channels.find(c => c.name === message.settings.modLogChannel);
  if(!modLogChannel) return message.channel.send(`Error: Please set up a moderation log by using \`${message.settings.prefix}set edit modLogChannel #channel-name\``);

  let embed = await client.generateModEmbed(member, "Unmute", message.member, undefined);
  if(!embed) return message.channel.send("Error: An unexpected error has occured... exiting.");

  let muteRole = message.guild.roles.find(r => r.name === message.settings.muteRole);
  
  if(!member.roles.has(muteRole.id)) return message.channel.send("This user is not muted!");

  member.roles.remove(muteRole.id);

  message.channel.send("Success, unmuted member");

  modLogChannel.send(embed);
  message.channel.send(embed);
};

exports.help = {
  name: "unmute",
  description: "Unmute a user.",
  usage: "unmute <user>",
  category: "Moderation Actions"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Moderator"
};