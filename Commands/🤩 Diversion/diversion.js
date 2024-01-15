const Discord = require("discord.js");
const {
  EmbedBuilder,
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ButtonStyle,
} = require("discord.js");
const chalk = require("chalk");
const red = require("reddit-fetch");
const { waifuFetch } = require("../../Api/waifuFetch");
const ecoSchema = require(`${process.cwd()}/Model/economia/economia.js`);
module.exports = {
  botpermisos: [
    "SendMessages",
    "EmbedLinks"
  ],
  data: new SlashCommandBuilder()
    .setName("fun")
    .setDescription("🤩 Comandos de diversion del bot universal")
    .addSubcommand((options) =>
      options
        .setName("apostar")
        .setDescription("🤩 Sirve para apostar una cantidad de dinero")
        .addStringOption((option) =>
          option
            .setName("cantidad")
            .setDescription("Cantidad que apostaras")
            .setRequired(true)
        )
    )
    .addSubcommand((options) =>
      options
        .setName("emotions")
        .setDescription(
          "🤩 Muestra una lista de imagenes que puedes usar para expresar tus emociones"
        )
        .addStringOption((option) => option.setName("accion").setDescription("selecciona la accion a realizar").setRequired(true)
          .addChoices(
            { name: "bite", value: "bite" },
            { name: "blush", value: "blush" },
            { name: "bonk", value: "bonk" },
            { name: "bully", value: "bully" },
            { name: "cringe", value: "cringe" },
            { name: "cry", value: "cry" },
            { name: "cuddle", value: "cuddle" },
            { name: "handhold", value: "handhold" },
            { name: "highfive", value: "highfive" },
            { name: "hug", value: "hug" },
            { name: "kiss", value: "kiss" },
            { name: "pat", value: "pat" },
            { name: "poke", value: "poke" },
            { name: "slap", value: "slap" },
            { name: "wave", value: "wave" },
          ))
        .addUserOption((option) => option.setName("target").setDescription("selecciona el usuario a realizar la accion").setRequired(true))),
  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();
    switch (subcommand) {
      case "emotions": {
        const { options } = interaction;
        try {
          const action = options.getString("accion");
          const target = options.getUser("target");
          switch (action) {
            case "bite": {
              const data = await waifuFetch("bite");

              if (target.id === interaction.user.id)
                return interaction.reply({
                  content: "No. <:peepo_stare:640305010135007255>",
                });

              const biteEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} bites ${target.username}!`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();

              return interaction.reply({ embeds: [biteEmbed] });
            }
              break;
            case "blush": {
              const data = await waifuFetch("blush");

              const blushEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} blushes. ;)`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();
              return interaction.reply({ embeds: [blushEmbed] });
            }
              break;
            case "bonk": {
              const data = await waifuFetch("bonk");

              const bonkieEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} bonks... themselves?`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();

              if (target.id === interaction.user.id)
                return interaction.reply({ embeds: [bonkieEmbed] });

              const bonkietwo = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} bonks ${target.username}!`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();
              return interaction.reply({ embeds: [bonkietwo] });
            }
              break;
            case "bully": {
              const data = await waifuFetch("bully");

              if (target.id === interaction.user.id)
                return interaction.reply({
                  content:
                    "Oh, I'm sure your friends do that to you enough already. Well, if you have any. :)",
                });

              const bullyEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} bullies ${target.username}!`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();
              return interaction.reply({ embeds: [bullyEmbed] });
            }
              break;
            case "cringe": {
              const data = await waifuFetch("cringe");

              const prettyCringe = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} thinks that's pretty cringe.`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setImage(data)
                .setTimestamp();
              return interaction.reply({ embeds: [prettyCringe] });
            }
              break;
            case "cry": {
              const data = await waifuFetch("cry");

              const cryEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} is crying.. :c`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();
              return interaction.reply({ embeds: [cryEmbed] });
            }
              break;
            case "cuddle": {
              const data = await waifuFetch("cuddle");

              const lonerCuddle = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${client.user.username} cuddles ${interaction.user.username}!`,
                  iconURL: `${client.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();

              if (target.id === interaction.user.id)
                return interaction.reply({ embeds: [lonerCuddle] });

              const cuddleEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} cuddles ${target.username}!`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();
              return interaction.reply({ embeds: [cuddleEmbed] });
            }
              break;
            case "handhold": {
              const data = await waifuFetch("handhold");

              const lonerhld = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} is holding hands with ${client.user.username}!`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();

              if (target.id === interaction.user.id)
                return interaction.reply({ embeds: [lonerhld] });

              const handholdEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} is holding hands with ${target.username}!`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();
              return interaction.reply({ embeds: [handholdEmbed] });
            }
              break;
            case "highfive": {
              const data = await waifuFetch("highfive");

              const lonerFive = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} highfives ${client.user.username}!`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({ text: "You're doing great, honey. <3" })
                .setImage(data)
                .setTimestamp();

              if (target.id === interaction.user.id)
                return interaction.reply({ embeds: [lonerFive] });

              const highfiveEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} highfives ${target.username}!`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();
              return interaction.reply({ embeds: [highfiveEmbed] });
            }
              break;
            case "hug": {
              const data = await waifuFetch("hug");

              const lonerHug = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${client.user.username} hugs ${interaction.user.username}!`,
                  iconURL: `${client.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();

              if (target.id === interaction.user.id)
                return interaction.reply({ embeds: [lonerHug] });

              const hugEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} hugs ${target.username}!`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();
              return interaction.reply({ embeds: [hugEmbed] });
            }
              break;
            case "kiss": {
              const data = await waifuFetch("kiss");

              if (target.id === interaction.user.id) {
                const lonerKiss = new EmbedBuilder()
                  .setColor("Grey")
                  .setAuthor({
                    name: `${client.user.username} kisses ${target.username}!`,
                    iconURL: `${client.user.avatarURL({ dynamic: true })}`,
                  })
                  .setFooter({
                    text: "This image was brought to you by the waifu.pics API.",
                  })
                  .setImage(data)
                  .setTimestamp();
                return interaction.reply({ embeds: [lonerKiss] });
              }

              const kissEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} kisses ${target.username}!`,
                  iconURL: `${target.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();
              return interaction.reply({ embeds: [kissEmbed] });
            }
              break;
            case "pat": {
              const data = await waifuFetch("pat");

              const lonerPat = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${client.user.username} pats ${interaction.user.username}!`,
                  iconURL: `${client.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();

              if (target.id === interaction.user.id)
                return interaction.reply({ embeds: [lonerPat] });

              const patEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} pats ${target.username}!`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();
              return interaction.reply({ embeds: [patEmbed] });
            }
              break;
            case "poke": {
              const data = await waifuFetch("poke");

              const lonerPoke = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${client.user.username} pokes ${interaction.user.username}!`,
                  iconURL: `${client.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();

              if (target.id === interaction.user.id)
                return interaction.reply({ embeds: [lonerPoke] });

              const pokeEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} pokes ${target.username}!`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();
              return interaction.reply({ embeds: [pokeEmbed] });
            }
              break;
            case "slap": {
              const data = await waifuFetch("slap");

              if (target.id === interaction.user.id)
                return interaction.reply({
                  content: "Why would you wanna slap yourself, silly?",
                  ephemeral: true,
                });

              const slapEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} slaps ${target.username}!`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();
              return interaction.reply({ embeds: [slapEmbed] });
            }
              break;
            case "wave": {
              const data = await waifuFetch("wave");

              const lonerWave = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${client.user.username} waves at ${target.username}!`,
                  iconURL: `${client.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();

              if (target.id === interaction.user.id)
                return interaction.reply({ embeds: [lonerWave] });

              const waveEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({
                  name: `${interaction.user.username} waves at ${target.username}!`,
                  iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
                })
                .setFooter({
                  text: "This image was brought to you by the waifu.pics API.",
                })
                .setImage(data)
                .setTimestamp();
              return interaction.reply({ embeds: [waveEmbed] });
            }
              break;
          }
        } catch {
          const errorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              `<:VS_cancel:1006609599199186974> Evelyn has ran into an error contacting the API. Please report this issue to the support server.`
            )
            .setTimestamp();
          return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
      }
        break;
      case "apostar": {
        let data = await ecoSchema.findOne({ userID: interaction.user.id });
        const cantidad = interaction.options.getString("cantidad");

        if (isNaN(cantidad) || cantidad <= 0 || cantidad % 1 != 0)
          return interaction.reply({
            content: `<a:error:1030716002259980318> No has especificado una cantidad válida para apostar`,
            ephemeral: true,
          });
        if (cantidad > data.dinero)
          return interaction.reply({
            content: `<a:error:1030716002259980318> No tienes tanto efectivo para apostar`,
          });
        let posibildades = ["ganar", "perder"];
        let resultado =
          posibildades[Math.floor(Math.random() * posibildades.length)];
        if (resultado === "ganar") {
          await ecoSchema.findOneAndUpdate(
            { userID: interaction.user.id },
            {
              $inc: {
                dinero: +cantidad,
              },
            }
          );
          return interaction.reply({
            embeds: [
              new Discord.EmbedBuilder()
                .setTitle(`:slot_machine: | Mesa de apuestas `)
                .setDescription(
                  `¡Felicidades!, has ganado la apuesta y te ganas \`${cantidad}\` en efectivo`
                )
                .setThumbnail(
                  "https://cdn.discordapp.com/attachments/1027458270589362257/1033186034596454531/20221019_231803.jpg"
                )
                .setTimestamp()
                .setFooter({
                  text: `¡Sistema de Economia de ${client.user.username}!`,
                })
                .setColor("Random"),
            ],
          });
        } else {
          await ecoSchema.findOneAndUpdate(
            { userID: interaction.user.id },
            {
              $inc: {
                dinero: -cantidad,
              },
            }
          );
          return interaction.reply({
            embeds: [
              new Discord.EmbedBuilder()
                .setTitle(`:slot_machine: | Mesa de apuestas `)
                .setDescription(
                  `¡Que triste!, has perdido la apuesta y te restan \`${cantidad}\` en efectivo`
                )
                .setThumbnail(
                  "https://cdn.discordapp.com/attachments/1027458270589362257/1033186034596454531/20221019_231803.jpg"
                )
                .setTimestamp()
                .setFooter({
                  text: `¡Sistema de Economia de ${client.user.username}!`,
                })
                .setColor("Random"),
            ],
          });
        }
      }
        break;
    }
  },
};
