const {
  SlashCommandBuilder,
  CommandInteraction,
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
  ButtonStyle,
  EmbedBuilder,
  ButtonBuilder,
  ChannelType,
} = require("discord.js");
const Discord = require("discord.js");
const chalk = require("chalk");
const SuggestionSetup = require("../../Model/sugerencia/suggestionSetup");
module.exports = {
  botpermisos: [
    "SendMessages",
    "EmbedLinks",
    "ReadMessageHistory",
    "UseExternalEmojis",
    "AddReactions",
    "AttachFiles",
  ],
  permisos: [
    "SendMessages",
    "EmbedLinks",
    "ReadMessageHistory",
    "UseExternalEmojis",
  ],
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("🌍 Muestra información sobre el servidor/usuario")
    .addSubcommand((options) =>
      options
        .setName("server")
        .setDescription("🌍 Muestra información sobre el servidor")
                   
    )
    .addSubcommand((options) =>
      options
        .setName("user")
        .setDescription("🌍 Muestra información sobre el usuario")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("El usuario que quieres ver la informacion")
            .setRequired(false)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("avatar")
        .setDescription("🌍 Muestra el avatar de un usuario del servidor")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("Provide a user to check")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("role")
        .setDescription("🌍 Muestra información sobre algun rol del servidor")
        .addRoleOption((option) =>
          option
            .setName("info")
            .setDescription("Provide a role to check")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("sugerencia")
        .setDescription("🌍 Manda una sugerencia a los creadores del servidor")
    )
    .addSubcommand((options) =>
      options
        .setName("permisos")
        .setDescription("🌍 Obten los permisos de diferentes usuarios de discord")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("elije el usuario al que quieres decifrar")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("channelinfo")
        .setDescription("🌍 Muestra la informacion del canal")
        .addChannelOption((option) =>
          option
            .setName("canal")
            .setDescription("Elige el canal del que obtendremos informacion")
            .setRequired(false)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("google")
        .setDescription(
          "🌍 Busca en googley mas de 3 plataformas alguna informacion"
        )
        .addStringOption((option) =>
          option
            .setName("busqueda")
            .setDescription("Escribe lo que quieres buscar")
            .setRequired(true)
            .setMaxLength(20)
            .setMinLength(3)
        )
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { guild, options } = interaction;
    switch (options.getSubcommand()) {
      case "server":
        {
          const { members, channels, emojis, roles, stickers } = guild;

          const sortedRoles = roles.cache
            .map((role) => role)
            .slice(1, roles.cache.size)
            .sort((a, b) => b.position - a.position);
          const userRoles = sortedRoles.filter((role) => !role.managed);
          const managedRoles = sortedRoles.filter((role) => role.managed);
          const botCount = members.cache.filter(
            (member) => member.user.bot
          ).size;

          const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
            let totalLength = 0;
            const result = [];

            for (const role of roles) {
              const roleString = `<@&${role.id}>`;

              if (roleString.length + totalLength > maxFieldLength) break;

              totalLength += roleString.length + 1; // +1 as it's likely we want to display them with a space between each role, which counts towards the limit.
              result.push(roleString);
            }

            return result.length;
          };

          const getChannelTypeSize = (type) =>
            channels.cache.filter((channel) => type.includes(channel.type))
              .size;

          const totalChannels = getChannelTypeSize([
            ChannelType.GuildText,
            ChannelType.GuildNews,
            ChannelType.GuildVoice,
            ChannelType.GuildStageVoice,
            ChannelType.GuildForum,
            ChannelType.GuildPublicThread,
            ChannelType.GuildPublicThread,
            ChannelType.GuildPrivateThread,
            ChannelType.GuildNewsThread,
            ChannelType.GuildCategory,
          ]);

          const explicitContentFilter = [
            "Disabled",
            "Members without roles",
            "All members",
          ];

          const verificationLevel = [
            "None",
            "Low",
            "Medium",
            "High",
            "Very high",
          ];

          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(members.me.roles.highest.hexColor)
                .setTitle(`${guild.name}'s Information`)
                .setThumbnail(guild.iconURL({ dynamic: true, size: 1024 }))
                .setImage(guild.bannerURL({ dynamic: true, size: 1024 }))
                .addFields(
                  {
                    name: "Description",
                    value: `📝 ${guild.description || "None"}\n\n`,
                  },

                  {
                    name: "General",
                    value: [
                      `📜 Created: <t:${parseInt(
                        guild.createdTimestamp / 1000
                      )}:R>`,
                      `💳 ID: ${guild.id}`,
                      `👑 Owner: <@${guild.ownerId}>`,
                      `🤝🏻 Partnered: ${guild.partnered ? "Yes" : "No"}`,
                      `🌍 Language: ${new Intl.DisplayNames(["en"], {
                        type: "language",
                      }).of(guild.preferredLocale)}`,
                      `💻 Vanity URL: ${guild.vanityURLCode || "None"}`,
                      `🔞 Explicit Filter: ${explicitContentFilter[guild.explicitContentFilter]
                      }`,
                      `🔒 Verification Level: ${verificationLevel[guild.verificationLevel]
                      }`,
                    ].join("\n"),
                    inline: true,
                  },

                  {
                    name: `Channels, Threads & Categories (${totalChannels})`,
                    value: [
                      `💬 Text: ${getChannelTypeSize([
                        ChannelType.GuildText,
                        ChannelType.GuildForum,
                        ChannelType.GuildNews,
                      ])}`,
                      `🎙 Voice: ${getChannelTypeSize([
                        ChannelType.GuildVoice,
                        ChannelType.GuildStageVoice,
                      ])}`,
                      `🧵 Threads: ${getChannelTypeSize([
                        ChannelType.GuildPublicThread,
                        ChannelType.GuildPrivateThread,
                        ChannelType.GuildNewsThread,
                      ])}`,
                      `📑 Categories: ${getChannelTypeSize([
                        ChannelType.GuildCategory,
                      ])}`,
                    ].join("\n"),
                    inline: true,
                  },

                  {
                    name: `🎭 User Roles (${maxDisplayRoles(userRoles)} of ${userRoles.length
                      })`,
                    value: `${userRoles
                      .slice(0, maxDisplayRoles(userRoles))
                      .join(" ") || "None"
                      }`,
                  },
                  {
                    name: `💼 Managed Roles (${maxDisplayRoles(
                      managedRoles
                    )} of ${managedRoles.length})`,
                    value: `${managedRoles
                      .slice(0, maxDisplayRoles(managedRoles))
                      .join(" ") || "None"
                      }`,
                  },

                  {
                    name: `Users (${guild.memberCount})`,
                    value: [
                      `👨‍👩‍👧‍👦 Members: ${guild.memberCount - botCount}`,
                      `🤖 Bots: ${botCount}`,
                    ].join("\n"),
                    inline: true,
                  },

                  {
                    name: `Emojis & Stickers (${emojis.cache.size + stickers.cache.size
                      })`,
                    value: [
                      `📺 Animated: ${emojis.cache.filter((emoji) => emoji.animated).size
                      }`,
                      `🗿 Static: ${emojis.cache.filter((emoji) => !emoji.animated).size
                      }`,
                      `🏷 Stickers: ${stickers.cache.size}`,
                    ].join("\n"),
                    inline: true,
                  },

                  {
                    name: "Nitro",
                    value: [
                      `📈 Tier: ${guild.premiumTier || "None"}`,
                      `💪🏻 Boosts: ${guild.premiumSubscriptionCount}`,
                      `💎 Boosters: ${guild.members.cache.filter(
                        (member) => member.roles.premiumSubscriberRole
                      ).size
                      }`,
                      `🏋🏻‍♀️ Total Boosters: ${guild.members.cache.filter(
                        (member) => member.premiumSince
                      ).size
                      }`,
                    ].join("\n"),
                    inline: true,
                  },

                  {
                    name: "Banner",
                    value: guild.bannerURL() ? "** **" : "None",
                  }
                ),
            ],
            components: [
              new Discord.ActionRowBuilder().addComponents([
                new Discord.ButtonBuilder()
                  .setStyle(ButtonStyle.Primary)
                  .setEmoji("1028005794865754182")
                  .setLabel("Creador del Servidor")
                  .setCustomId("Owner"),
                new Discord.ButtonBuilder()
                  .setStyle(ButtonStyle.Primary)
                  .setEmoji("1005886642382442616")
                  .setLabel("Invitacion")
                  .setCustomId("Invitacion"),
              ]),
            ],
          }).catch((error) =>
            console.log(chalk.cyanBright("[Slash]") + ` Se produjo un Error en el Slash [Info] en el Servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));
        }
        break;
      case "user":
        {
          const target = interaction.options.getMember("target") || interaction.member;
          const { user, presence, roles } = target;
          const formatter = new Intl.ListFormat("en-GB", { style: "long", type: "conjunction" });
          await user.fetch();

          const statusType = {
            idle: "1FJj7pX.png",
            dnd: "fbLqSYv.png",
            online: "JhW7v9d.png",
            invisible: "dibKqth.png"
          };

          const activityType = [
            "🕹 **Playing**",
            "🎙 **Streaming**",
            "🎧 **Listening to**",
            "📺 **Watching**",
            "🤹🏻‍♀️ **Custom**",
            "🏆 **Competing in**"
          ];

          const clientType = [
            { name: "desktop", text: "Computer", emoji: "💻" },
            { name: "mobile", text: "Phone", emoji: "📱" },
            { name: "web", text: "Website", emoji: "🌍" },
            { name: "offline", text: "Offline", emoji: "💤" }
          ];

          const badges = {
            BugHunterLevel1: "Bug Hunter",
            BugHunterLevel2: "Bug Buster",
            CertifiedModerator: "Discord Certified Moderator",
            HypeSquadOnlineHouse1: "House of Bravery",
            HypeSquadOnlineHouse2: "House of Brilliance",
            HypeSquadOnlineHouse3: "House of Balance",
            Hypesquad: "HypeSquad Event Attendee",
            Partner: "Discord Partner",
            PremiumEarlySupporter: "Early Nitro Supporter",
            Staff: "Discord Staff",
            VerifiedBot: "Verified Bot",
            VerifiedDeveloper: "Early Verified Bot Developer"
          };
          const clientStatus = presence?.clientStatus instanceof Object ? Object.keys(presence.clientStatus) : "offline";
          const userFlags = user.flags.toArray();

          const deviceFilter = clientType.filter(device => clientStatus.includes(device.name));
          const devices = !Array.isArray(deviceFilter) ? new Array(deviceFilter) : deviceFilter;

          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setColor(user.hexAccentColor || "Random")
                .setAuthor({
                  name: user.tag,
                  iconURL: `https://i.imgur.com/${statusType[presence?.status || "invisible"]}`
                })
                .setThumbnail(user.avatarURL({ dynamic: true, size: 1024 }))
                .setImage(user.bannerURL({ dynamic: true, size: 1024 }))
                .addFields(
                  { name: "💳 ID", value: user.id },
                  { name: "🎢 Activities", value: presence?.activities.map(activity => `${activityType[activity.type]} ${activity.name}`).join("\n") || "None" },
                  { name: "🤝🏻 Joined Server", value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, inline: true },
                  { name: "📆 Account Created", value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`, inline: true },
                  { name: "🦸🏻‍♀️ Nickname", value: target.nickname || "None", inline: true },
                  {
                    name: `🎭 Roles (${roles.cache.size - 1})`,
                    value: roles.cache.map(roles => roles).sort((a, b) => b.position - a.position).join(" ").replace("@everyone", "") || "None"
                  },
                  { name: `🏅 Badges (${userFlags.length})`, value: userFlags.length ? formatter.format(userFlags.map(flag => `**${badges[flag]}**`)) : "None" },
                  { name: `🤳🏻 Devices`, value: devices.map(device => `${device.emoji} ${device.text}`).join("\n"), inline: true },
                  { name: "🎨 Profile Colour", value: user.hexAccentColor || "None", inline: true },
                  { name: "🏋🏻‍♀️ Boosting Server", value: roles.premiumSubscriberRole ? `Since <t:${parseInt(target.premiumSinceTimestamp / 1000)}:R>` : "No", inline: true },
                  { name: "🎏 Banner", value: user.bannerURL() ? "** **" : "None" }
                )
            ], components: [new Discord.ActionRowBuilder().addComponents(
              [
                new Discord.ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji("1028005783134294138").setLabel("Avatar").setCustomId("Usuario"),
                new Discord.ButtonBuilder().setStyle(ButtonStyle.Success).setEmoji("1028005781607546930").setLabel("Permisos").setCustomId("Permisos"),
              ]
            )]
          }).catch((error) =>
            console.log(chalk.cyanBright("[Slash]") + ` Se produjo un Error en el Slash [Info] en el Servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));
        }
        break;
      case "avatar":
        {
          try {
            const user =
              interaction.options.getUser("user") || interaction.user;

            let png = user.avatarURL({
              format: "png",
              dynamic: true,
              size: 1024,
            });
            let jpg = user.avatarURL({
              format: "jpg",
              dynamic: true,
              size: 1024,
            });
            let webp = user.avatarURL({
              format: "webp",
              dynamic: true,
              size: 1024,
            });

            const avatar = new Discord.EmbedBuilder()
              .setAuthor({
                name: "Avatar de " + interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
              })
              .setImage(
                user.displayAvatarURL({
                  format: "png",
                  dynamic: true,
                  size: 1024,
                })
              )
              .setFooter({ text: `Avatar pedido por ${interaction.user.tag}` })
              .setTimestamp()
              .setColor("Random");

            interaction.reply({
              embeds: [avatar],
              components: [
                new Discord.ActionRowBuilder().addComponents([
                  new Discord.ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setEmoji("1026467687649513563")
                    .setLabel("PNG")
                    .setURL(`${png}`),
                  new Discord.ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setEmoji("1026467687649513563")
                    .setLabel("JPG")
                    .setURL(`${jpg}`),
                  new Discord.ButtonBuilder()
                    .setStyle(ButtonStyle.Link)
                    .setEmoji("1026467687649513563")
                    .setLabel("WEBP")
                    .setURL(`${webp}`),
                ]),
              ],
            }).catch((error) =>
              console.log(chalk.cyanBright("[Slash]") + ` Se produjo un Error en el Slash [Info] en el Servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));
          } catch (e) {
            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle(
                    `<:VS_cancel:1006609599199186974> New status code invalid?`
                  )
                  .setDescription(`\`\`\`yml\n${e}\`\`\``)
                  .setColor("Random")
                  .setFooter({ text: `Error en el comando avatar` }),
              ],
              ephemeral: true,
            });
          }
        }
        break;
      case "role":
        {
          try {
            const role = interaction.options.getRole("info");
            if (!role) return interaction.reply(client.main);
            let roleP = role.permissions.toArray().join(" | ");
            if (roleP.length > 1024) roleP = "Too many permissions to display";
            const roleInfo = new Discord.EmbedBuilder()
              .setAuthor({
                name: `Role Information ${role.name}`,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
              })
              .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
              .addFields(
                {
                  name: `\`•\` Role name:`,
                  value: `*${role.name}*`,
                  inline: true,
                },
                {
                  name: `\`•\` Role color:`,
                  value: `*${role.color}*`,
                  inline: true,
                },
                {
                  name: `\`•\` Role hex color:`,
                  value: `*${role.hexColor}*`,
                  inline: true,
                },
                {
                  name: `\`•\` Mention:`,
                  value: `*${role.toString()}*`,
                  inline: true,
                },
                {
                  name: `\`•\` Created AT:`,
                  value: `*${role.createdAt.toLocaleTimeString()}*`,
                  inline: true,
                },
                { name: `\`•\` Role ID:`, value: `*${role.id}*`, inline: true },
                {
                  name: `\`•\` Role position:`,
                  value: `*${role.position}*`,
                  inline: true,
                },
                {
                  name: `\`•\` Role members:`,
                  value: `*${role.members.size}*`,
                  inline: true,
                },
                {
                  name: `\`•\` Role Hoist:`,
                  value: `*${role.hoist}*`,
                  inline: true,
                },
                {
                  name: `\`•\` Role Permissions:`,
                  value: `\`${roleP}\``,
                  inline: true,
                }
              )
              .setColor(role.color)
              .setTimestamp()
              .setFooter({
                text: interaction.user.tag,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
              });

            let web = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setStyle(ButtonStyle.Primary)
                .setLabel("Owner")
                .setCustomId("Owner")
                .setEmoji("1028717188112203867")
            );
            interaction.reply({ embeds: [roleInfo], components: [web] }).catch((error) =>
              console.log(chalk.cyanBright("[Slash]") + ` Se produjo un Error en el Slash [Info] en el Servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));
          } catch (e) {
            interaction.reply({
              embeds: [
                new EmbedBuilder()
                  .setTitle(
                    `<:VS_cancel:1006609599199186974> New status code invalid?`
                  )
                  .setDescription(`\`\`\`yml\n${e}\`\`\``)
                  .setColor("Random")
                  .setFooter({ text: `Error en el comando role-info` }),
              ],
              ephemeral: true,
            });
            console.log(
              chalk.redBright(`[Error]`) +
              chalk.whiteBright(
                `Se ha usado el comando roles en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`
              )
            );
          }
        }
        break;
      case "sugerencia":
        {
          const { guild } = interaction;
          const SuggestionSetupDB = await SuggestionSetup.findOne({
            GuildID: guild.id,
          });
          if (!SuggestionSetupDB)
            return interaction.reply({
              content: `<:VS_cancel:1006609599199186974> **Warning:** Couldn't find any data on this system, please use the \`/sugerencia-setup\` command to set it up.`,
              ephemeral: true,
            })

          const InputField = new TextInputBuilder()
            .setCustomId("suggest_Modal")
            .setLabel("Por Favor proporciona tu sugerencia")
            .setPlaceholder("Sugerencias Sistema!")
            .setMaxLength(300)
            .setMinLength(1)
            .setStyle(TextInputStyle.Paragraph);

          const TestModalTextModalInputRow =
            new ActionRowBuilder().addComponents(InputField);

          const modal = new ModalBuilder()
            .setCustomId("suggestModal")
            .setTitle("Envia tu Sugerencia!")
            .addComponents(TestModalTextModalInputRow);

          await interaction.showModal(modal)
        }
        break;
      case "google": {
        try {
          const text2 = interaction.options.getString("busqueda");
          const google1 = new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL(`https://www.google.com/search?q=${text2}`)
            .setLabel("Google")
            .setEmoji("🔍");

          const bing = new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL(`https://www.bing.com/search?q=${text2}`)
            .setLabel("Bing")
            .setEmoji("🧐");

          const duckduckgo = new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL(`https://duckduckgo.com/?q=${text2}`)
            .setLabel("Duckduckgo")
            .setEmoji("🐤");

          const wikipedia = new Discord.ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setURL(`https://www.wikipedia.org/wiki/${text2}`)
            .setLabel("Wikipedia")
            .setEmoji("🌍");

          let row = new Discord.ActionRowBuilder()
            .addComponents(google1)
            .addComponents(bing);

          let row2 = new Discord.ActionRowBuilder()
            .addComponents(duckduckgo)
            .addComponents(wikipedia);

          const panel = new Discord.EmbedBuilder()
            .setTitle(
              `<:panda_gift:1007529203119439882> Aqui esta tu busqueda recientemente`
            )
            .addFields({
              name: `\`•\` Busqueda Realizada`,
              value: `${text2}`
            })
            .setTimestamp()
            .setFooter({
              text: `Busquedas y Mas solo en mi servidor de soporte`,
            })
            .setColor(`Random`);
          interaction.reply({
            embeds: [panel],
            components: [row, row2],
            ephemeral: true,
          }).catch((error) =>
            console.log(chalk.cyanBright("[Slash]") + ` Se produjo un Error en el Slash [Info] en el Servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));
        } catch (e) {
          interaction.reply({
            embeds: [
              new Discord.EmbedBuilder()
                .setTitle(
                  `<:VS_cancel:1006609599199186974> New status code invalid?`
                )
                .setDescription(`\`\`\`yml\n${e}\`\`\``)
                .setColor("Random")
                .setFooter({ text: `Error en el comando google` }),
            ],
            ephemeral: true,
          });
        }
      }
        break;
      case "permisos": {
        const { member, channelId, guildId, applicationId, commandName, deferred, replied, ephemeral, options, id, createdTimestamp } = interaction;
        const { guild } = member;
        const user = interaction.options.getUser("user");
        if (!user) user = member.user;
        try {
          try {
            const member = guild.members.cache.get(user.id);
            const embeduserinfo = new Discord.EmbedBuilder()
            embeduserinfo.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
            embeduserinfo.setTitle(`Aqui esta la informacion de ${member.user.username}`)
            embeduserinfo.setAuthor({ name: "Obtencion de Permisos", iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            embeduserinfo.addFields({ name: "Estos son los permisos obtenidos", value: `${member.permissions.toArray().map(p => `\`${p}\``).join(" | ")}` })
            embeduserinfo.setColor("Random").setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            embeduserinfo.setFooter({ text: "Comandos Personalizados Qin Shi Huang" })
            interaction?.reply({ embeds: [embeduserinfo] })
          } catch (e) {
            const embeduserinfo = new Discord.EmbedBuilder()
            embeduserinfo.setThumbnail(user.displayAvatarURL({ dynamic: true, size: 512 }))
            embeduserinfo.setTitle(`Aqui esta la informacion de ${member.user.username}`)
            embeduserinfo.setAuthor({ name: "Obtencion de Permisos", iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            embeduserinfo.addFields({ name: "Estos son los permisos obtenidos", value: `${member.permissions.toArray().map(p => `\`${p}\``).join(" | ")}` })
            embeduserinfo.setColor("Random").setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            embeduserinfo.setFooter({ text: "Comandos Personalizados Qin Shi Huang" })
            interaction?.reply({ embeds: [embeduserinfo] })
          }
        } catch (e) {
          interaction.reply({
            embeds: [
              new Discord.EmbedBuilder()
                .setTitle(
                  `<:VS_cancel:1006609599199186974> New status code invalid?`
                )
                .setDescription(`\`\`\`yml\n${e}\`\`\``)
                .setColor("Random")
                .setFooter({ text: `Error en el comando role-info` }),
            ],
            ephemeral: true,
          });
        }
      }
        break;
      case "channelinfo": {
        try {
          const canal = interaction.options.getChannel("canal") || interaction.channel;
          let canaltype;
          if (canal.type === ChannelType.GuildText) canaltype = "💾 Texto"
          if (canal.type === ChannelType.GuildVoice) canaltype = "📢 Voz"
          if (canal.type === ChannelType.GuildCategory) canaltype = "📁 Categoría"
          if (canal.type === ChannelType.GuildForum) canaltype = "✅ Foros"
          if (canal.type === ChannelType.GuildDirectory) canaltype = "🛒 Directorio"
          if (canal.type === ChannelType.GuildStageVoice) canaltype = "❌ Stage Voice"

          let category;
          if (canal.parent) {
            category = canal.parent.id
          } else {
            category = "Ninguna"
          }
          const e = new Discord.EmbedBuilder()
            .setTitle(`🌍 Informacion del canal ${canal.name}`)
            .setTimestamp()
            .setColor("Random")
            .addFields(
              { name: "\`•\` Nombre:", value: `*${canal.name}*`, inline: true },
              { name: "\`•\` ID:", value: `*${canal.id}*`, inline: true },
              { name: "\`•\` Categoría:", value: `<#${category}>`, inline: true },
              { name: "\`•\` Creado el:", value: `*<t:${parseInt(canal.createdTimestamp / 1000)}:f> (<t:${parseInt(canal.createdTimestamp / 1000)}:R>)*` },
              { name: "\`•\` Tipo del canal:", value: canaltype, inline: true },
              { name: "\`•\` Nsfw:", value: canal.nsfw ? "*✅ Si*" : "*❌ No*", inline: true },
              { name: "\`•\` Descripcion:", value: canal.topic ? "*✅ Si*" : "*❌ No*", inline: true },
            )
            .setFooter({ text: `Comando Channel Info`, iconURL: interaction.user.avatarURL() })
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }));

          const i = new Discord.ActionRowBuilder()
            .addComponents(
              new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Success)
                .setLabel("Message One")
                .setCustomId("message_one")
                .setEmoji("1028005781607546930"),
              new Discord.ButtonBuilder()
                .setStyle(Discord.ButtonStyle.Success)
                .setLabel("Password")
                .setCustomId("password")
                .setEmoji("🤬"),
            );

          interaction.reply({ embeds: [e], components: [i] }).catch((error) =>
            console.log(chalk.cyanBright("[Slash]") + ` Se produjo un Error en el Slash [Info] en el Servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));
        } catch (e) {
          interaction.reply({
            embeds: [
              new EmbedBuilder()
                .setTitle(
                  `<:VS_cancel:1006609599199186974> New status code invalid?`
                )
                .setDescription(`\`\`\`yml\n${e}\`\`\``)
                .setColor("Random")
                .setFooter({ text: `Error en el comando role-info` }),
            ],
            ephemeral: true,
          });
          console.log(
            chalk.redBright(`[Error]`) +
            chalk.whiteBright(
              `Se ha usado el comando roles en ${interaction.guild.name} con id ${interaction.guild.id} por ${interaction.user.tag} con id ${interaction.user.id}`
            )
          );
        }
      }
        break;
    }
  },
};
