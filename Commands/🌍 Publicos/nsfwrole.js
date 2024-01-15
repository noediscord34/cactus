const { SlashCommandBuilder } = require('@discordjs/builders');

const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nsfw')
    .setDescription('Dale a un usuario el rol NSFW'),

  async execute(interaction) {
    // Verifica si la interacción es un botón y si es el botón NSFW
    if (interaction.isButton() && interaction.customId === 'nsfw_button') {
      const member = interaction.member;
      const role = interaction.guild.roles.cache.find(role => role.name === 'NSFW');
      if (role && member) {
        try {
          await member.roles.add(role);
          await interaction.reply({ content: `Te he dado el rol ${role.name}!`, ephemeral: true });
        } catch (error) {
          console.error(error);
          await interaction.reply({ content: 'Ha ocurrido un error al asignar el rol.', ephemeral: true });
        }
      } else {
        await interaction.reply({ content: 'No se ha encontrado el rol NSFW o el miembro.', ephemeral: true });
      }
    } else {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('nsfw_button')
            .setLabel('NSFW')
            .setStyle('Primary'),
        );
      const embed = new EmbedBuilder()
        .setTitle('Selección de Rol NSFW')
        .setDescription('¡Haz clic en el botón para obtener el rol NSFW!')
        .setColor('Red');

      // Responder con el mensaje y el botón
      await interaction.reply({ content: 'Selecciona el rol NSFW:', components: [row] });
    }
  }
};
