const Discord = require('discord.js');
const { ChatInputCommandInteraction } = require("discord.js");
const chalk = require('chalk');

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
const Schematig = require(`${process.cwd()}/Model/servidor/antibots.js`);

const ticketSchema = require("../../Model/tickets/ticketsSchema");
const userSchema = require("../../Model/tickets/userTicketsSchema");
const niveles = require("../../Model/level/user");

module.exports = {
    permission: [
        "Administrator"
    ],
    buttons_permisos: [
        "Administrator"
    ],
    id: "config_schemas_delete",
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     */
    async execute(interaction, client) {
        const a = await conteo.findOne({ guildId: interaction.guild.id });
        if (a) {
            await conteo.findOneAndDelete({ guildId: interaction.guild.id });
        }

        const b = await reseñas.findOne({ guildID: interaction.guild.id });
        if (b) {
            await reseñas.findOneAndDelete({ guildID: interaction.guild.id });
        }

        const c = await roleSchema.findOne({ guildId: interaction.guild.id });
        if (c) {
            await roleSchema.findOneAndDelete({ guildId: interaction.guild.id });
        }

        const d = await modSchema.findOne({ guildId: interaction.guild.id });
        if (d) {
            await modSchema.findOneAndDelete({ guildId: interaction.guild.id });
        }

        const e = await warnSchema.findOne({ guildId: interaction.guild.id });
        if (e) {
            await warnSchema.findOneAndDelete({ guildId: interaction.guild.id });
        }

        const f = await Schema.findOne({ GuildID: interaction.guild.id });
        if (f) {
            await Schema.findOneAndDelete({ GuildID: interaction.guild.id });
        }

        const h = await Schemas.findOne({ GuildID: interaction.guild.id });
        if (h) {
            await Schemas.findOneAndDelete({ GuildID: interaction.guild.id });
        }

        const i = await DB.findOne({ ServidorID: interaction.guild.id });
        if (i) {
            await DB.findOneAndDelete({ ServidorID: interaction.guild.id });
        }

        const j = await mongodb.findOne({ ServidorID: interaction.guild.id });
        if (j) {
            await mongodb.findOneAndDelete({ ServidorID: interaction.guild.id });
        }

        const k = await mongodbs.findOne({ ServidorID: interaction.guild.id });
        if (k) {
            await mongodbs.findOneAndDelete({ ServidorID: interaction.guild.id });
        }

        const l = await loggerSchema.findOne({ guildID: interaction.guild.id });
        if (l) {
            await loggerSchema.findOneAndDelete({ guildID: interaction.guild.id });
        }

        const m = await Schematig.findOne({ GuildID: interaction.guild.id });
        if (m) {
            await Schematig.findOneAndDelete({ GuildID: interaction.guild.id });
        }

        const ñ = await ticketSchema.findOne({ guildId: interaction.guild.id });
        if (m) {
            await ticketSchema.findOneAndDelete({ guildId: interaction.guild.id });
        }

        const n = await userSchema.findOne({ guildId: interaction.guild.id });
        if (n) {
            await userSchema.findOneAndDelete({ guildId: interaction.guild.id });
        }

        const o = await niveles.findOne({ guildID: interaction.guild.id });
        if (o) {
            await niveles.findOneAndDelete({ guildID: interaction.guild.id });
        }

        const array = [a, b, c, d, e, f, h, i, j, k, ñ, n, o];
        const borrados = array.filter((x) => x !== null);

        if (borrados.length === 0) {
            return interaction.reply({
                content: `<a:error:1030716002259980318> No hay datos que borrar en el servidor actualmente`,
                ephemeral: true
            })
        }

        const check_complete = new Discord.EmbedBuilder()
            .setColor("Green")
            .setTitle(`✅ Datos Borrados`)
            .setDescription(`Se han borrado ${borrados.length} schemas de la base de datos del bot muchas gracias por su preferencia lindo dia`)
            .addFields(
                { name: `❔ __Como Funciono__`, value: `> Selecciona algunos de los menus que se encuentran en el panel para reactivar los sistemas\n\n> Por Ejemplo: \`check\` para ver que sistemas tienes activados en el servidor actualmente` },
            )
            .setTimestamp()
            .setFooter({
                text: "My Queen https://discord.gg/4Z7QZ7Y",
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            });

        interaction.reply({ embeds: [check_complete], ephemeral: true });

    }
}