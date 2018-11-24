exports.run = async (client, message) => {
  let vc = message.member.voice.channel;
  if(!vc) return message.channel.send("You aren't in a voice channel/.");

  let membersInVc = vc.members;

  membersInVc.forEach(v => {
    if(v.user.id === message.author.id) return;

    if(v.roles.highest.position >= message.member.roles.highest.position) return;

    if(v.voice.serverMute === true) {
      v.setMute(false); 
    } else if(v.voice.serverMute === false) {
      v.setMute(true);
    }
  });

  message.channel.send("VC mutes toggled");
};

exports.help = {
  name: "mutevc",
  description: "Mute all members in a VC (except you).",
  usage: "muteAll",
  category: "Moderation Actions"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["vcmute"],
  permLevel: "Moderator"
};