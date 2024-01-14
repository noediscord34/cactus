const Discord = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const os = require("os");
const versiones = require('../../package.json');
const chalk = require("chalk");
module.exports = {
    botpermisos: [
        "SendMessages", 
        "EmbedLinks",
        "AttachFiles",
      ],
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("🌍 ve la informacion del bot de discord"),
    async execute(interaction, client, message) {

        /* ----------[CPU Usage]---------- */
        const cpus = os.cpus();
        const cpu = cpus[0];

        // Accumulate every CPU times values
        const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);

        // Calculate the CPU usage
        const usage = process.cpuUsage();
        const currentCPUUsage = (usage.user + usage.system) * 1000;
        const perc = (currentCPUUsage / total) * 100;

        /* ----------[RAM Usage]---------- */

        /**Get the process memory usage (in MB) */
        async function getMemoryUsage() {
            return process.memoryUsage().heapUsed / (1024 * 1024).toFixed(2);
        }

        const startUsage = process.cpuUsage();
        const now = Date.now();
        while (Date.now() - now < 500);
        let userUsage = process.cpuUsage(startUsage).user / 1000;
        let sysUsage = process.cpuUsage(startUsage).system / 1000 || 0;
        const totalGuilds = client.guilds.cache.size;
        const totalMembers = client.users.cache.size;
        const totalChannel = client.channels.cache.size;
        const e = new Discord.EmbedBuilder()
            .setAuthor({ name: client.user.tag + " Information", iconURL: client.user.displayAvatarURL() })
            .setDescription(`\`\`\`yml\nName: ${client.user.tag} [${client.user.id}]\nApi Latency: ${Math.round(client.ws.ping)}ms\nSystems: ${sysUsage}\nUser Usage: ${userUsage} MB\`\`\``)
            .setFooter({ text: "Cualquier duda en mi servidor de soporte es atendida con todo gusto por nosotros", iconURL: client.user.displayAvatarURL() })
            .setColor("Random")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: "🤖 Comandos", value: `\`\`\`yml\nServidores: ${totalGuilds}\nUsuarios: ${totalMembers}\nCanales: ${totalChannel}\`\`\``, inline: true },
                { name: `<a:Dashbord:1005732715112443974> Bot - Estadisticas`, value: `\`\`\`yml\nNode.js: ${process.version}\nDiscord.js: v${versiones.version}\nEnmap: v5.8.4\`\`\``, inline: true },
                { name: `<a:config:1026467696453357658> Sistema - Estadisticas`, value: `\`\`\`yml\nOS: ${process.platform}\nCpu: ${(perc / 1000).toFixed(1)}%\nRam: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(1)}%\nUptime: ${convertTime()}\`\`\`` },
                { name: `<:topggAngry:1026468391709577226> Desarrollador`, value: `\`\`\`yml\nName: yuiaaoxd_01417\nID: [1170033501165342775]\`\`\``},
                { name: `<:panda_gift:1007529203119439882> Probador - Co-Owner`, value: `\`\`\`yml\nName: zul3_ \nID: [1054130488102637570]\`\`\``},
                { name: `<a:InLove:1006999906969469019> Links Importantes`, value: `[**・Invitacion del Bot**](https://discord.com/api/oauth2/authorize?client_id=1170181516878430269&permissions=0&scope=bot) [**・ Invitacion a Soporte**](https://discord.gg/TES8WpSx8T) [**・ Pagina Web Oficial**](https://studiodeveloper.online/)` }
            );
        interaction.reply({ embeds: [e] }).catch((error) =>
        console.log(chalk.cyanBright(`[Slash]`) + `Acaba de ocurrir un error grave en el Slash [Bot Info] en el servidor [${interaction.guild.id}] el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`));

        function convertTime() {
            var uptime = process.uptime();
            console.log('Tiempo de Proceso:', uptime);
            const date = new Date(uptime * 1000);
            const days = date.getUTCDate() - 1,
                hours = date.getUTCHours(),
                minutes = date.getUTCMinutes(),
                seconds = date.getUTCSeconds();

            let time = [];

            if (days > 0) time.push(days + ' day' + (days == 1 ? '' : 's'));
            if (hours > 0) time.push(hours + ' h' + (hours == 1 ? '' : 's'));
            if (minutes > 0) time.push(minutes + ' mn' + (minutes == 1 ? '' : 's'));
            if (seconds > 0) time.push(seconds + ' s'); // + (seconds == 1 ? '' : 's'));
            const dateString = time.join(', ');
            console.log('Fecha del Registro: ' + dateString);
            return dateString;
        }
    },
};