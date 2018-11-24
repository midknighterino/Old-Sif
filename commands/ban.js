exports.run = async (client, message, args) => {
  let member = message.mentions.members.first() || args[0]
  if(!member) return message.reply("Error: Please specify a member.");

  

  if(typeof member != "string") {
    if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("Error: You may not do that, check the role hierarchy.");
    if(!member.bannable) return message.channel.send("Error: This member isn't bannable, please check my perms.");
  }

  let reason = args.slice(1).join(" ");
  if(!reason) reason = "Unspecified, autogenerated.";

  if(message.flags[0] == "p" || message.flags[0] == "preban") {
    if(typeof member !== "string") return message.channel.send("You must give an id in a hackban.");
    client.hackbans.ensure(message.guild.id, []);
    let hacks = client.hackbans.get(message.guild.id);
    if(hacks.includes(member)) return message.channel.send("That member is already prebanned");
    client.hackbans.push(message.guild.id, member);
    let embed = await client.generateModEmbed(member, "Ban", message.member, reason);
    if(!embed) return message.channel.send("Error: An unexpected error has occured... exiting.");
    let modLogChannel = message.guild.channels.find(c => c.name === message.settings.modLogChannel);
    if(!modLogChannel) return message.channel.send(`Error: Please set up a moderation log by using \`${message.settings.prefix}set edit modLogChannel #channel-name\``);
    return modLogChannel.send(embed);
  }

  let modLogChannel = message.guild.channels.find(c => c.name === message.settings.modLogChannel);
  if(!modLogChannel) return message.channel.send(`Error: Please set up a moderation log by using \`${message.settings.prefix}set edit modLogChannel #channel-name\``);

  let embed = await client.generateModEmbed(member, "Ban", message.member, reason);
  if(!embed) return message.channel.send("Error: An unexpected error has occured... exiting.");

  modLogChannel.send(embed);
  await member.ban(reason);
  message.channel.send(embed);
};

exports.help = {
  name: "ban",
  description: "Ban a user from your server.",
  usage: "ban <member> <reason>",
  category: "Moderation Actions"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["oppress"],
  permLevel: "Server Owner"
};