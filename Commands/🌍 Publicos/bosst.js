const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder , EmbedBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('boost')
    .setDescription('Recompensa por boostear el servidor'),
  async execute(interaction) {
    const guild = interaction.guild;
    const boostRole = guild.roles.cache.find(role => role.name === 'Booster Server');
    if (!boostRole) {
      console.log('El rol de Booster no fue encontrado en el servidor');
      return interaction.reply('Hubo un error al otorgar la recompensa. Por favor, contacta al administrador del servidor.');
    }

    const member = guild.members.cache.get(interaction.user.id);
    if (!member) {
      console.log('No se encontró al miembro');
      return interaction.reply('Hubo un error al otorgar la recompensa. Por favor, contacta al administrador del servidor.');
    }

    member.roles.add(boostRole)
      .then(() => {
        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('reclamar_recompensa')
              .setLabel('Reclamar recompensa')
              .setStyle(ButtonStyle.Primary)
          );

        const embed = new EmbedBuilder()
          .setTitle('¡Gracias por el boost!')
          .setDescription('¡Gracias por boostear el servidor! Haz clic en el botón para reclamar tu recompensa.');

        interaction.reply({ 
          content: '¡Felicidades por el boost! Se otorgó el rol de Booster y aquí está tu recompensa.', 
          embeds: [embed], 
          components: [row] 
        });
      })
      .catch(error => {
        console.error('Error al otorgar el rol de Booster:', error);
        return interaction.reply('Hubo un error al otorgar la recompensa. Por favor, contacta al administrador del servidor.');
      });
  },
};
