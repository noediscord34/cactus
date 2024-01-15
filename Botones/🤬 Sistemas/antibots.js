const Discord = require('discord.js');
const { ChatInputCommandInteraction } = require("discord.js");
const chalk = require('chalk');
const Schema = require(`${process.cwd()}/Model/servidor/antibots.js`);
module.exports = {
    permission: [
        "Administrator"
    ],
    buttons_permisos: [
        "Administrator"
    ],
    id: "config_antiraid_antibots",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const m = interaction;
        const e = new Discord.EmbedBuilder()
            .setTitle("Sistema Antibots Estado")
            .setDescription(`*Hola buen dia estas apunto de activar un sistema de Anti-Bots que afectara a todo el servidor hasta que sea desactivado*`)
            .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setColor("Random")

        const o = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("antibots")
                    .setLabel("Activar")
                    .setStyle(Discord.ButtonStyle.Primary)
                    .setEmoji("1028005786112245770"),
                new Discord.ButtonBuilder()
                    .setCustomId("antibots_off")
                    .setLabel("Desactivar")
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setEmoji("1030716002259980318")
            )

        interaction.reply({ embeds: [e], components: [o], ephemeral: true }).catch((error) => {});
        const filter = (button) => button.user.id === interaction.user.id;
        const collector =
            interaction.channel.createMessageComponentCollector({
                filter,
                time: 15000,
            });
        collector.on("collect", async (button) => {
            if (button.customId === "antibots") {
                Schema.findOne({ GuildID: interaction.guild.id }, async (err, data) => {
                    if (!data) {
                        data = new Schema({
                            GuildID: interaction.guild.id,
                        })
                        data.save();
                        button.update({ embeds: [e.setDescription(`*Sistema Anti-Bots Activado de forma correcta en el servidor*`)], components: [], ephemeral: true }).catch((error) => {});
                    } else {
                        button.update({ embeds: [e.setDescription(`<a:error:1030716002259980318> *El sistema ya se encontraba desactivado de forma correcta*`)], components: [], ephemeral: true }).catch((error) => {});
                    }
                })
            }
            if (button.customId === "antibots_off") {
                const data = Schema.findOne({ GuildID: interaction.guild.id });
                    if (!data) {
                        button.update({ embeds: [e.setDescription(`<a:error:1030716002259980318> El Sistema de Anti-Bots ya estaba desactivado`)], components: [], ephemeral: true }).catch((error) => {});
                    };
                    await Schema.findOneAndDelete
                        button.update({ embeds: [e.setDescription(`<a:yes:1028005786112245770> El Sistema de Anti-Bots se desactivo correctamente.`)], components: [], ephemeral: true }).catch((error) => {});
                    }
            })
        }
    };
