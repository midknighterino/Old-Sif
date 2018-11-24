const ms = require("ms");
exports.run = async (client, message, args) => {
  let member = message.mentions.members.first();
  if(!member) return message.reply("Error: Please specify a member.");
  if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Error: You may not do that, check the role hierarchy.");
  if(!member.kickable) return message.channel.send("Error: This member isn't mutable, please check my perms.");

  let time = args.slice(1).join(" ");
  if(!time) time = "Indefinite";

  let modLogChannel = message.guild.channels.find(c => c.name === message.settings.modLogChannel);
  if(!modLogChannel) return message.channel.send(`Error: Please set up a moderation log by using \`${message.settings.prefix}set edit modLogChannel #channel-name\``);

  let embed = await client.generateModEmbed(member, "Mute", message.member, undefined, time);
  if(!embed) return message.channel.send("Error: An unexpected error has occured... exiting.");

  let muteRole = message.guild.roles.find(r => r.name === message.settings.muteRole);
  if(!muteRole) return message.channel.send("Error: Please create a muterole");

  member.roles.add(muteRole);

  if(time) {
    setTimeout(async () => {
      if(member.roles.has(muteRole.id)) {
        member.roles.remove(muteRole);
        message.channel.send(`${member.user.tag} has been unmuted, welcome back you sinner.`);
        let embed = await client.generateModEmbed(member, "Unmute", message.member, "Time expired.");
        modLogChannel.send(embed);
      } else {
        return;
      }
    }, ms(time));
  } else {
    return message.channel.send("Okay, muted user indefinitely");
  }
  
  modLogChannel.send(embed);
  message.channel.send(embed);
};

exports.help = {
  name: "mute",
  description: "Mute a user.",
  usage: "mute <user> [time in ms format]",
  category: "Moderation Actions"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["suppress"],
  permLevel: "Moderator"
};