const Discord = require('discord.js');
const { ChatInputCommandInteraction } = require("discord.js");
const chalk = require('chalk');
module.exports = {
    permission: [
        "Administrator"
    ],
    id: "config_error",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {

        const guild = interaction.guild;

        const permisos_bot = guild.members.me.permissions.toArray();
        const permisos_necesarios = [
            "Administrator", 
            "ManageGuild", 
            "ManageChannels", 
            "ManageRoles", 
            "ManageMessages", 
            "ManageWebhooks", 
            "UseExternalEmojis", 
            "BanMembers", 
            "KickMembers", 
            "ModerateMembers", 
            "SendMessages", 
            "EmbedLinks"
        ];
        const permisos_faltantes = permisos_necesarios.filter(permiso => !permisos_bot.includes(permiso));

        const rol_posicion = interaction.guild.members.me.roles.highest.position;
        const rol_posicion_maxima = interaction.guild.roles.highest.position;

        const embed = new Discord.EmbedBuilder()
            .setTitle(`Configuracion Errores Posibles en ${client.user.username}`)
            .setDescription(`Hola ${interaction.user.tag}, aqui te mostrare los errores posibles que puede tener la configuracion del bot obstaculisando un funcionamiento del 100%.`)
            .addFields(
                { name: `\`•\` Rol del Bot`, value: `> ${rol_posicion >= rol_posicion_maxima ? `<a:yes:1028005786112245770> El rol del Bot es el mas alto la configuracion es correcta en el servidor` : `<a:error:1030716002259980318> Se recomienda que el rol del bot sea el mas alto para un exelente funcionamiento.\n\n> Posicion Actual: \`${rol_posicion}\` Posicion Maxima: \`${rol_posicion_maxima}\``}` },
                { name: `\`•\` Permisos del Bot`, value: `> ${permisos_faltantes.length == 0 ? `<a:yes:1028005786112245770> Los permisos del Bot estan completos segun lo recomendado por el creador funcionamiento a 100%` : `<a:error:1030716002259980318> Se recomienda que el bot tenga los siguientes permisos para un funcionamiento a un 100% del programado:\n\n> Permisos Recomendados: ${permisos_necesarios.map(permiso => `\`${permiso}\``).join(", ")}\n\n> Permisos Faltantes: ${permisos_faltantes.map(permiso => `\`${permiso}\``).join(", ")}`}` },
            )
            .setColor("Random")
            .setThumbnail("https://github-readme-streak-stats.herokuapp.com/?user=mikaboshidev&")
            .setTimestamp()
            .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            });

        const support = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Link)
                    .setLabel("Servidor de Soporte")
                    .setURL("https://discord.gg/J9R5VNTr2x")
                    .setEmoji("📄")
            );

        interaction.reply({ embeds: [embed], components: [support], ephemeral: true }).catch((error) => {});

    }
}