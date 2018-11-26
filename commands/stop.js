const ytdl = require("ytdl-core");
exports.run = async (client, message, args) => {
  if(message.member.voice.channel) {
    if(message.member.voice.channel.id === message.guild.voiceConnection.channel.id) {
      message.member.voice.channel.leave();
      client.queue.delete(message.guild.id);
    } else {
      return message.channel.send("You must be in the same voice channel as me.");
    }
  } else {
    return message.channel.send("You must be in a voice channel");
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "DJ"
};

exports.help = {
  name: "stop",
  description: "Stop the currently playing song.",
  usage: "stop",
  category: "Music"
};