// commands/invites.js
const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invites')
        .setDescription('Muestra las invitaciones del servidor'),
    async execute(interaction) {
        const guild = interaction.guild;
        const invites = await guild.invites.fetch();

        const inviteList = invites.map(invite => {
            return `**Invitación:** ${invite.code}, **Usos:** ${invite.uses}`;
        });

        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Invitaciones del Servidor')
            .setDescription(inviteList.join('\n') || 'No hay invitaciones disponibles.');

        await interaction.reply({ embeds: [embed] });
    },
};
