const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .setName("role")
    .setDescription(
      "Agrega(true) o Quita(false) un rol a los miembros o bots del servidor"
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("all")
        .setDescription("Asigna un rol a todos los miembros del servidor")
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("El rol que se asignará")
            .setRequired(true)
        )
        .addStringOption((option) => option
          .setName("accion")
          .setDescription("Elige si quieres agregar o quitar el rol")
          .addChoices(
            { name: "Agregar", value: 'agregar' },
            { name: "Quitar", value: 'quitar' }
            )
          .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("member")
        .setDescription("Asigna un rol a un miembro específico")
        .addUserOption((option) =>
          option
            .setName("miembro")
            .setDescription("El miembro al que se asignará el rol")
            .setRequired(true)
        )
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("El rol que se asignará")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("humans")
        .setDescription("Asigna un rol a todos los humanos del servidor")
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("El rol que se asignará")
            .setRequired(true)
        )
        .addStringOption((option) => option
          .setName("accion")
          .setDescription("Elige si quieres agregar o quitar el rol")
          .addChoices(
            { name: "Agregar", value: 'agregar' },
            { name: "Quitar", value: 'quitar' }
            )
          .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("bots")
        .setDescription("Asigna un rol a todos los bots del servidor")
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("El rol que se asignará")
            .setRequired(true)
        )
        .addStringOption((option) => option
          .setName("accion")
          .setDescription("Elige si quieres agregar o quitar el rol")
          .addChoices(
            { name: "Agregar", value: 'agregar' },
            { name: "Quitar", value: 'quitar' }
            )
          .setRequired(true)
        )
    ),

  /**
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    await interaction.guild.members.fetch()
    const { options } = interaction;
    const sub = options.getSubcommand();
    const rol = options.getRole("role");
    const agregar = options.getString("accion");
    const miembro = options.getMember("miembro");

    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return await interaction.reply({ content: `No tengo permiso para gestionar roles en este servidor.`, ephemeral: true })
    }

    if (interaction.member.roles.highest.position <= rol.position) {
      await interaction.reply({
        content: `No puedo dar o quitar un rol igual o más alto que tu rol más alto.`,
        ephemeral: true,
      });
      return;
    }

    if (interaction.guild.members.me.roles.highest.position <= rol.position) {
      return await interaction.reply({
        content: `No puedo dar o quitar un rol igual o más alto que mi rol más alto.`,
        ephemeral: true,
      });
    }

    if ((rol.tags && rol.tags.premiumSubscriberRole) || (rol.tags && rol.tags.subscriptionListingId)) {
      await interaction.reply({
        content: `Este rol es para los Boosters o suscriptores del servidor y no puede ser agregado o removido manualmente.`,
        ephemeral: true,
      });
      return;
    }

    if ((rol.tags && rol.tags.guildConnections) || (rol.tags && rol.tags.botId)) {
      interaction.reply({
        content: `Este rol pertenece a una integracion o un bot del servidor y no se puede agregar a ningun otro miembro.`,
        ephemeral: true,
      });
      return;
    }

    if (rol.tags && rol.tags.guildConnections) {
      await interaction.reply({
        content: `Los roles administrados por conexiones del servidor no pueden ser aregados o quitados manualmente.`,
        ephemeral: true,
      });
      return;
    }

    if (rol.tags && rol.tags.availableForPurchase) {
      await interaction.reply({
        content: `Este rol no esta disponible para ser agregado.`,
        ephemeral: true,
      });
      return;
    }

    try {
      switch (sub) {
        case "all":
          try {

            if (
              rol.permissions.has(PermissionsBitField.Flags.Administrator) ||
              rol.permissions.has(PermissionsBitField.Flags.ManageGuild) ||
              rol.permissions.has(PermissionsBitField.Flags.ManageChannels) ||
              rol.permissions.has(PermissionsBitField.Flags.BanMembers) || 
              rol.permissions.has(PermissionsBitField.Flags.KickMembers) ||
              rol.permissions.has(PermissionsBitField.Flags.ManageRoles) ||
              rol.permissions.has(PermissionsBitField.Flags.ManageWebhooks) ||
              rol.permissions.has(PermissionsBitField.Flags.ModerateMembers)
            ) {
              return await interaction.reply({
                content: `El rol seleccionado tiene permisos **Peligrosos**.\n**NO** es recomendable agregarlo de esta manera.`,
                ephemeral: true,
              });
            }

            const members = interaction.guild.members.cache;
            let count = 0;

            interaction.reply({
              content: `${agregar} el rol ${rol} a ${members.size} miembros`,
              allowedMentions: { repliedUser: false, parse: [] },
            });

            for (const [_, member] of members) {
              if (agregar === 'agregar' && !member.roles.cache.has(rol.id)) {
                try {
                  await member.roles.add(rol.id);
                } catch (error) {
                  continue;
                }
                count++;
              } else if (agregar === 'quitar' && member.roles.cache.has(rol.id)) {
                try {
                  await member.roles.remove(rol.id);
                } catch (error) {
                  continue;
                }
                count++;
              }
            }

            if (count > 0) {
              await interaction.channel.send({
                content: `La accion ${agregar} el rol **${rol}** a **${count}** miembros se completo.`,
                allowedMentions: { parse: [] }
              });
            } else {
              await interaction.channel.send({
                content: `${interaction.user} No se realizó ninguna operación en los miembros.\nAsegurate de que mi rol este mas por encima del rol que intentas dar o quitar.`,
                allowedMentions: { parse: [] }
              });
            }
          } catch { }
          break;

        case "member":
          try {
            if (miembro.roles.cache.has(rol.id)) {
              interaction.reply({
                content: `Este miembro ya tiene el rol **${rol.name}**`,
                allowedMentions: { repliedUser: false },
              });
            } else {
              try {
                await miembro.roles.add(rol.id);
              } catch (error) {
                interaction.channel.send({
                  content: `${interaction.user} No pude dar el rol ${rol} a ${miembro}, verifica que mi rol este mas arriba que el rol que intentas asignar.`,
                });
              }
              await interaction.reply({
                content: `Rol ${rol} agregado a ${miembro}`,
                allowedMentions: { repliedUser: false, parse: [] },
              });
            }
          } catch { }
          break;

        case "humans":
          try {
            if (
              rol.permissions.has(PermissionsBitField.Flags.Administrator) ||
              rol.permissions.has(PermissionsBitField.Flags.ManageGuild) ||
              rol.permissions.has(PermissionsBitField.Flags.ManageChannels) ||
              rol.permissions.has(PermissionsBitField.Flags.BanMembers) || 
              rol.permissions.has(PermissionsBitField.Flags.KickMembers) ||
              rol.permissions.has(PermissionsBitField.Flags.ManageRoles) ||
              rol.permissions.has(PermissionsBitField.Flags.ManageWebhooks) ||
              rol.permissions.has(PermissionsBitField.Flags.ModerateMembers)
            ) {
              return await interaction.reply({
                content: `El rol seleccionado tiene permisos **Peligrosos**.\n**NO** es recomendable agregarlo de esta manera.`,
                ephemeral: true,
              });
            }

            const humans = interaction.guild.members.cache.filter(
              (member) => !member.user.bot
            );

            await interaction.reply({
              content: `${agregar} el rol ${rol} a ${humans.size} miembros humanos`,
              allowedMentions: { repliedUser: false, parse: [] },
            });
            let count = 0;

            for (const [_, human] of humans) {
              if (agregar === 'agregar' && !human.roles.cache.has(rol.id)) {
                try {
                  await human.roles.add(rol.id);
                } catch (error) {
                  continue;
                }
                count++;
              } else if (agregar === 'quitar' && human.roles.cache.has(rol.id)) {
                try {
                  await human.roles.remove(rol.id);
                } catch (error) {
                  continue;
                }
                count++;
              }
            }

            if (count > 0) {

              await interaction.channel.send({
                content: `La accion ${agregar} el rol **${rol}** a **${count}** miembros humanos se realizo correctamente.`,
                allowedMentions: { parse: [] }
              });
            } else {
              await interaction.channel.send({
                content: `${interaction.user} No se realizó ninguna operación en los miembros.\nAsegurate de que mi rol este mas por encima del rol que intentas dar o quitar.`,
                allowedMentions: { parse: [] }
              });
            }
          } catch { }
          break;

        case "bots":
          try {
            const bots = interaction.guild.members.cache.filter(
              (member) => member.user.bot
            );
            await interaction.reply({
              content: `${agregar} el rol ${rol} a ${bots.size} bots`,
              allowedMentions: { repliedUser: false, parse: [] },
            });
            let count = 0;

            for (const [_, bot] of bots) {
              if (agregar === 'agregar' && !bot.roles.cache.has(rol.id)) {
                try {
                  await bot.roles.add(rol.id);
                } catch (error) {
                  continue;
                }
                count++;
              } else if (agregar === 'quitar' && bot.roles.cache.has(rol.id)) {
                try {
                  await bot.roles.remove(rol.id);
                } catch (error) {
                  continue;
                }
                count++;
              }
            }

            if (count > 0) {
              await interaction.channel.send({
                content: `La ccion ${agregar} el rol **${rol}** a **${count}** bots se realizo correctamente.`,
                allowedMentions: { parse: [] }
              });
            } else {
              await interaction.channel.send({
                content: `${interaction.user} No se realizó ninguna operación en los bots.\nAsegurate de que mi rol este mas por encima del rol que intentas dar o quitar.`,
                allowedMentions: { parse: [] }
              });
            }
          } catch { }
          break;
      }
    } catch (error) {
      interaction.reply({
        content: `Algo salio mal y no puedo dar el rol :c\nVerifica mis permisos y la configuracion del rol que intentas dagregar.`,
        allowedMentions: { repliedUser: false },
      });
    }
  },
};
