const User = require("../../Model/level/user");
const cooldown = new Set();
const { Message, Client } = require("discord.js");
module.exports = {
  name: "messageCreate",
  /**
   * 
   * @param {Message} message 
   *  
   */
  async execute(message) {
    const guildId = message.guild.id;
    const userId = message.author.id;

    if (message.author.bot || !message.guild) return;
    if (cooldown.has(userId)) return;
    let user;

    try {

      const xpAmount = Math.floor(Math.random() * (25 - 15 + 1) + 15);
      user = await User.findOneAndUpdate(
        { guildId, userId },
        { guildId, userId, $inc: { xp: xpAmount } },
        { upsert: true, new: true });

      let { xp, level } = user;

      if (xp >= level * 100) {
        ++level;
        xp = 0;
          
        await User.updateOne(
          { guildId, userId },
          { level, xp });
      }
    } catch (err) { console.log(err) }
    cooldown.add(message.author.id);
    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, 60 * 1000);
  },
};
