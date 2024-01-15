const mongoose = require("mongoose");
const { Types } = require("mongoose");
const Discord = require("discord.js");
const {
  EmbedBuilder,
  ActionRowBuilder,
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType } = require('discord.js');
const reseñas = require("../../Model/servidor/reseñas");
const roleSchema = require("../../Model/verificacion/verificationSchema");
const conteo = require("../../Model/conteo/conteoDB");
const Schemas = require(`${process.cwd()}/Model/servidor/antialts.js`);
const chalk = require("chalk");
module.exports = {
  permisos: [
    "Administrator"
  ],
  botpermisos: [
    "ManageGuild",
    "ManageChannels",
    "SendMessages",
    "EmbedLinks",
    "ManageMessages"
  ],
  data: new SlashCommandBuilder()
    .setName("setups")
    .setDescription("🎉 Configura los setups del servidor.")
    .addSubcommand((options) =>
      options
        .setName("verificacion")
        .setDescription("🎉 Configura los canales de verificacion del servidor.")
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("Establecer el rol de verificacion en el servidor")
            .setRequired(true)
        )
        .addChannelOption((option) =>
          option
            .setName("canal")
            .setDescription("Canal al que enviar el mensaje.")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true))
        .addStringOption((option) =>
          option
            .setName("mensaje")
            .setDescription("Mensaje que tendra el setup de verificacion.")
            .setRequired(false)
            .setMinLength(5)
            .setMaxLength(300)
        )
        .addStringOption((option) =>
          option
            .setName("titulo")
            .setDescription("titulo del mensaje de verificacion")
            .setRequired(false)
            .setMinLength(5)
            .setMaxLength(60)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("reseñas")
        .setDescription("🎉 Establece el canal de reseñas del servidor")
        .addChannelOption((option) =>
          option
            .setName("canal")
            .setDescription("Elija un canal específico para enviar la confirmacion")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("conteo")
        .setDescription("🎉 Establece el canal de el conteo del servidor")
        .addChannelOption((option) =>
          option
            .setName("canal")
            .setDescription("Elija un canal específico para enviar la confirmacion")
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("antialts")
        .setDescription("🎉 Establece el sistema de antialts del bot de discord")
        .addBooleanOption((option) => 
          option
            .setName('estado')
            .setDescription('Activa o desactiva el sistema de AntiAlts')
        )
        .addNumberOption((option) => 
          option
            .setName('dias')
            .setDescription('Dias para verificar')
            .setRequired(false)
        )
        .addStringOption((option) => 
          option.setName("accion")
            .setDescription("Que accion se llevara acabo con las multicuentas") 
            .setRequired(false)
            .addChoices(
              { name: "☠️ Banear", value: "ban" },
              { name: "☠️ Kickear", value: "kick" }
          )
        )
        .addChannelOption((option) => 
          option
            .setName('canal')
            .setDescription('Canal donde se enviaran los logs de el sistema')
            .setRequired(false)
            .addChannelTypes(ChannelType.GuildText)
        )
    ),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case "verificacion":
        {
          const channel = interaction.options.getChannel("canal");
          const description = interaction.options.getString("mensaje");
          const title = interaction.options.getString("titulo");
          const role = interaction.options.getRole("role");

          const embed = new EmbedBuilder()
            .setDescription(description || "¡Bienvenido al servidor! ¡Por favor autorícese haciendo clic en el botón de abajo! Cuando verifique, se le otorgará el rol 'verificado'")
            .setColor("Navy")
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setTitle(title || `Bienvenido a ${interaction.guild.name}!`);

          const button = new ActionRowBuilder()
            .setComponents(
              new ButtonBuilder()
                .setCustomId("verifyMember")
                .setLabel("Verificacion")
                .setStyle(ButtonStyle.Primary)
                .setEmoji("<:dev_yes:999673591341797416>")
            );

          const roleId = await roleSchema.findOne({ roleId: role.id });
          if (!roleId) {
            verifyRole = await new roleSchema({
              _id: mongoose.Types.ObjectId(),
              guildId: interaction.guild.id,
              roleId: role.id,
            });

            await verifyRole.save().catch(console.error);
  
          channel.send({ embeds: [embed], components: [button] }).catch((error) => {});
          interaction.reply({ 
            embeds: [
              new EmbedBuilder()
                .setTitle("Sistema de verificacion 🟢")
                .setDescription([
                  `\`•\` Estado: \`Activado\``,
                  `\`•\` Canal: <#${channel.id}>`,
                  `\`•\` Fecha: ${new Date().toTimeString()}`,
                  `\`•\` Hora: ${new Date().toDateString()}`
                ].join("\n"))
            ],
            ephemeral: true 
          }).catch((error) => { });
          } else {
            await verifyRole.save().catch(console.error);
            await interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle('Sistema de Verificacion! 🔴')
                  .setDescription([
                    `\`•\` Estado: \`Desactivado\``,
                    `\`•\` Error: El rol elejido ya esta en la base de datos`,
                  ].join("\n"))
              ],
              ephemeral: true
            })
          }
        }
        break;
      case "reseñas": {
        let canal = interaction.options.getChannel("canal");
        if (!canal) return interaction.reply({ 
          embeds: [
            new EmbedBuilder()
              .setTitle('Sistema de Reseñas! 🟡')
              .setDescription([
                `\`•\` Estado: \`Desactivado\``,
                `\`•\` Canal: \`No establecido\``,
                `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                `\`•\` Hora: ${new Date().toLocaleTimeString()}`
              ].join("\n"))
          ],
          ephemeral: true 
        }).catch((error) => {});
        let data = await reseñas.findOne({ guildID: interaction.guild.id, channelID: canal.id })
        if (!data) {
          let nw = new reseñas({
            guildID: interaction.guild.id,
            channelID: canal.id,
          })
          await nw.save()
        }
        await reseñas.findOneAndUpdate({ guildID: interaction.guild.id }, {
          channelID: canal.id,
        })
        interaction.reply({ 
          embeds: [
            new EmbedBuilder()
              .setTitle('Sistema de Reseñas! 🟢')
              .setDescription([
                `\`•\` Estado: \`Activado\``,
                `\`•\` Canal: ${canal}`,
                `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                `\`•\` Hora: ${new Date().toLocaleTimeString()}`
              ].join("\n"))
          ],
          ephemeral: true 
        }).catch((error) => {});
      }
        break;
      case "conteo": {
        let canal = interaction.options.getChannel("canal");
        if (!canal) return interaction.reply({ 
          embeds: [
            new EmbedBuilder()
              .setTitle('Sistema de Conteo! 🟡')
              .setDescription([
                `\`•\` Estado: \`Desactivado\``,
                `\`•\` Razon: \`No se ha especificado un canal valido\``,
                `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
              ].join("\n"))
          ],
          ephemeral: true 
        }).catch((error) => {});
        let data = await conteo.findOne({ guildId: interaction.guild.id, channelId: canal.id })
        if (!data) {
          let nw = new conteo({
            guildId: interaction.guild.id,
            channelId: canal.id,
            numero: 1
          })
          await nw.save()
        }
        await conteo.findOneAndUpdate({ guildId: interaction.guild.id }, {
          channelId: canal.id,
          numero: 1
        })
        interaction.reply({ 
          embeds: [
            new EmbedBuilder()
              .setTitle('Sistema de Conteo! 🟢')
              .setDescription([
                `\`•\` Estado: \`Activado\``,
                `\`•\` Canal: ${canal}`,
                `\`•\` Numero: \`1\``
              ].join('\n'))
          ],
          ephemeral: true 
        }).catch((error) => { });
      }
        break;
      case "antialts": {
        const estado = interaction.options.getBoolean('estado');
        if (estado === null) return interaction.reply({ 
          embeds: [
            new EmbedBuilder()
              .setTitle('Sistema de Anti-Alts! 🟡')
              .setDescription([
                `\`•\` Estado: \`Error\``,
                `\`•\` Canal: ${canal || interaction.channel}`,
                `\`•\` Motivo: \`No registraste un Dato Valido\``
              ].join('\n'))
          ],
          ephemeral: true 
        });
        const dias = interaction.options.getNumber('dias');
        if (dias < 1) return interaction.reply({ 
          embeds: [
            new EmbedBuilder()
              .setTitle('Sistema de Anti-Alts! 🟡')
              .setDescription( [
                `\`•\` Estado: \`Error\``,
                `\`•\` Canal: ${canal || interaction.channel}`,
                `\`•\` Motivo: \`Los dias no pueden ser menor a 1\``
              ].join('\n'))
          ],
          ephemeral: true 
        });
        const accion = interaction.options.getString('accion');
        const canal = interaction.options.getChannel('canal');
        if (estado === true) {
          Schemas.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
            if (!data) return interaction.reply({ 
              embeds: [
                new EmbedBuilder()
                  .setTitle('Sistema de Anti-Alts! 🟢')
                  .setDescription([
                    `\`•\` Estado: \`Activado\``,
                    `\`•\` Canal: ${canal || interaction.channel}`,
                    `\`•\` Dias: ${dias}`,
                    `\`•\` Accion: ${accion || 'ban'}`
                  ].join('\n'))
              ]
            })
            new Schemas({
              GuildID: interaction.guild.id,
              Option: accion || 'ban',
              Channel: canal.id || interaction.channel.id,
              Days: dias || 7,
            }).save();
          })
          return interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setTitle('Sistema de Anti-Alts! 🟢')
                .setDescription([
                  `\`•\` Estado: \`Activado\``,
                  `\`•\` Canal: ${canal || interaction.channel}`,
                  `\`•\` Dias: ${dias}`,
                  `\`•\` Accion: ${accion || 'ban'}`
                ].join('\n'))
            ]
          });
        }
        if (estado === false) {
          Schemas.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
            if (!data) return interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle('Sistema de Anti-Alts! 🔴')
                  .setDescription([
                    `\`•\` Estado: \`Desactivado\``,
                    `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                    `\`•\` Hora: ${new Date().toLocaleTimeString()}`
                  ].join('\n'))
              ]
            })
            data.delete();
          })
          return interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle('Sistema de Anti-Alts! 🔴')
                .setDescription([
                  `\`•\` Estado: \`Desactivado\``,
                  `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                  `\`•\` Hora: ${new Date().toLocaleTimeString()}`
                ].join('\n'))
            ]
          });
        } else {
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle('Sistema de Anti-Alts! 🔴')
                .setDescription([
                  `\`•\` Estado: \`Desactivado\``,
                  `\`•\` Fecha: ${new Date().toLocaleDateString()}`,
                  `\`•\` Hora: ${new Date().toLocaleTimeString()}`,
                  `\`•\` Error: \`No se pudo desactivar el sistema\``
                ].join('\n'))
            ]
          });
        }
      }
        break;
    }
  },
};
