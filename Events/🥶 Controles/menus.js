const { EmbedBuilder } = require("discord.js");
const menus = require("../../Settings/mensajes.json");
const config = require(`${process.cwd()}/config.json`);
module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isStringSelectMenu()) return;

    const selectMenu = client.selectMenus.get(interaction.customId);

    if (!selectMenu) return;
    if (selectMenu == undefined) return;

    if (selectMenu)
      if (selectMenu.developer) {
        if (!config.ownerIDS.includes(interaction.user.id))
          return interaction.reply({
            embeds: [new EmbedBuilder()
              .setTitle(menus["interaction"]["titles"]["title2"])
              .setDescription(menus["interaction"]["interaction2"])
              .setTimestamp()
              .setFooter({ text: `Eventos de Interaccion de Comandos` })
              .setColor(`Red`)
            ], ephemeral: true
          })
      };

    if (selectMenu.permission && !interaction.member.permissions.has(selectMenu.permission))
      return interaction.reply({
        embeds: [new EmbedBuilder()
          .setTitle(menus["button"]["titles"]["title1"])
          .setDescription(menus["menus"]["interaction1"])
          .setFields({
            name: `Permisos Faltantes`,
            value: `${selectMenu.permission.map(permiso => `\`${permiso}\``).join(", ")}`
          })
          .setTimestamp()
          .setFooter({ text: `Eventos de Interaccion de Comandos` })
          .setColor(`Red`)], ephemeral: true
      });

    if (selectMenu.menu_permisos) {
      if (!interaction.guild.members.me.permissions.has(selectMenu.menu_permisos))
        return interaction.reply({
          embeds: [new EmbedBuilder()
            .setTitle(menus["button"]["titles"]["title2"])
            .setDescription(menus["menus"]["interaction2"])
            .setFields({
              name: `Permisos Faltantes`,
              value: `${selectMenu.menu_permisos.map(permiso => `\`${permiso}\``).join(", ")}`
            })
            .setTimestamp()
            .setFooter({ text: `Eventos de Interaccion de Comandos` })
            .setColor(`Red`)], ephemeral: true
        })
    };

    await selectMenu.execute(interaction, client);
  },
};
