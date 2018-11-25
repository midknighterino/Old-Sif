exports.run = async (client, message, args) => {
  switch(message.flags[0]) {
    case "add": {
      if(!message.mentions.roles.first()) return message.channel.send("You must supply a mention for a role");
      if(!message.member.voice.channel) return message.channel.send("You must be in a voice channel!");
      client.vcRoles.ensure(message.guild.id, []);
      if(client.vcRoles.get(message.guild.id).some(r => r.vcid === message.member.voice.channel.id)) return message.channel.send("You already have a role assigned to this channel.");
      client.vcRoles.push(message.guild.id, {
        vcid: message.member.voice.channel.id,
        roleid: message.mentions.roles.first().id
      });
      message.channel.send("Added VC role");
      break;
    }
    case "remove": {
      let vcRoles = client.vcRoles.get(message.guild.id);
      let vcRoles2 = client.vcRoles.get(message.guild.id);
      let itemToRemove = vcRoles.findIndex((element) => element.vcid === message.member.voice.channel.id);
      let newRoles = vcRoles.splice(itemToRemove + 1, 1);
      let members = message.guild.members.filter(r => r.roles.has(vcRoles2[itemToRemove].roleid));
      let role = message.guild.roles.find(r => r.id === vcRoles2[itemToRemove].roleid)
      members.forEach(m => {
        m.roles.remove(role);
      });
      message.channel.send("Removed VC role.");
      break;
    }
    default: {
      message.channel.send("You must supply an action by doing\`vrole -add|-remove [@Role]\`")
    }
  }
};

exports.help = {
  name: "vrole",
  description: "Create A vc role",
  usage: "vrole -add|-remove [@Role]",
  category: "Moderation Actions"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["vcrole"],
  permLevel: "Server Owner"
};