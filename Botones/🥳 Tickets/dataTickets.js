const Discord = require('discord.js');
const { ChatInputCommandInteraction} = require("discord.js");
module.exports = {
    id: "DatosTicket",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        interaction.reply({
            embeds: [
                new Discord.EmbedBuilder()
                    .setTitle("Datos del Ticket a Continuacion! ⌛")
                    .setDescription([
                        `\`⭐\` ID del Ticket: ${interaction.channel.id}`,
                        `\`⌛\` Fecha de Creacion: ${new Date(interaction.channel.createdAt).toLocaleDateString()}`,
                        `\`🔥\` Hora de Creacion: ${new Date(interaction.channel.createdAt).toLocaleTimeString()}`,
                        `\`👤\` Creado por: ${interaction.channel.name.split("-")[2]}`,
                        `\`👥\` Miembros: ${interaction.channel.members.size}`
                    ].join("\n"))
                    .setColor("Random")
                    .setTimestamp()
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                    .setFooter({
                        text: "My Queen https://discord.gg/4Z7QZ7Y",
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
            ], components: [
                new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setLabel("Url del Ticket")
                            .setStyle(Discord.ButtonStyle.Link)
                            .setURL(`https://discord.com/channels/${interaction.guild.id}/${interaction.channel.id}`)
                    )
            ], ephemeral: true
        })
    }
}