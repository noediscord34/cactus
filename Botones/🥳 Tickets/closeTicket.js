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
const ticketSchema = require("../../Model/tickets/ticketsSchema");
const userSchema = require("../../Model/tickets/userTicketsSchema");

module.exports = {
  buttons_permisos: [
    "Administrator"
  ],
  id: "closeTicket",
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction 
   * 
   * 
   */
  async execute(interaction, client) {
    try {
      const { channel, member, guild, customId } = interaction;
      const ticketsData = await ticketSchema.findOne({
        guildId: guild.id,
      });
      const usersData = await userSchema.findOne({
        guildId: guild.id,
        ticketId: channel.id,
      });

      if (!member.roles.cache.find((r) => r.id === ticketsData.supportId)) {
        return await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setColor("Red")
              .setTitle("Ticket Closed! 📝")
              .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
              })
              .setDescription([
                `\`👋\` Miembro: ${member.user.tag}`,
                `\`📝\` Motivo: No tienes permisos para cerrar este ticket.`,
                `\`📜\` Fecha: ${new Date().toLocaleDateString()}`,
                `\`📅\` Hora: ${new Date().toLocaleTimeString()}`,
              ].join("\n")),
          ],
          ephemeral: true,
        }).catch((error) => {});
      }

      if (usersData.closed === true)
        return await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription([
                `\`•\` Estado: \`Cerrado\``,
                `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
              ].join("\n"))
              .setTitle("Ticket Closed! 📝")
              .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
              })
              .setColor("0x2F3136")
          ]
        }).catch((error) => {});

      await userSchema.updateMany(
        {
          ticketId: channel.id,
        },
        {
          closed: true,
          closer: member.id,
        }
      );

      if (!usersData.closer == member.id)
        return await interaction.reply({
          embeds: [
            new EmbedBuilder()
              .setTitle("Ticket Closed! 📝")
              .setDescription([
                `\`•\` Estado: \`Cerrado\``,
                `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                `\`•\` Motivo: \`Ticket cerrado por el miembro\``,
              ].join("\n"))
              .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
              })
              .setColor("Red")
          ],
          ephemeral: true,
        }).catch((error) => {});

      client.channels.cache
        .get(usersData.ticketId)
        .permissionOverwrites.edit(usersData.creatorId, {
          ViewChannel: false,
        });

      await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Ticket Closed! 📝")
            .setDescription([
              `\`👋\` Miembro: ${member.user.tag}`,
              `\`📝\` Ticket: ${channel.name}`,
              `\`📅\` Fecha: ${new Date().toLocaleDateString()}`,
              `\`⏰\` Hora: ${new Date().toLocaleTimeString()}`
            ].join("\n"))
            .setFooter({
              text: "My Queen https://discord.gg/4Z7QZ7Y",
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            }),
        ],
        components: [
          new ActionRowBuilder().setComponents(
            new ButtonBuilder()
              .setCustomId("reopenTicket")
              .setEmoji("🔓")
              .setLabel("Reopen Ticket")
              .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
              .setCustomId("deleteTicket")
              .setEmoji("⛔")
              .setLabel("Delete Ticket")
              .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
              .setCustomId("DatosTicket")
              .setEmoji("📋")
              .setLabel("Ticket Data")
              .setStyle(ButtonStyle.Success)
          ),
        ],
      }).then(() => {
        setTimeout(() => {
          interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor("Blue")
                .setTitle("Ticket Closed! 📝")
                .setDescription([
                  `\`👋\` Miembro: ${member.user.tag}`,
                  `\`📝\` Ticket: ${channel.name}`,
                  `\`📅\` Fecha: ${new Date().toLocaleDateString()}`,
                  `\`⏰\` Hora: ${new Date().toLocaleTimeString()}`
                ].join("\n"))
                .setFooter({
                  text: "My Queen https://discord.gg/4Z7QZ7Y",
                  iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                }),
            ],
            components: [
              new ActionRowBuilder().setComponents(
                new ButtonBuilder()
                  .setCustomId("reopenTicket")
                  .setEmoji("🔓")
                  .setLabel("Reopen Ticket")
                  .setDisabled(true)
                  .setStyle(ButtonStyle.Primary),
                new ButtonBuilder()
                  .setCustomId("deleteTicket")
                  .setEmoji("⛔")
                  .setDisabled(true)
                  .setLabel("Delete Ticket")
                  .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                  .setCustomId("DatosTicket")
                  .setEmoji("📋")
                  .setDisabled(true)
                  .setLabel("Ticket Data")
                  .setStyle(ButtonStyle.Success)
              ),
            ],
          }).catch((error) => {});
        } , 60000); // 60 segundos
      })
    } catch (e) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`New status code invalid? ❌`)
            .setDescription(`\`\`\`yml\n${e}\`\`\``)
            .setColor("Random")
            .setFooter({
              text: "My Queen https://discord.gg/4Z7QZ7Y",
              iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            }),
        ],
        ephemeral: true,
      });
    }
  }
}