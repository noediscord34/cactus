const Discord = require("discord.js");
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const { readdirSync } = require('fs');
const { embedPages } = require("../../Handlers/Paginas");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ayuda")
        .setDescription("🌍 Muestra la lista de comandos y sus categorias"),
    async execute(client, interaction) {

        let dias = Math.floor(client.uptime / 86400000)
        let horas = Math.floor(client.uptime / 3600000) % 24
        let minutos = Math.floor(client.uptime / 60000) % 60
        let segundos = Math.floor(client.uptime / 1000) % 60

        const a = readdirSync(`./Commands/🌍 Publicos`).filter(archivo => archivo.endsWith('.js'));
        const b = readdirSync(`./Commands/🎉 Setups`).filter(archivo => archivo.endsWith('.js'));
        const c = readdirSync(`./Commands/🎮 Gamings`).filter(archivo => archivo.endsWith('.js'));
        const d = readdirSync(`./Commands/🎯 Menus`).filter(archivo => archivo.endsWith('.js'));
        const e = readdirSync(`./Commands/🏫 Herramientas`).filter(archivo => archivo.endsWith('.js'));
        const f = readdirSync(`./Commands/👑 Developer`).filter(archivo => archivo.endsWith('.js'));
        const g = readdirSync(`./Commands/🔰 Administracion`).filter(archivo => archivo.endsWith('.js'));
        const h = readdirSync(`./Commands/🤩 Diversion`).filter(archivo => archivo.endsWith('.js'));
        const y = readdirSync(`./Commands/🤬 Creadores`).filter(archivo => archivo.endsWith('.js'));
        const z = readdirSync(`./Plugins`).filter(archivo => archivo.endsWith('.js'));

        const embeds = [
            new EmbedBuilder()
                .setAuthor({
                    name: "Lista de Comandos del Servidor!",
                   
                })
                .setDescription(`Hola soy **${client.user ? client.user.username : 'Nombre de usuario no disponible'}** Un bot de Utilidades Multiples.`)
                .addFields(
                    {
                        name: `<:discord:1026467991409401886> __Como Funciono ?__`,
                        value: `> \`1.\` Para hacer **control** de todas mis funciones usa \`/admin panel\`\n> \`2.\` Poseo un sistema de **ranking** que se actualiza cada semana\n> \`3.\` Modero sistemas de manera automatica.\n> \`4.\` Se crean registros de actividad cada **2 dias** del bot`,
                    },
                    {
                        name: `<:livre:1026467985973592124> __Que se Registra ?__`,
                        value: `> \`1.\` Usuarios sancionados como spaming en el servidor\n> \`2.\` Entrada de usuarios malisiosos y actividades del servidor\n> \`3.\` Manejo de tickets y reportes de usuarios\n> \`4.\` Registro de usuarios que se unen al servidor mas de 2 veces`,
                    },
                    {
                        name: `<:Pepefino:1010774486209019914> __Soporte de Servidores ?__`,
                        value: `> \`1.\` Si tienes alguna duda o problema con el bot puedes usar \`/reporte\`\n> \`2.\` Puedes abrir un ticket para una mejor atencion del problema\n> \`3.\` Recuerda que todo usuario blacklisteado se le sube a el globalban.`,
                    },
                    {
                        name: `<:VS_froom:1026467689209806858> __Datos Actuales ?__`,
                        value: `> ⚙️ **${client.commands} Comandos**\n> \`${dias} dias\`, \`${horas} horas\`, \`${minutos} minutos\`, \`${segundos} segundos\` de **actividad**\n> 👥 en **${client.guilds} Servidores**\n> ✨ con Una Buena Latencia** de ping\n> 📊 con **${z} Plugins Activos**`,
                    }
                )
                .setFooter({
                    text: `En dessarollo`,
                  
                })
              
                .setTimestamp()
                .setColor('Blue'),

            new EmbedBuilder()
                .setAuthor({
                    name: `🌍 Lista de Publicos`,
                })
                .setDescription(a.length >= 1 ? `>>> *${a.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Todavía no hay comandos en esta categoría...*`)
                .setFooter({
                    text: `Solicitado por el usuario`,
                   
                })
                
                .setTimestamp()
                .setColor('Blue'),

            new EmbedBuilder()
                .setAuthor({
                    name: `🎉 Lista de Setups`,
                  
                })
                .setDescription(b.length >= 1 ? `>>> *${b.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Todavía no hay comandos en esta categoría...*`)
                .setFooter({
                    text: `Solicitado por el usuario`,

                  
                })
               
                .setTimestamp()
                .setColor('Blue'),

            new EmbedBuilder()
                .setAuthor({
                    name: `🏫 Lista de Gaming`,
                    
                })
                .setDescription(c.length >= 1 ? `>>> *${c.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Todavía no hay comandos en esta categoría...*`)
                .setFooter({
                    text: `Solicitado por el usuario`,
                    iconURL: interaction.user.avatarURL()
                })
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setColor('Blue'),

            new EmbedBuilder()
                .setAuthor({
                    name: `👑  Lista de Menus`,
                  
                })
                .setDescription(d.length >= 1 ? `>>> *${d.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Todavía no hay comandos en esta categoría...*`)
                .setFooter({
                    text: `Solicitado por el usuario`,
                  
                })
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setColor('Blue'),

            new EmbedBuilder()
                .setAuthor({
                    name: `🔥 Lista de Herramientas`,
                   
                })
                .setDescription(e.length >= 1 ? `>>> *${e.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Todavía no hay comandos en esta categoría...*`)
                .setFooter({
                    text: `Solicitado por el usuario`,
                    
                })
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setColor('Blue'),

            new EmbedBuilder()
                .setAuthor({
                    name: `🤩 Lista de Developer`,
                  
                })
                .setDescription(f.length >= 1 ? `>>> *${f.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Todavía no hay comandos en esta categoría...*`)
                .setFooter({
                    text: `Solicitado por ${interaction.user.username}`,
                    
                })
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setColor('Blue'),

            new EmbedBuilder()
                .setAuthor({
                    name: `🤬 Lista de Administracion`,
                    
                })
                .setDescription(g.length >= 1 ? `>>> *${g.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Todavía no hay comandos en esta categoría...*`)
                .setFooter({
                    text: `Creado por Noe`,
                    
                })
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setColor('Blue'),

            new EmbedBuilder()
                .setAuthor({
                    name: `🪁 Lista de Diversion`,
                    iconURL: client.user.avatarURL()
                })
                .setDescription(h.length >= 1 ? `>>> *${h.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Todavía no hay comandos en esta categoría...*`)
                .setFooter({
                    text: `Solicitado por ${interaction.user.username}`,
                    iconURL: interaction.user.avatarURL()
                })
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setColor('Blue'),

            new EmbedBuilder()
                .setAuthor({
                    name: `🤬 Lista de Creadores`,
                  
                })
                .setDescription(y.length >= 1 ? `>>> *${y.map(comando => `\`${comando.replace(/.js/, "")}\``).join(" - ")}*` : `>>> *Todavía no hay comandos en esta categoría...*`)
                .setFooter({
                    text: `Solicitado por ${interaction.user.username}`,
                    iconURL: interaction.user.avatarURL()
                })
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setColor('Blue'),

            new EmbedBuilder()
                .setAuthor({
                    name: `🤬 Lista de Componentes de Bot`,
                    
                })
                .setDescription([
                    `Hola estos son los datos del **Bot** ${client.user.username}`,
                    `\`•\` Botones(\`${client.buttons}\`)`,
                    `\`•\` Modales(\`${client.modals}\`)`,
                    `\`•\` Menus(\`${client.selectMenus}\`)`,
                    `\`•\` Eventos(\`${client.events}\`)\n`,
                    `Cuento con grandes sistemas de moderacion y addons activos actualmente espero serte de ayuda en tu servidor`
                ].join("\n"))
                .setFooter({
                    text: `Solicitado por ${interaction.user.username}`,
                    iconURL: interaction.user.avatarURL()
                })
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setColor('Blue'),
        ];

        await embedPages(interaction, embeds);
    }
}