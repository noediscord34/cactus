const Discord = require('discord.js');
const { ChatInputCommandInteraction } = require("discord.js");
const chalk = require('chalk');
module.exports = {
    permission: [
        "Administrator"
    ],
    buttons_permisos: [
        "Administrator"
    ],
    id: "config_antiraid",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const e = new Discord.EmbedBuilder()
            .setTitle("Configuracion de AntiRaid")
            .setDescription("Aqui puedes configurar el AntiRaid elije las opciones que necesites segun tu servidor de discord para que no se te haga un caos")
            .addFields(
                { name: `❔ __Como Funciono__`, value: `> Selecciona alguno de los botones para diferentes configuraciones del servidor de manera rapida\n\n> Por Ejemplo: \`Antiraid\` bloqueara todas las entradas de personas y bots al servidor de discord..` },
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setColor("Random")
            .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setTimestamp();
        
        const i = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId("config_antiraid_antiraid")
                    .setLabel("AntiRaid")
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setEmoji("🔒"),
                new Discord.ButtonBuilder()
                    .setCustomId("config_antiraid_antibots")
                    .setLabel("AntBots")
                    .setStyle(Discord.ButtonStyle.Success)
                    .setEmoji("⏱️"),
                new Discord.ButtonBuilder()
                    .setCustomId("config_antiraid_cancelar")
                    .setLabel("Cancelar")
                    .setStyle(Discord.ButtonStyle.Secondary)
                    .setEmoji("❌")
                
            )


        interaction.reply({ 
            embeds: [e], 
            components: [i], 
            ephemeral: true 
        }).catch((error) => {});

        const filter = (i) => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async (i) => {
            if (i.customId === "config_antiraid_cancelar") {
                i.update({ 
                    embeds: [e.setDescription(`<a:error:1030716002259980318> Has cancelado la configuracion del sistema de antiraids que tengas lindo dia te deseamos suerte`)], 
                    components: [], 
                    ephemeral: true 
                }).catch((error) => {});
            }
        })
    }
}