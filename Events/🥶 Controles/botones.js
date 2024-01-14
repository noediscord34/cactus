const { EmbedBuilder } = require("discord.js");
const Discord = require("discord.js");
const sintaxis = require("../../Settings/mensajes.json");
const config = require(`${process.cwd()}/config.json`);
module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isButton()) return;

    const button = client.buttons.get(interaction.customId);

    if (!button) return;
    if (button == undefined) return;

    if (button)
      if (button.developer) {
        if (!config.ownerIDS.includes(interaction.user.id))
          return interaction.reply({
            embeds: [new EmbedBuilder()
              .setTitle(sintaxis["interaction"]["titles"]["title2"])
              .setDescription(sintaxis["interaction"]["interaction2"])
              .setTimestamp()
              .setFooter({ text: embed["footers"]["footer1"] })
              .setColor(`Red`)
            ], ephemeral: true
          })
      };

    if (button.permission && !interaction.member.permissions.has(button.permission))
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(sintaxis["button"]["titles"]["title1"])
          .setDescription(sintaxis["button"]["interaction1"])
          .setFields({
            name: `Permisos Faltantes`,
            value: `${button.permission.map(permiso => `\`${permiso}\``).join(", ")}`
          })
          .setTimestamp()
          .setFooter({ text: `Error Interacciones Development` })
          .setColor(`Red`)], ephemeral: true
      });

    if (button.buttons_permisos) {
      if (!interaction.guild.members.me.permissions.has(button.buttons_permisos))
        return interaction.reply({
          embeds: [new EmbedBuilder()
            .setTitle(sintaxis["button"]["titles"]["title2"])
            .setDescription(sintaxis["button"]["interaction2"])
            .setFields({
              name: `Permisos Faltantes`,
              value: `${button.buttons_permisos.map(permiso => `\`${permiso}\``).join(", ")}`
            })
            .setTimestamp()
            .setFooter({ text: `Error Interacciones Permisos Faltantes` })
            .setColor(`Red`)], ephemeral: true
        })
    };

    button.execute(interaction, client);
  },
};