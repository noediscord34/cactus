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

      if (!message.content.startsWith('/') || message.author.bot) return;

      const args = message.content.slice('/').trim().split(/ +/);
      const command = args.shift().toLowerCase();

      if (command === 'hola Soy Nuevo') {
        client.commands.get('hola').execute(message, args);
      }

        if (message.author.bot) return;
        if (message.channel.type === "DM") return;
        if (!message.guild.members.me.permissions.has("SendMessages")) return;
        if (!message.guild.members.me.permissions.has("EmbedLinks")) return;

      if (message.channel.type === 'DM' && message.author.id !== client.user.id) {
              message.reply('¡Hola! Soy un bot y estoy respondiendo a tu mensaje directo.');
          }
      

        /* Si es Tag al Bot Mande Mensaje */
        if (message.content.match(client.user.id)) {
            const respuesta = new Discord.EmbedBuilder()
                .setAuthor({ 
                    name: `Holi! ${message.author.username}`, 
                    iconURL: message.author.displayAvatarURL({ dynamic: true }) 
                })
                .setFooter({
                    text: "Nikki Servidor: https://discord.gg/VFNJrcPGYP",
                })
                .setDescription([
                    `Mi prefix es: \`/\``,
                    `Si escribes \`/panel\` podras ver mis comandos`,
                ].join("\n"));


            return message.reply({ embeds: [respuesta],}).catch(() => { });
        }
    }
}