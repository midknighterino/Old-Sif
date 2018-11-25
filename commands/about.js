exports.run = async (client, message) => {

  let botlink = ["<https://discordapp.com/api/oauth2/authorize?client_id=479827634617057280&permissions=8&scope=bot>"];

  let serverlink = ["<https://discord.gg/Q2aRVzJ>"];

  let gitlink = ["<https://github.com/midknighterino/Sif>"];

  let str = `**🐺 Invite the bot:** ${botlink} \n\n**🐺 Join the main server:** ${serverlink}\n\n**🐺 Inspect the git repo:** ${gitlink}`;

  message.channel.send(str);
  
};


exports.help = {
  name: "about",
  description: "Useful links to invite the bot, join the main server, meet the devs and inspect the git repo",
  usage: ".about",
  category: "System"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};