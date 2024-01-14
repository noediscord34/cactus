const {
  ChatInputCommandInteraction,
  Client,
  EmbedBuilder,
  AttachmentBuilder,
  SlashCommandBuilder,
} = require("discord.js");
const axios = require("axios").default;
const anime = require("anime-actions");
const Discord = require("discord.js");
const chalk = require("chalk");
module.exports = {
  botpermisos: [
    "SendMessages",
    "EmbedLinks"
  ],
  data: new SlashCommandBuilder()
    .setName("img")
    .setDescription("🎮 Manipulador de imagenes de universal discord.js")
    .addSubcommand((options) =>
      options
        .setName("biden")
        .setDescription("🎮 Hacer que Biden twitee algo")
        .addStringOption((option) =>
          option
            .setName("text")
            .setDescription("Proporcione un texto")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("alert")
        .setDescription("🎮 Mostrar una alerta de iPhone")
        .addStringOption((option) =>
          option
            .setName("text")
            .setDescription("Proporcione un texto")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("facts")
        .setDescription("🎮 Obtener algo del libro de hechos")
        .addStringOption((option) =>
          option
            .setName("text")
            .setDescription("Proporcione un texto")
            .setRequired(true)
        )
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    await interaction.deferReply();
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setDescription(
        `<:VS_cancel:1006609599199186974> An error occurred. Please try again later`
      );

    switch (subcommand) {
      case "alert": {
        const text = interaction.options.getString("text");
        const attachment = new AttachmentBuilder(
          `https://api.popcat.xyz/${subcommand}?text=${encodeURIComponent(text)}`,
          { name: "image.png" }
        );
        interaction
          .editReply({ files: [attachment] })
          .catch(() => interaction.editReply({ embeds: [embed] }));
      }
        break;
      case "biden": {
        const text = interaction.options.getString("text");
        const attachment = new AttachmentBuilder(
          `https://api.popcat.xyz/${subcommand}?text=${encodeURIComponent(text)}`,
          { name: "image.png" }
        );
        interaction
          .editReply({ files: [attachment] })
          .catch(() => interaction.editReply({ embeds: [embed] }));
      }
        break;
      case "facts": {
        const text = interaction.options.getString("text");
        const attachment = new AttachmentBuilder(
          `https://api.popcat.xyz/${subcommand}?text=${encodeURIComponent(text)}`,
          { name: "image.png" }
        );
        interaction
          .editReply({ files: [attachment] })
          .catch(() => interaction.editReply({ embeds: [embed] }));
      }
        break;
    }
  }
}
