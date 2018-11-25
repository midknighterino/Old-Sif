const snek = require("snekfetch");
const {MessageEmbed} = require("discord.js");
exports.run = async (client, message) => {
  snek.get("http://www.rrrather.com/botapi").then((res, err) => {
    let embed = new MessageEmbed()
      .setTitle(`WOULD YOU RATHER: **${res.body.title}**`)
      .setDescription(`CHOICE A: ${res.body.choicea}\nCHOICE B: ${res.body.choiceb}`);
    message.channel.send(embed);
  });
};


exports.help = {
  name: "wyr",
  description: "Randomly prints a Would You Rather question, with over 200 questions on tap!",
  usage: ".wyr",
  category: "Fun"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};