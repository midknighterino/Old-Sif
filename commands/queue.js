const {MessageEmbed} = require("discord.js");
exports.run = async (client, message, args) => {
  let serverQ = client.queue.get(message.guild.id);
  if(!serverQ) return message.channel.send("Nothing is playing as of now!");
  let embed = new MessageEmbed()
    .setTitle("Queue")
    .setDescription(serverQ.songs.map((s, i) => {
      if(i == 0) return `:musical_note: NOW PLAYING: \`${s.title}\` :musical_note:`;
      return `${i}: **${s.title}**`;
    }))
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
  name: "queue",
  description: "Show the server queue.",
  usage: "queue",
  category: "Music"
};