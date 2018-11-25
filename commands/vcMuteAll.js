exports.run = async (client, message) => {
  let vc = message.member.voice.channel;
  if(!vc) return message.channel.send("You aren't in a voice channel/.");

  let membersInVc = vc.members;

  let muteRole = message.guild.roles.find(r => r.name === message.settings.muteRole);
  if(!muteRole) return message.channel.send("You must set up a muterole before you do this action.");

  membersInVc.forEach(v => {
    if(message.author.roles.has(muteRole.id)) return;
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
  category: "Moderation"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["vcmute"],
  permLevel: "Moderator"
};