const { inspect } = require("util");
const Discord = require("discord.js");
const { EmbedBuilder, WebhookClient } = require("discord.js");
const ee = require("../../Settings/channels.json");
const webhook = new WebhookClient({ url: ee["webhooks"]["salidas"] });
const warnSchema = require("../../Model/warns/warnSchema");

const modSchema = require("../../Model/warns/modSchema");
const reseñas = require("../../Model/servidor/reseñas");
const roleSchema = require("../../Model/verificacion/verificationSchema");
const conteo = require("../../Model/conteo/conteoDB");
const Schema = require(`../../Model/servidor/antiraid`);

const Schemas = require(`../../Model/servidor/antialts.js`);
const DB = require("../../Model/antispam/antispamDB");
const mongodb = require("../../Model/bienvenidas/joinsDB");
const mongodbs = require("../../Model/bienvenidas/leaveDB");

const loggerSchema = require("../../Model/servidor/logs");
const ticketSchema = require("../../Model/tickets/ticketsSchema");
const userSchema = require("../../Model/tickets/userTicketsSchema");

const prefix = require("../../Model/economia/servidor");
const setups = require("../../Model/economia/setups");
const DBS = require("../../Model/economia/cookies");
const chalk = require("chalk");

module.exports = {
  name: "guildDelete",
  async execute(guild, client) {

    const w = await prefix.findOne({ guildID: guild.id });
    if (w) return await prefix.findOneAndDelete({ guildID: guild.id });

    const y = await setups.findOne({ guildID: guild.id });
    if (y) return await setups.findOneAndDelete({ guildID: guild.id });
    
    const a = await conteo.findOne({ guildId: guild.id });
    if (a) return await conteo.findOneAndDelete({ guildId: guild.id });

    const b = await reseñas.findOne({ guildID: guild.id });
    if (b) return await reseñas.findOneAndDelete({ guildID: guild.id });

    const c = await roleSchema.findOne({ guildId: guild.id });
    if (c) return await roleSchema.findOneAndDelete({ guildId: guild.id });

    const d = await modSchema.findOne({ guildId: guild.id });
    if (d) return await modSchema.findOneAndDelete({ guildId: guild.id });

    const e = await warnSchema.findOne({ guildId: guild.id });
    if (e) return await warnSchema.findOneAndDelete({ guildId: guild.id });

    const f = await Schema.findOne({ GuildID: guild.id });
    if (f) return await Schema.findOneAndDelete({ GuildID: guild.id });

    const h = await Schemas.findOne({ GuildID: guild.id });
    if (h) return await Schemas.findOneAndDelete({ GuildID: guild.id });

    const i = await DB.findOne({ ServidorID: guild.id });
    if (i) return await DB.findOneAndDelete({ ServidorID: guild.id });

    const j = await mongodb.findOne({ ServidorID: guild.id });
    if (j) return await mongodb.findOneAndDelete({ ServidorID: guild.id });

    const k = await mongodbs.findOne({ ServidorID: guild.id });
    if (k) return await mongodbs.findOneAndDelete({ ServidorID: guild.id });

    const l = await loggerSchema.findOne({ guildID: guild.id });
    if (l) return await loggerSchema.findOneAndDelete({ guildID: guild.id });

    const m = await ticketSchema.findOne({ guildId: guild.id });
    if (m) return await ticketSchema.findOneAndDelete({ guildId: guild.id });

    const n = await userSchema.findOne({ guildId: guild.id });
    if (n) return await userSchema.findOneAndDelete({ guildId: guild.id });

    const o = await DBS.findOne({ GuildID: guild.id });
    if (o) return await DBS.findOneAndDelete({ GuildID: guild.id });

    const array = [a, b, c, d, e, f, h, i, j, k, l, m, n, w, y, o];
    const borrados = array.filter((x) => x !== null);
    if (borrados.length === 0) return;
    if (borrados.length !== 0) return;

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setFooter({ 
        text: `Registro Privado de Servidores de Discord`, 
        iconURL: client.user.avatarURL() 
      })
      .setThumbnail(guild.iconURL({ dynamic: true }) || client.user.avatarURL())
      .setDescription([
        `<a:error:1030716002259980318>┊ **Acabo de Abandonar un Servidor**`,
        `\`👋\`**Nombre:** ${guild.name}`,
        `\`👑\`**Fundador/a:** ${guild.ownerId}`,
        `\`🍃\`**Tag:** <@${guild.ownerId}>`,
        `\`🔰\`**ID:** ${guild.id}`,
        `\`🎉\`**Miembros:** ${guild.memberCount}`,
        `\`📁\`**Schemas:** ${borrados.length}`,
      ].join("\n"))
      .setTimestamp();

    webhook.send({ 
      embeds: [embed]
    }).catch(() => {});
  },
};
