module.exports = async (client, before, after) => {
  if(!before.guild.permissionsFor(client.user).has("MANAGE_ROLES")) return;
  if(!after.guild.permissionsFor(client.user).has("MANAGE ROLES")) return;
  if(!before.channelID && after.channelID) {
    let channelID = after.channelID;
    if(client.vcRoles.get(after.guild.id).map(r => r.vcid).includes(channelID)) {
      let c = client.vcRoles.get(after.guild.id).find(r => r.vcid === channelID);
      let role = after.guild.roles.find(r => r.id === c.roleid);
      after.member.roles.add(role);
    } 
  } else if(before.channelID && !after.channelID) {
    let channelD = before.channelID;
    if(client.vcRoles.get(after.guild.id).map(r => r.vcid).includes(before.channelID  )) {
      let c = client.vcRoles.get(before.guild.id).find(r => r.vcid === before.channelID);
      let role = after.guild.roles.find(r => r.id === c.roleid);
      after.member.roles.remove(role);
    }
  }
};
