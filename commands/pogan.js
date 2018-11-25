exports.run = async (client, message) => {
  let arr1 = ["National", "Libertarian", "Social", "Clerical", "Authoritarian", "Anarcho", "Moderate", "Collectivist", "Individualist"];
  let arr2 = ["left-wing", "right-wing", "centrist", "egalitarian", "feminist", "eco", "pagan", "christian", "muslim"];
  let arr3 = ["communism", "socialism", "fascism", "mutualism", "capitalism"];

  let str = `${arr1.random()} ${arr2.random()} ${arr3.random()}`;
  message.channel.send(str);
};


exports.help = {
  name: "pogan",
  description: "Generate a political ideology",
  usage: "pogan",
  category: "Fun"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["pogbot"],
  permLevel: "User"
};