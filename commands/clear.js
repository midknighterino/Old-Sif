exports.run = async (client, message) => {
  const user = message.mentions.users.first();
  const amount = parseInt(message.content.split(" ")[1]) ? parseInt(message.content.split(" ")[1]) : parseInt(message.content.split(" ")[2]);
  if (!amount) return message.reply("Must specify an amount to delete!");
  if (!amount && !user) return message.reply("Must specify a user and amount, or just an amount, of messages to purge!");
  await message.channel.messages.fetch({
    limit: amount,
  }).then((messages) => {
    if (user) {
      const filterBy = user ? user.id : client.user.id;
      messages = messages.filter(m => m.author.id === filterBy).array().slice(0, amount);
    }
    message.channel.bulkDelete(messages).catch(error => console.log(error.stack));
  });

  message.channel.send(`${amount} messages has been deleted` ).then(message => message.delete(10000));
};


exports.help = {
  name: "clear",
  description: "clear messages",
  usage: "clear <amount>",
  category: "Moderation Actions"
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["c"],
  permLevel: "Moderator"
};