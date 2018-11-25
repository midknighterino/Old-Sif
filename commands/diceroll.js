const d20 = require("d20");
const {MessageEmbed} = require("discord.js");

function median(values){
  values.sort(function(a,b){
  return a-b;
});

if(values.length ===0) return 0

var half = Math.floor(values.length / 2);

if (values.length % 2)
  return values[half];
else
  return (values[half - 1] + values[half]) / 2.0;
}

exports.run = async (client, message, args) => {
  let diceRolls = d20.verboseRoll(args[0] || "1d6");
  diceRolls = diceRolls.sort((a, b) => a - b);
  let med = diceRolls[(diceRolls.length + 1) /2];
  const embed = new MessageEmbed()
    .setTitle("DICE!")
    .setDescription(diceRolls.join(", "))
    .addField("Average", client.average(diceRolls), true)
    .addField("Sum", diceRolls.reduce((a, b) => a + b), true)
    .addField("Median", median(diceRolls));

  message.channel.send(embed)
};




exports.help = {
  name: "dice",
  description: "roll a dice on wyr",
  usage: "dice [dnddiceformat]",
  category: "Fun"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};