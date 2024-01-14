const AntiRaid = require(`${process.cwd()}/Model/servidor/antiraid.js`);
const { EmbedBuilder, GuildMember, Client } = require('discord.js');
const chalk = require("chalk");
module.exports = {
    name: 'guildMemberAdd',
    /**
     * 
     * @param {GuildMember} member 
     * @param {Client} client 
     */
    async execute(member, client) {
        AntiRaid.findOne({ GuildID: member.guild.id }, async (err, data) => {
            const Razon = 'El Sistema Anti-Raid esta en modo Activado.';
            const ANTI = new EmbedBuilder()
                .setTitle('🚫 Anti-Raid Activado')
                .setColor('Red')
                .setTimestamp()
                .setFooter({
                    text: "My Queen https://discord.gg/4Z7QZ7Y",
                    iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                })
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`*Has sido expulsado de **${member.guild.name}**\nRazon: **${Razon}***`);
                
            if (!data) return;
            if (!member.guild.members.me.permissions.has("ModerateMembers")) return;
            if (!member.guild.members.me.permissions.has("BanMembers")) return;
            if (data) {
                try {
                    member.send({ embeds: [ANTI], }).catch((error) => { })
                } catch (e) {
                    throw e;
                }
                member.kick(Razon).catch((error) => { })
            }
        })
    }
}

module.exports = {
    name: 'guildMemberAdd',
    /**
    * 
    * @param {GuildMember} member 
    * @param {Client} client 
    */
    async execute(member, client) {
        const AntiBots = require(`${process.cwd()}/Model/servidor/antibots.js`);

        AntiBots.findOne({ GuildID: member.guild.id }, async (err, data) => {
            const Razon = 'El Sistema Anti-Bots esta en modo Activado.';
            if (!data) return;
            if (!member.guild.members.me.permissions.has("ModerateMembers")) return;
            if (!member.guild.members.me.permissions.has("BanMembers")) return;
            if (!member.user.bot) return;
            if (data) {
                member.kick(Razon).catch((error) => { })
            }
        })
    }
}