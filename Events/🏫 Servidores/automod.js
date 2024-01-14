const Discord = require('discord.js');
const { Message, Client } = require('discord.js');

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     * 
     */
    async execute (message, client) {

      const prefix = "p!"; // Replace "!" with your actual bot prefix
      if (message.author.bot) return;
      
        if (message.author.bot) return;

        const userId = message.author.id;
        const content = message.content;
        const guildId = message.guild.id;

        // Verificar si el contenido del mensaje es una imagen, sticker o emoji
        if (
          message.attachments.size > 0 || // Verificar si hay archivos adjuntos (imágenes, etc.)
          message.content.match(/<a?:\w+:\d+>/g) || // Verificar si hay emojis personalizados
          message.content.match(/<:.+:\d+>/g) // Verificar si hay emojis normales
        ) {
          return;
        }

        if (content.startsWith(prefix) && !message.author.bot) {
          return;
        }
      // Define and initialize messageMap
      let messageMap = new Map();

      // Use messageMap in your code
      // ...


        const mapKey = `${userId}-${guildId}-${content}`;

        if (messageMap.has(mapKey)) {
          const duplicateCount = messageMap.get(mapKey);
          if (duplicateCount >= maxDuplicates) {
            const embed = new EmbedBuilder()
              .setColor("Red")
              .setTitle("❗ Advertencia ❗")
              .setFields({
                name: `Advertencia del servidor **${message.guild.name}**`,
                value: `> No envíes el mismo mensaje más de ${maxDuplicates} veces, podrías ser sancionado.`,
              })
              
              .setFooter({
                text: `${message.client.user.tag} || ${message.client.ws.ping}Ms`,
                iconURL: message.client.user.displayAvatarURL(),
              });

            try {
              message.delete();
            } catch (error) {
              return;
            }
            try {
              message.author.send({ embeds: [embed] }).catch(console.error);
            } catch (error) {
              return;
            }
          } else {
            messageMap.set(mapKey, duplicateCount + 1);
          }
        } else {
          messageMap.set(mapKey, 1);

          setTimeout(() => {
            if (messageMap.has(mapKey)) {
              messageMap.delete(mapKey);
            }
          }, 5 * 60 * 1000);
        }
      }
        }