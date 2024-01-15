// Definir un Schema de Mongoose para datos financieros de usuarios
const { Schema, model } = require('mongoose');

const economySchema = new Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  transactions: [String], // Por ejemplo, podrías almacenar IDs de transacciones aquí
  bonuses: { lastClaimed: Date, streak: Number }, // Podrías almacenar detalles de bonificaciones aquí
  // Otros campos de datos financieros
});

const Economy = model('Economy', economySchema);

// En tu comando /balance
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Revisar tu saldo'),
  async execute(interaction, client) {
    const userId = interaction.user.id;
    const userEconomy = await Economy.findOne({ userId });
    if (userEconomy) {
      interaction.reply(`Tu saldo actual es: ${userEconomy.balance}`);
    } else {
      interaction.reply('Aún no tienes datos financieros registrados.');
    }
  },
};
