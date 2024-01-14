const {
  Client,
  ActivityType,
  EmbedBuilder,
  WebhookClient,
  ButtonStyle,
  ButtonBuilder,
} = require(`discord.js`);

const { database } = require("../../config.json");
const DB = require("../../Model/client/clientDB");
const ee = require("../../Settings/channels.json");
const webhook = new WebhookClient({ url: "https://discord.com/api/webhooks/1195039510728290344/7Y1wHs8UoVgO4YresJ7lMKem7DYNIHDR7sdtWUFQelWOyqoaqGEfU11aTeOYklxfa-fg" });

const ms = require("ms");
const os = require("os");
const chalk = require("chalk");
const mongoose = require("mongoose");

const { ChannelType } = require("discord.js");
const moment = require('moment');
const osu = require('node-os-utils');
const Discord = require('discord.js');
const fs = require("fs");
require('moment-duration-format')

const cpus = os.cpus();
const cpu = cpus[0];

const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);

const usage = process.cpuUsage();
const currentCPUUsage = (usage.user + usage.system) * 1000;
const perc = (currentCPUUsage / total) * 100;

async function getMemoryUsage() {
  return process.memoryUsage().heapUsed / (1024 * 1024).toFixed(2);
}

const startUsage = process.cpuUsage();
const now = Date.now();
while (Date.now() - now < 500);
let userUsage = process.cpuUsage(startUsage).user / 1000;
let sysUsage = process.cpuUsage(startUsage).system / 1000 || 0;

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param { Client } client
   */



  

  
  execute(client) {
    const initialStatus = setTimeout(() => {
      client.user.setPresence({
        activities: [
          {
            name: `Iniciando construccion de datos en la DB`,
            type: ActivityType.Playing,
          },
        ],
        status: "idle",
      });
    });

    const statusArray = [
      `Uso Ram: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)}%`,
      `Shard #0 ${client.guilds.cache.size} servidores activos`,
      `${client.guilds.cache.size} Servidores en Discord`,
      `${String(new Date).split(" ", 5).join(" ")}`,
      `Shard #0 ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} usuarios en discord`,
      `Trabajando en Nuestra Comonidad`,
      `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Usuarios en Discord`,
      `${client.channels.cache.size} Canales en Discord`,
      `Shard #0 ${client.channels.cache.size} canales activos`,
    ];


    client.on('messageCreate', (message) => {
      console.log(chalk.green(`Received message: ${message.content}`));
    });

    let index = 0;
    const randTime = Math.floor(Math.random() * 5) + 1;

    setTimeout(() => {
      setInterval(() => {
        if (index === statusArray.length) index = 0;
        const status = statusArray[index];

        client.user.setPresence({
          activities: [{ name: status, type: ActivityType.Listening }],
          status: "idle",
        });
        index++;
      }, 6 * 1000);
    }, randTime);

    if (!database) return;
    mongoose.set("strictQuery", false);
    mongoose
      .connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(chalk.green(`[DB]`) + ` Conectado a la DB con Exito Dia de Registro ${String(new Date).split(" ", 5).join(" ")}`);
        const archivo = fs.writeFile(`./Registros/Fechas/Encendido-${client.user.id}.log`, `[ Encendido-${new Date().toLocaleDateString()} ] Hola acabo de ser iniciada con el dia de registro: ${String(new Date).split(" ", 5).join(" ")} este mensaje se actualiza cada que se inicia el bot\n\nName: ${client.user.tag} [${client.user.id}]\nApi Latency: ${Math.round(client.ws.ping)}ms\nSystems: ${sysUsage}\nUser Usage: ${userUsage} MB\n\nMiembros - Actuales: ${client.users.cache.size}\nUsuarios - Actuales: ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\nBots - Actuales: ${client.guilds.cache.reduce((a, b) => a + b.members.cache.filter(member => member.user.bot).size, 0)}\nCanales - Texto: ${client.channels.cache.filter(ch => ch.type === ChannelType.GuildText).size}\nCanales - Voz: ${client.channels.cache.filter(ch => ch.type === ChannelType.GuildVoice).size}`, function (err) {
            if (err) return console.log(err);
  client.channels.cache.get("1194762715214913537").send({
              content: `Se creo el archivo de registro revisa el archivo \`Encendido-${client.user.id}.log\` para mas informacion\n\nFecha de Encendido: ${String(new Date).split(" ", 5).join(" ")}\nHora de Encendido: ${new Date().toLocaleTimeString()}\nName: ${client.user.tag} [${client.user.id}]\nUsuarios - Actuales: ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`
            })
        });

        /* Mandamos el Archivo a los creadores */
        webhook.send({
          embeds: [
            new EmbedBuilder()
              .setTitle(`Fecha de Encendido: ${String(new Date).split(" ", 5).join(" ")}`)
              .setDescription(`Hola acabo de ser iniciada con el dia de registro: \`${String(new Date).split(" ", 5).join(" ")}\` este mensaje se actualiza cada que se inicia el bot`)
              .setThumbnail(client.user.avatarURL())
              .setColor("Random")
              .setFooter({ text: `© ${client.user.username} | ${new Date().getFullYear()}`, iconURL: client.user.avatarURL() })
              .addFields(
                {
                  name: `Datos del Bot de Discord`, 
                  value: `\`\`\`yml\nName: ${client.user.tag} [${client.user.id}]\nApi Latency: ${Math.round(client.ws.ping)}ms\nSystems: ${sysUsage}\nUser Usage: ${userUsage} MB\nMiembros - Actuales: ${client.users.cache.size}\nUsuarios - Actuales: ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}\nBots - Actuales: ${client.guilds.cache.reduce((a, b) => a + b.members.cache.filter(member => member.user.bot).size, 0)}\nCanales - Texto: ${client.channels.cache.filter(ch => ch.type === ChannelType.GuildText).size}\nCanales - Voz: ${client.channels.cache.filter(ch => ch.type === ChannelType.GuildVoice).size}\`\`\``
                },
              )
            ]
        })
      });

    let memArray = [];

    setInterval(async () => {
      memArray.push(await getMemoryUsage());

      if (memArray.length >= 14) {
        memArray.shift();
      }

      await DB.findOneAndUpdate(
        { 
          Client: true 
        },
        { 
          Memory: memArray 
        },
        { 
          upsert: true 
        }
      );
    }, ms("30s"));
  },
};
