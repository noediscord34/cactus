const { InteractionType, EmbedBuilder } = require("discord.js");
const modales = require("../../Settings/mensajes.json");
const config = require(`${process.cwd()}/config.json`);
module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.type !== InteractionType.ModalSubmit) return;

    const modal = client.modals.get(interaction.customId);

    if (!modal) return;
    if (modal == undefined) return;

    if (modal)
      if (modal.developer) {
        if (!config.ownerIDS.includes(interaction.user.id))
          return interaction.reply({
            embeds: [new EmbedBuilder()
              .setTitle(modales["interaction"]["titles"]["title2"])
              .setDescription(modales["interaction"]["interaction2"])
              .setTimestamp()
              .setFooter({ text: `Eventos de Interaccion de Comandos` })
              .setColor(`Red`)
            ], ephemeral: true
          })
      };

    if (modal.permission && !interaction.member.permissions.has(modal.permission))
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(modales["modales"]["titles"]["title1"])
          .setDescription(modales["modales"]["interaction1"])
          .setFields({
            name: `Permisos Faltantes`,
            value: `${modal.permission.map(permiso => `\`${permiso}\``).join(", ")}`
          })
          .setTimestamp()
          .setFooter({ text: `Eventos de Interaccion de Comandos` })
          .setColor(`Red`)], ephemeral: true
      });

    if (modal.modals_permisos) {
      if (!interaction.guild.members.me.permissions.has(modal.modals_permisos))
        return interaction.reply({
          embeds: [new EmbedBuilder()
            .setTitle(modales["modales"]["titles"]["title2"])
            .setDescription(modales["modales"]["interaction2"])
            .setFields({
              name: `Permisos Faltantes`,
              value: `${modal.modals_permisos.map(permiso => `\`${permiso}\``).join(", ")}`
            })
            .setTimestamp()
            .setFooter({ text: `Eventos de Interaccion de Comandos` })
            .setColor(`Red`)], ephemeral: true
        })
    };

    modal.execute(interaction, client);
  },
};
