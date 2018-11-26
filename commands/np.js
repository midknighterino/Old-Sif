const {MessageEmbed} = require("discord.js");
exports.run = async (client, message, args) => {
  let serverQ = client.queue.get(message.guild.id);
  if(!serverQ) return message.channel.send("Nothing is playing as of now!");
  let embed = new MessageEmbed()
    .setTitle("Now Playing")
    .setDescription(serverQ.songs[0].map((v) => `${v.title}`));
    .setColor(0x2d5aa3);
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "np",
  description: "Shows current playing song.",
  usage: "np",
  category: "Music"
};