const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, EmbedBuilder, ButtonStyle } = require('discord.js')
module.exports = {  data: new SlashCommandBuilder()
    .setName('borrar')
    .setDescription('Borra una cantidad de mensajes en el chat')
    .addIntegerOption(option =>
      option.setName('cantidad')
        .setDescription('Número de mensajes a borrar')
        .setRequired(true)),
  async execute(interaction) {
    const amount = interaction.options.getInteger('cantidad');
    if (amount <= 0 || amount > 100) {
      return interaction.reply('El número de mensajes a borrar debe estar entre 1 y 100.');
    }

    const confirmActionRow = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('confirmar_borrar')
          .setLabel('Confirmar')
          .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
          .setCustomId('cancelar_borrar')
          .setLabel('Cancelar')
          .setStyle(ButtonStyle.Danger)
      );

    const confirmEmbed = new EmbedBuilder()
      .setTitle(`¿Estás seguro de que quieres borrar ${amount} mensajes?`)
      .setColor('#ff0000');

    const message = await interaction.reply({ content: 'Por favor, confirma la acción.', embeds: [confirmEmbed], components: [confirmActionRow] });

    const filter = i => i.user.id === interaction.user.id;
    const collector = message.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async i => {
      if (i.customId === 'confirmar_borrar') {
        // Aquí ejecutas la lógica para borrar los mensajes
        await interaction.channel.bulkDelete(amount)
          .then(messages => {
            interaction.followUp(`Se borraron ${messages.size} mensajes.`);
          })
          .catch(error => {
            console.error('Error al borrar mensajes:', error);
            interaction.followUp('Hubo un error al intentar borrar mensajes.');
          });
      } else if (i.customId === 'cancelar_borrar') {
        interaction.followUp('Borrado cancelado.');
      }
      collector.stop();
    });

    collector.on('end', collected => {
      if (collected.size === 0) {
        interaction.followUp('Tiempo de espera agotado. Borrado cancelado.');
      }
    });
  },
};
