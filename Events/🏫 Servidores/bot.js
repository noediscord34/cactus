const { EmbedBuilder, WebhookClient } = require("discord.js");
const webhook = new WebhookClient({
  url: "https://discord.com/api/webhooks/1187920223781802076/U2uOu7abuJRK8aSwH0xNjbcQ22cftkhhqHmwWbodDju_mGihx7Ex_CmKJq2ISywRhTxk", //Pega la URL del Webhook
});

module.exports = {
  name: "guildCreate",

  async execute(guild, client) {

    const Owner = await client.users.fetch(guild.ownerId);

    const embed = new EmbedBuilder()
      .setTitle(`**ACABO DE ENTRAR DE UN SERVIDOR**`)
      .setColor(`Green`)
      .setTimestamp()
      .setDescription(`
      > <emoji> | **Nombre del servidor:** | • ${guild.name}
      > <emoji> | **ID:** | • ${guild.id}
      > <emoji> | **Dueño/a:** | • <@${Owner.id}> \`(${Owner.tag} - ${guild.ownerId})\`
      > <emoji> | **Miembros** | • ${guild.memberCount}

      \`¡Ahora estoy en ${client.guilds.cache.size} Servidores!\``);

    webhook.send({ embeds: [embed] });
    console.log(`Nuevo servidor detectado: ${guild.name} - ${guild.id}`);
  },
};
///////////////////////////////////
//// Developer: TheLoxasWar.dev ///
///////////////////////////////////