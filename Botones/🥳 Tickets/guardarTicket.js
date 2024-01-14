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
const chalk = require("chalk");
const ticketSchema = require("../../Model/tickets/ticketsSchema");
const userSchema = require("../../Model/tickets/userTicketsSchema");

module.exports = {
    buttons_permisos: [
        "Administrator"
    ],
    id: "guardarTicket",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * 
     * 
     */
    async execute(interaction, client) {
        const { channel, member, guild, customId } = interaction;

        const tksData = await ticketSchema.findOne({
            guildId: guild.id,
        });
        const usrData = await userSchema.findOne({
            guildId: interaction.guild.id,
            ticketId: channel.id,
        });

        const checkChannels = client.channels.cache.get(tksData.logsId);
        if (!checkChannels) return;

        if (!member.roles.cache.find((r) => r.id === tksData.supportId)) {
            return await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("Red")
                        .setTitle("Ticket Guardado con Exito! 📝")
                        .setFooter({
                            text: "My Queen https://discord.gg/4Z7QZ7Y",
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                        })
                        .setDescription([
                            `\`👋\` Miembro: ${member.user.tag}`,
                            `\`📝\` Motivo: No tienes permisos para guardar este ticket.`,
                            `\`📜\` Fecha: ${new Date().toLocaleDateString()}`,
                            `\`📅\` Hora: ${new Date().toLocaleTimeString()}`,
                        ].join("\n")),
                ],
                ephemeral: true,
            }).catch((error) => {});
        }

        const transcript = await createTranscript(channel, {
            limit: -1,
            returnBuffer: false,
            fileName: `Ticket-${member.user.username}.html`,
        });

        await  checkChannels.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Ticket Guardado con Exito! 📝")
                        .setDescription([
                            `\`👋\` Miembro: ${member.user.tag}`,
                            `\`📝\` Ticket: ${channel.name}`,
                            `\`📅\` Fecha: ${new Date().toLocaleDateString()}`,
                            `\`⏰\` Hora: ${new Date().toLocaleTimeString()}`
                        ].join("\n"))
                        .setTimestamp()
                        .setFooter({
                            text: "My Queen https://discord.gg/4Z7QZ7Y",
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                        })
                        .setColor("Blue"),
                ],
                files: [transcript],
                ephemeral: true
            }).catch((error) => {});
        await interaction.reply({
            embeds: [new EmbedBuilder()
                        .setTitle("Ticket Guardado con Exito! 📝")
                        .setDescription([
                            `\`👋\` Miembro: ${member.user.tag}`,
                            `\`📝\` Ticket: ${channel.name}`,
                            `\`📅\` Fecha: ${new Date().toLocaleDateString()}`,
                            `\`⏰\` Hora: ${new Date().toLocaleTimeString()}`
                        ].join("\n"))
                        .setFooter({
                            text: "My Queen https://discord.gg/4Z7QZ7Y",
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                        })
                        .setTimestamp()
            ], 
            files: [transcript],
            ephemeral: true
        }).catch((error) => {});
    }
}