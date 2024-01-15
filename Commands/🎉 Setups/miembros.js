const Discord = require("discord.js");
const { SlashCommandBuilder, ChannelType, EmbedBuilder, ChatInputCommandInteraction } = require("discord.js");
const database = require("../../Model/servidor/memberLogs");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("memberlog")
        .setDescription("🎉 Establezca el canal de registro de miembros los inicios de sesión de miembros de configuración")
        .addSubcommand((subcommand) =>
            subcommand
                .setName("eliminar")
                .setDescription("🎉 Eliminar el canal de registro de miembros los inicios de sesión de miembros de configuración")
            )
        .addSubcommand((subcommand) => 
            subcommand
                .setName("configurar")
                .setDescription("🎉 Establezca el canal de registro de miembros los inicios de sesión de miembros de configuración")
                .addChannelOption((option) =>
                    option
                        .setName("channel")
                        .setDescription("El canal para establecer el sistema de registro de miembros.")
                        .setRequired(true)
                        .addChannelTypes(ChannelType.GuildText)
                    )
                .addRoleOption((option) =>
                    option
                        .setName("role")
                        .setDescription("Se agregó el rol para configurar el sistema de registro de miembros.")
                        .setRequired(true)
                    )
                .addRoleOption((option) =>
                    option
                        .setName("botrole")
                        .setDescription("Se agregó el rol para configurar el sistema de registro de miembros.")
                        .setRequired(true)
                    )
                ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const { guild, options } = interaction;
        const subcommand = options.getSubcommand();
        switch (subcommand) {
            case "eliminar": {
                const data = await database.findOne({ Guild: guild.id });
                if (!data) return interaction.reply({ 
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setColor("Red")
                            .setTitle("Setup de MembersLogs! 🔴")
                            .setDescription([
                                `\`•\` Estado: Error de Configuracion.`,
                                `\`•\` Razon: No hay datos para eliminar.`
                                `\`•\` Fecha: ${new Date().toLocaleString()}`
                                `\`•\` Hora: ${new Date().toLocaleTimeString()}`
                            ].join("\n"))
                    ],
                    ephemeral: true 
                });
                await database.findOneAndDelete({ Guild: guild.id });
            }
            break;
            case "configurar": {
                const logChannel = options.getChannel("channel").id;
                let memberRole = options.getRole("role") ? options.getRole("role").id : null;
                let botRole = options.getRole("botrole") ? options.getRole("botrole").id : null;

                const guildConfigObject = {
                    logChannel: logChannel,
                    memberRole: memberRole,
                    botRole: botRole,
                }
                await database.findOneAndUpdate(
                    { Guild: guild.id },
                    {
                        logChannel: logChannel,
                        memberRole: memberRole,
                        botRole: botRole,
                    },
                    { new: true, upsert: true }
                );

                client.guildConfig.set(guild.id, {
                    logChannel: logChannel,
                    memberRole: memberRole,
                    botRole: botRole,
                });

                const embed = new Discord.EmbedBuilder()
                    .setColor("Green")
                    .setDescription([
                        `\`•\` Loggin Channel Update: <#${logChannel}>`,
                        `\`•\` Member Auto-Role Update: ${memberRole ? `<@&${memberRole}>` : "No Especificado."}`,
                        `\`•\` Bot Auto-Role Update: ${botRole ? `<@&${botRole}>` : "No Especificado."}`
                    ].join("\n"));

                return interaction.reply({ embeds: [embed] });
            }
        }
    }
}