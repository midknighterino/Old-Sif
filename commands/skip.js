const ytdl = require("ytdl-core");
exports.run = async (client, message, args) => {
  const serverQ = client.queue.get(message.guild.id);
  if(message.member.voice.channel.id !== message.guild.voiceConnection.channel.id) return message.channel.send("You must be in the same vc as me!");
  if(!serverQ) return message.channel.send(":WrongMark: There is nothing I could skip for you.");
  serverQ.connection.dispatcher.end();
  return message.channel.send("Skipped that for you!"); 
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "skip",
  description: "skip",
  usage: "skip",
  category: "Music"
};