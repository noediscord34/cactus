const Alt = require(`${process.cwd()}/Model/servidor/antialts.js`);
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
        Alt.findOne({ GuildID: member.guild.id }, async (err, data) => {
            if (!data) return;

            if (!member.guild.members.me.permissions.has("ModerateMembers")) return;
            if (!member.guild.members.me.permissions.has("BanMembers")) return;

            const days = data.Days;
            const option = data.Option;

            const channel = member.guild.channels.cache.get(data.Channel);
            const timeSpan = ms(`${days} Dias`);
            const createdAt = new Date(member.user.createdAt).getTime();
            const difference = Date.now() - createdAt;
            
            if (difference < timeSpan) {
                member.send('Multi Cuenta Detectada.').catch((error) => {});
                if (option.toLowerCase() == 'kick') {
                    const id = member.id;
                    await member.kick();
                    if (!channel) return;
                    const K = new EmbedBuilder()
                        .setTitle('Anti-Alts')
                        .setColor('Red')
                        .setThumbnail(member.user.avatarURL({ dynamic: true }))
                        .setFooter({
                            text: "My Queen https://discord.gg/4Z7QZ7Y",
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                        })
                        .setTimestamp()
                        .setDescription(`El Miembro <@${id}>, ha sido expulsado por multi cuenta detectada.\nCuenta creada El: ${createdAt}`);
                    channel.send({ embeds: [K] });
                } else if (option.toLowerCase() === 'ban') {
                    const id = member.id;
                    await member.ban();
                    if (!channel) return;
                    const B = new EmbedBuilder()
                        .setTitle('Anti-Alts')
                        .setColor('Red')
                        .setTimestamp()
                        .setFooter({
                            text: "My Queen https://discord.gg/4Z7QZ7Y",
                            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                        })
                        .setThumbnail(member.user.avatarURL({ dynamic: true }))
                        .setDescription(`El Miembro <@${id}>, ha sido baneado por multi cuenta detectada.\nCuenta creada el: ${createdAt}`);
                    channel.send({ embeds: [B] })
                } else {
                    if (!channel) return;
                    channel.send({
                        embeds:
                            [
                                new EmbedBuilder()
                                    .setTitle('Anti-Alts')
                                    .setThumbnail(member.user.avatarURL({ dynamic: true }))
                                    .setDescription(`Nueva multi cuenta detectada.\nCuenta creada el: ${createdAt}`)
                                    .setColor('Red')
                                    .setFooter({
                                        text: "My Queen https://discord.gg/4Z7QZ7Y",
                                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                                    })
                                    .setTimestamp()
                            ]
                    })
                }
            }
        })
    }
}