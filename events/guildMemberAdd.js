// This event executes when a new member joins a server. Let's welcome them!

module.exports = async (client, member) => {
  // Load the guild's settings
  const settings = client.getSettings(member.guild.id);

  let hacks = client.hackbans.get(member.guild.id);
  if(hacks.includes(member.user.id)) {
    let embed = await client.generateModEmbed(member, "Ban", member.guild.owner, "Preempive ban set by server owner");
    if(!embed) return message.channel.send("Error: An unexpected error has occured... exiting.");
    let modLogChannel = member.guild.channels.find(c => c.name === settings.modLogChannel);
    if(!modLogChannel) return await member.ban();
    modLogChannel.send(embed);
    await member.ban();
  }

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.find(c => c.name === settings.welcomeChannel).send(welcomeMessage).catch(console.error);
};
