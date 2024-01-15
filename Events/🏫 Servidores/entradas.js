const { EmbedBuilder, ChannelType, GuildMember, Client } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
module.exports = {
    name: "guildMemberAdd",
    /**
     * 
     * @param {GuildMember} member 
     * @param {Client} client 
     * 
     */
    async execute(member, client) {
        const guildConfig = client.guildConfig.get(member.guild.id);
        if (!guildConfig) return;

        const guildRoles = member.guild.roles.cache;
        let assignedRole = member.user.bot ? guildRoles.get(guildConfig.botRole) : guildRoles.get(guildConfig.memberRole);
        if (!assignedRole) assignedRole = "No configurado por el Staff.";
        else await member.roles.add(assignedRole)
            .catch(() => { assignedRole = "No tengo permisos para asignar el rol." });

        const logChannel = (await member.guild.channels.fetch()).get(guildConfig.logChannel);
        if (!logChannel) return;

        if (!member.guild.members.me.permissions.has("ModerateMembers")) return;
        if (!member.guild.members.me.permissions.has("ManageRoles")) return;
        if (!member.guild.members.me.permissions.has("SendMessages")) return;

        let color = "Random"
        let rizk = "Fairly Safe"

        const accountCreation = parseInt(member.user.createdTimestamp / 1000);
        const joinTime = parseInt(member.joinedAt / 1000);
        const monthAgo = moment().subtract(2, "months").unix();
        const weekAgo = moment().subtract(2, "weeks").unix();
        const daysAgo = moment().subtract(2, "days").unix();

        if (accountCreation >= monthAgo) {
            color = "Red"
            rizk = "Medium"
        }

        if (accountCreation >= weekAgo) {
            color = "Orange"
            rizk = "Medium"
        }

        if (accountCreation >= daysAgo) {
            color = "Yellow"
            rizk = "Extreme"
        }

        const embed = new Discord.EmbedBuilder()
            .setColor(color)
            .setAuthor({ name: `${member.user.tag} | ${member.id}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setDescription([
                `\`•\` User: ${member.user}`,
                `\`•\` Account Type: ${member.user.bot ? "Bot" : "User"}`,
                `\`•\` Role Assigned: ${assignedRole}`,
                `\`•\` Account Created: <t:${accountCreation}:D> | <t:${accountCreation}:R>`,
                `\`•\` Account Joined: <t:${joinTime}:D> | <t:${joinTime}:R>`,
            ].join("\n"))
            .setFooter({ text: `Logging Members` })
            .setTimestamp();

        if (rizk == "Extreme" || rizk == "High") {
                return logChannel.send({ embeds: [embed] });
        } else return logChannel.send({ embeds: [embed] });
    }
}

