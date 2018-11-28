const ytdl = require("ytdl-core");
exports.run = async (client, message, args) => {
  const vc = message.member.voice.channel;
  if(!vc) return message.channel.send("You must be in a voice channel");
  if(!args[0]) return message.channel.send("You must supply a link.");

  const serverQueue = client.queue.get(message.guild.id);


  const permissions = message.channel.permissionsFor(message.client.user);
  if(!permissions.has("CONNECT") || !permissions.has("SPEAK")) return message.channel.send("I may not connect to this channel, check my permissions");

  const songInfo = await ytdl.getBasicInfo(args[0]);

  const song = {
    title: songInfo.title,
    url: songInfo.video_url,
    length: songInfo.length_seconds,
    thumb: songInfo.thumbnail_url
  };

  if(!serverQueue) {
    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel: vc,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };
    client.queue.set(message.guild.id, queueConstruct);

    queueConstruct.songs.push(song);

    try {
      var connection = await vc.join();
      queueConstruct.connection = connection;
      client.play(message.guild, queueConstruct.songs[0]);
    } catch (error) {
      client.logger.error(error);
      message.channel.send(`I could not join the voice channel \`\`\`${error}\`\`\``);
      return client.queue.delete(message.guild.id);
    }
  } else {
    serverQueue.songs.push(song);
    message.channel.send(`\`${song.title}\` has been added to the queue`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "play",
  description: "Play a song, must provide a youtube link and be in a channel.",
  usage: "play <link>",
  category: "Music"
};