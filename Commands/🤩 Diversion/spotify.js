const canvacord = require("canvacord");
const backgroup = "https://cdn.discordapp.com/attachments/1027458270589362257/1055591517454073876/100-beautiful-full-hd-4k-minecraft-wallpapers-picture-2-scSVR9CG2.jpg";
const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("spotify")
        .setDescription("🤩  Crea una tarjeta al estilo de spotify")
        .addUserOption(option =>
            option
                .setName("usuario")
                .setDescription("Usuario a buscar para realizar la tarjeta")
                .setRequired(true)
        ),
    async execute(interaction, client) {

        const User = interaction.options.getUser("usuario") || interaction.user;

        const card = new canvacord.Spotify()
            .setAuthor(User.username)
            .setAlbum(interaction.guild.name)
            .setStartTimestamp(Date.now() - (1000 * 60 * 60 * 24))
            .setEndTimestamp(Date.now() + (1000 * 60 * 60 * 24))
            .setImage(User.displayAvatarURL({ format: "png", size: 1024 }))
            .setBackground("IMAGE", backgroup)
            .setTitle("🤬 Tarjeta de spotify 🤬");

        card.build().then(buffer => {
            interaction.reply({
                files: [new AttachmentBuilder(buffer, { name: 'rank.png' })],
            }).catch((err) => { })
        });
    }
}