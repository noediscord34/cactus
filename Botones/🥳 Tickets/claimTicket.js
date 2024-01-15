const {
  Client,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { Types } = require("mongoose");
const { createTranscript } = require("discord-html-transcripts");
const chalk = require("chalk");
const ticketSchema = require("../../Model/tickets/ticketsSchema");
const userSchema = require("../../Model/tickets/userTicketsSchema");

module.exports = {
  buttons_permisos: [
    "Administrator"
  ],
  id: "claimTicket",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   * 
   *
   */
  async execute(interaction, client) {
    const { channel, member, guild, customId } = interaction;
    const ticketDat = await ticketSchema.findOne({
      guildId: guild.id,
    });
    const userDat = await userSchema.findOne({
      guildId: guild.id,
      ticketId: channel.id,
    });

    if (userDat.claimed === true)
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTitle("Error Console! 📁")
            .setFooter({
              text: "My Queen https://discord.gg/4Z7QZ7Y",
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setDescription([
              `\`•\` Estado: Error Consola`,
              `\`•\` Descripcion: Este ticket ya ha sido reclamado.`,
              `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
              `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
            ].join("\n")),
        ],
        ephemeral: true,
      }).catch((error) => {});

    if (!member.roles.cache.find((r) => r.id === ticketDat.supportId))
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setTitle("Error Console! 📁")
            .setFooter({
              text: "My Queen https://discord.gg/4Z7QZ7Y",
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setDescription([
              `\`•\` Estado: Error Consola`,
              `\`•\` Descripcion: No tienes permisos para reclamar este ticket.`,
              `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
              `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
            ].join("\n")),
        ],
        ephemeral: true,
      }).catch((error) => {});

    await userSchema.updateMany(
      {
        ticketId: channel.id,
      },
      {
        claimed: true,
        claimer: member.id,
      }
    );

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor("Blue")
          .setTitle("Ticket Claimed! 👏")
          .setFooter({
            text: "My Queen https://discord.gg/4Z7QZ7Y",
            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
          })
          .setDescription(`\`👋\` Claimed: ${interaction.user}`),
      ]
    }).catch((error) => {});
  }
}