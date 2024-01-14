const { Client, GatewayIntentBits, Partials, Collection, Options, Events, EmbedBuilder, ActionRowBuilder, ButtonBuilder  } = require(`discord.js`);
const { Guilds, GuildMembers, GuildMessages, GuildMessageReactions, GuildVoiceStates, GuildEmojisAndStickers, GuildPresences, GuildInvites } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember, Reaction, Channel } = Partials;

const { DiscordTogether } = require("discord-together");
const config = require(`./config.json`);
const Enmap = require("enmap");
const chalk = require("chalk");
const Discord = require("discord.js");
const fs = require("fs");
require("colors")

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('¡Hola, mundo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});




const client = new Client({
  sweepers: {
    ...Options.DefaultSweeperSettings,
    messages: {
      interval: 3600,
      lifetime: 1800,
    }
  },
  makeCache: Options.cacheWithLimits({
    ...Options.DefaultMakeCacheSettings,
    ReactionManager: 0,
    ThreadManager: 0,
    }),
  fetchAllMembers: false,
  restTimeOffset: 0,
  failIfNotExists: false,
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: false,
  },
  intents: [ Guilds, GuildMembers, GuildMessages, GuildMessageReactions, GuildVoiceStates, GuildEmojisAndStickers, GuildPresences, GuildInvites ],
  partials: [ User, Message, GuildMember, ThreadMember, Reaction, Channel ],
});

const { loadEvents } = require(`./Handlers/Events`);
const { loadModals } = require("./Handlers/Modals");
const { loadSelectMenus } = require("./Handlers/SelectMenu");
const { loadButtons } = require("./Handlers/Buttons");
const { loadConfig } = require("./Functions/configLoader");
const { embedPages } = require("./Handlers/Paginas");
const afkSchema = require(`${process.cwd()}/Model/afk`)

client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.selectMenus = new Collection();
client.events = new Collection();

client.la = {}
var langs = fs.readdirSync("./Languages")
for (const lang of langs.filter(file => file.endsWith(".json"))) {
  client.la[`${lang.split(".json").join("")}`] = require(`./Languages/${lang}`)
}
Object.freeze(client.la)

loadButtons(client);
loadModals(client);
loadSelectMenus(client);
loadEvents(client);
loadConfig(client);

function requirePlugins() {
  [ "anticrash", "sorteos" ].forEach(plugins => {
    try { require(`./Plugins/${plugins}`)(client); } catch (e) { console.log(e.stack ? String(e.stack).grey : String(e).grey) }
  });
  [ "joinvc", "loaddb" ].forEach(plugins => {
    try { require(`./Plugins/${plugins}`)(client); } catch (e) { console.log(e.stack ? String(e.stack).grey : String(e).grey) }
  });
} requirePlugins();

client.cookiescooldowns = new Collection();
client.discordTogether = new DiscordTogether(client);
client.guildConfig = new Collection();

const keepAlive = require('./server');
keepAlive();

client.color = config.color;
client.login(config.token);

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  const check = await afkSchema.findOne({ Guild: message.guild.id, User: message.author.id});
  if (check) {
    const nick = check.Nickname;
    await afkSchema.deleteMany({ Guild: message.guild.id, User: message.author.id});

    await message.member.setNickname(`${nick}`).catch(err => {
      return;
    })

    const m1 = await message.reply({ content: `Bienvenido de nuevo, **${message.author}**! Has **removido** tu **AFK**`, ephemeral: true });
    setTimeout(() => {
        m1.delete();
    }, 4000);
  } else {

    const members = message.mentions.users.first();
    if (!members) return;
    const Data = await afkSchema.findOne({ Guild: message.guild.id, User: members.id});
    if (!Data) return;

    const member = message.guild.members.cache.get(members.id);
    const msg = Data.Message || 'Ninguna razón dada';

    if (message.content.includes(members)) {
      const m = await message.reply({ content: `👤•Este miembro **${member.user.tag}** esta actualmente en estado **AFK**, No lo menciones en este momento | **Motivo:** ${msg}`});
      setTimeout(() => {
        m.delete();
        message.delete();
    }, 4000);
    }
  }
})


// En tu archivo principal (index.js o donde manejes los eventos)
client.on('guildMemberAdd', async member => {
    // Canal de bienvenida (ajusta el ID del canal según tu servidor)
    const welcomeChannel = member.guild.channels.cache.get('1194762673716477962');
    const reglasChannel = member.guild.channels.cache.get('1194762673716477962');

    if (!welcomeChannel || !reglasChannel) return; // Verificar si los canales existen

    const welcomeEmbed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle(`¡Bienvenido ${member.user.tag} a nuestro servidor! 🎉`)
    .setDescription('¡Gracias por unirte a nosotros! Esperamos que disfrutes tu tiempo aquí.')
    .setThumbnail(member.user.displayAvatarURL())
      .addFields(
        { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Inline field title', value: 'Some value here', inline: true },
        { name: 'Inline field title', value: 'Some value here', inline: true },
      )
    .setTimestamp();

    // Botones opcionales (puedes personalizar esto según tus necesidades)
    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setLabel('Reglas')
                .setCustomId('reglas_button')
                .setStyle('Primary'),
        );

    // Enviar el mensaje de bienvenida al canal con los botones opcionales
    await welcomeChannel.send({ embeds: [welcomeEmbed], components: [row] });
});

// Manejar el evento cuando se hace clic en el botón de reglas
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'reglas_button') {
        // Canal donde se mostrarán las reglas (ajusta el ID del canal según tu servidor)
        const reglasChannel = interaction.guild.channels.cache.get('1194762673716477962');

        if (!reglasChannel) return; // Verificar si el canal existe

        // Mensaje de reglas en forma de Embed
        const reglasEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Reglas del Servidor')
            .setDescription('Aquí están las reglas de nuestro servidor:')
            .addFields(
              { name: 'Regular field title', value: 'Some value here' },
              { name: '\u200B', value: '\u200B' },
              { name: 'Inline field title', value: 'Some value here', inline: true },
              { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            // Agregar más reglas según sea necesario
            .setTimestamp();


        // Enviar el mensaje de reglas al canal
        await reglasChannel.send({ embeds: [reglasEmbed] });

        // Después de manejar el evento del botón, puedes borrar la interacción original si es necesario
        await interaction.reply({ content: 'Reglas enviadas con éxito.', ephemeral: true });
    }
});





client.login(config.token);
