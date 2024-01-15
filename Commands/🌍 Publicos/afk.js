const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const afkSchema = require(`${process.cwd()}/Model/afk`)
module.exports = {
    data: new SlashCommandBuilder()
    .setName('afk')
    .setDescription('Cambia a estado **AFK** en el servidor')
    .addSubcommand(command => command.setName('set').setDescription('Establecer estado AFK').addStringOption(option => option.setName('motivo').setDescription('Mensaje al estar en AFK').setRequired(true)))
    .addSubcommand(command => command.setName('remove').setDescription('Salir del estado AFK')),
    async execute (interaction) {

        const { options } = interaction;
        const sub = options.getSubcommand();

        const Data = await afkSchema.findOne({ Guild: interaction.guild.id, User: interaction.id});

        switch (sub) {
            case 'set':

            if (Data) return await interaction.reply({content: `Ya estas en estado **AFK** en el servidor.`, ephemeral: true});
            else {
                const message = options.getString('motivo');
                const nickname = interaction.member.nickname || interaction.user.username;
                await afkSchema.create({
                    Guild: interaction.guild.id,
                    User: interaction.user.id,
                    Message: message,
                    Nickname: nickname
                })

                const name = `[AFK] ${nickname}`;
                await interaction.member.setNickname(`${name}`).catch(err => {
                    return;
                })

                const embed = new EmbedBuilder()
                .setColor("#3d0924")
                .setDescription(`
**✅•Ahora estas en estado AFK dentro del servidor**
**💬•Envia un mensaje o usa /afk para eliminar tu AFK**`)

                await interaction.reply({ embeds: [embed]});
            }

            break;

            case 'remove':

            if (!Data) return await interaction.reply({ content: `Ya **No** estas en estado **AFK** dentro del **servidor**`, ephemeral: true});
            else {
                const nick = Data.Nickname;
                await afkSchema.deleteMany({ Guild: interaction.guild.id, User: interaction.user.id});

                await interaction.member.setNickname(`${nick}`).catch(err => {
                    return;
                })

                const embed = new EmbedBuilder()
                .setColor("#3d0924")
                .setDescription(`**✅•Tu estado AFK dentro del servidor ha sido removido**`)

                await interaction.reply({ embeds: [embed], ephemeral: true });
            }
        }
    }
}