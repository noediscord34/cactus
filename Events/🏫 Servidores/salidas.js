const { EmbedBuilder, GuildMember, Client } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
module.exports = {
    name: "guildMemberRemove",
    /**
     * 
     * @param {GuildMember} member 
     * @param {Client} client 
     * 
     */
    async execute(member, client) {
        const guildConfig = client.guildConfig.get(member.guild.id);
        if (!guildConfig) return;

        const logChannel = (await member.guild.channels.fetch()).get(guildConfig.logChannel);
        if (!logChannel) return;

        if (!member.guild.members.me.permissions.has("ModerateMembers")) return;
        if (!member.guild.members.me.permissions.has("ManageRoles")) return;
        if (!member.guild.members.me.permissions.has("ViewAuditLogs")) return;
        
        const accountCreation = parseInt(member.user.createdTimestamp / 1000);

        const embed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: `${member.user.tag} | ${member.id}`, iconURL: member.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
            .setDescription([
                `\`•\` User: ${member.user}`,
                `\`•\` Accout Type: ${member.user.bot ? "Bot" : "User"}`,
                `\`•\` Accout Created: <t:${accountCreation}:D> | <t:${accountCreation}:R>`,
            ].join("\n"))
            .setTimestamp()
            .setFooter({ text: `User left the server` });

        logChannel.send({ embeds: [embed] }).catch((error) => { })
    }
}