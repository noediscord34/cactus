const {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
    ChannelType,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    TextInputBuilder,
    TextInputStyle,
    ModalBuilder
} = require("discord.js");
const chalk = require("chalk");
module.exports = {
    buttons_permisos: [
        "Administrator"
    ],
    id: "createTicket",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * 
     */
    async execute(interaction, client) {

        const motivo = new TextInputBuilder()
            .setCustomId("Razon-Ticket")
            .setLabel("Menciona la razon del Ticket")
            .setPlaceholder("Ingresa la razon del ticket a solicitar")
            .setMaxLength(250)
            .setMinLength(5)
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph);

        const agregado = new ActionRowBuilder()
        .addComponents( motivo );

        const modal = new ModalBuilder()
            .setCustomId("Crear-Ticket")
            .setTitle("Sistema de Tickets (Crear Ticket)")
            .addComponents(agregado);

        await interaction.showModal(modal).catch((err) => {})
    }
}