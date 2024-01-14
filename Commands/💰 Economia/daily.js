// Definir un Schema de Mongoose para datos financieros de usuarios
const { Schema, model } = require('mongoose');

const daylySchema = new Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
  bonuses: {
    lastClaimed: { type: Date, default: 0 }
  },
  // Otros campos relacionados con la economía
});

const daily = model('daily', daylySchema);

// ...
// En tu comando /daily

const { SlashCommandBuilder } = require('@discordjs/builders');
const claimedCooldowns = new Map();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription('Reclamar tu bonificación diaria'),
  async execute(interaction) {
    const userId = interaction.user.id;

    if (claimedCooldowns.has(userId)) {
      const lastClaimed = claimedCooldowns.get(userId);
      const now = Date.now();
      const cooldown = 24 * 60 * 60 * 1000; // Ejemplo: cooldown diario de 24 horas en milisegundos

      if (now - lastClaimed < cooldown) {
        const timeLeft = (cooldown - (now - lastClaimed)) / (1000 * 60 * 60);
        interaction.reply(`Espera ${timeLeft.toFixed(1)} horas antes de reclamar tu bonificación nuevamente.`);
        return;
      }
    }

    const userEconomy = await daily.findOne({ userId });

    if (userEconomy) {
      if (userEconomy.bonuses.lastClaimed.getDate() !== new Date().getDate()) {
        userEconomy.balance += 100; // Ejemplo: Reclamar bonificación diaria de 100 monedas
        userEconomy.bonuses.lastClaimed = new Date();
        claimedCooldowns.set(userId, Date.now());
        await userEconomy.save();
        interaction.reply('¡Bonificación diaria reclamada con éxito! Se ha depositado en tu cuenta.');
      } else {
        interaction.reply('Ya has reclamado tu bonificación diaria hoy.');
      }
    } else {
      interaction.reply('Aún no tienes datos financieros registrados.');
    }
  },
};
