const { ChatInputCommandInteraction, EmbedBuilder } = require(`discord.js`);
const sintaxis = require("../../Settings/mensajes.json");
const guildBLK = require("../../Model/blacklist/serverBlacklist");
const userBLK = require("../../Model/blacklist/userBlacklist");
const { Collection } = require("mongoose");
const serverSchema = require(`${process.cwd()}/Model/economia/servidor.js`);
const { asegurar_todo } = require(`${process.cwd()}/Tools/funciones.js`);
const config = require(`${process.cwd()}/config.json`);
module.exports = {
        name: "interactionCreate",
        /**
         * @param {ChatInputCommandInteraction} interaction 
         */
        async execute(interaction, client) {
                if (!interaction.isChatInputCommand()) return;
                if (!interaction.guild || !interaction.channel) return;
                await asegurar_todo(interaction.guild.id, interaction.user.id);

                const command = client.commands.get(interaction.commandName);

                if (!command)
                        return interaction.reply({
                                embeds: [new EmbedBuilder()
                                        .setTitle(sintaxis["interaction"]["titles"]["title1"])
                                        .setDescription(sintaxis["interaction"]["interaction1"])
                                        .setTimestamp()
                                        .setFooter({ text: sintaxis["footer"] })
                                        .setColor(`Red`)
                                ], ephemeral: true
                        });

                const isUserBlacklisted = await userBLK.findOne({ userid: interaction.user.id });
                const isGuildBlacklisted = await guildBLK.findOne({ guildid: interaction.guild.id });

                if (isUserBlacklisted) {
                        const blacklisted = new EmbedBuilder()
                                .setColor("Blurple")
                                .setTitle(sintaxis["blacklist"]["user"]["title"])
                                .setFooter({ text: sintaxis["blacklist"]["user"]["footer"] })
                                .setDescription(sintaxis["blacklist"]["user"]["description"])
                                .addFields(
                                        { name: "Reason", value: sintaxis["blacklist"]["user"]["reason"] },
                                        { name: "Time", value: sintaxis["blacklist"]["user"]["tiempo"] });
                        return interaction.reply({ embeds: [blacklisted], ephemeral: true });
                }

                if (isGuildBlacklisted) {
                        const Guildblacklisted = new EmbedBuilder()
                                .setColor("Blurple")
                                .setTitle(sintaxis["blacklist"]["server"]["title"])
                                .setDescription(sintaxis["blacklist"]["server"]["description"])
                                .setFooter({ text: sintaxis["blacklist"]["server"]["footer"] })
                                .addFields(
                                        { name: "Reason", value: sintaxis["blacklist"]["server"]["reason"] },
                                        { name: "Time", value: sintaxis["blacklist"]["server"]["tiempo"] });
                        return interaction.reply({ embeds: [Guildblacklisted], ephemeral: true });
                }

                if (command.creador && interaction.user.id !== "679560282929889331")
                        return interaction.reply({
                                embeds: [new EmbedBuilder()
                                        .setTitle(sintaxis["interaction"]["titles"]["title9"])
                                        .setDescription(sintaxis["interaction"]["interaction9"])
                                        .setTimestamp()
                                        .setFooter({ text: sintaxis["footer"] })
                                        .setColor(`Red`)
                                ], ephemeral: true
                        });

                if (command.nsfw && !interaction.channel.nsfw)
                        return interaction.reply({
                                embeds: [new EmbedBuilder()
                                        .setTitle(sintaxis["interaction"]["titles"]["title8"])
                                        .setDescription(sintaxis["interaction"]["interaction8"])
                                        .setTimestamp()
                                        .setFooter({ text: sintaxis["footer"] })
                                        .setColor(`Red`)
                                ], ephemeral: true
                        });

                if (command)
                        if (command.developer) {
                                if (!config.ownerIDS.includes(interaction.user.id))
                                        return interaction.reply({
                                                embeds: [new EmbedBuilder()
                                                        .setTitle(sintaxis["interaction"]["titles"]["title2"])
                                                        .setDescription(sintaxis["interaction"]["interaction2"])
                                                        .setTimestamp()
                                                        .setFooter({ text: sintaxis["footer"] })
                                                        .setColor(`Red`)
                                                ], ephemeral: true
                                        })
                        };

                if (command.botpermisos) {
                        if (!interaction.guild.members.me.permissions.has(command.botpermisos))
                                return interaction.reply({
                                        embeds: [new EmbedBuilder()
                                                .setTitle(sintaxis["interaction"]["titles"]["title5"])
                                                .setDescription(sintaxis["interaction"]["interaction5"])
                                                .setFields({
                                                        name: `Permisos Faltantes`,
                                                        value: `${command.botpermisos.map(permiso => `\`${permiso}\``).join(", ")}`
                                                })
                                                .setTimestamp()
                                                .setFooter({ text: sintaxis["footer"] })
                                                .setColor(`Red`)
                                        ], ephemeral: true
                                })
                };

                if (command.permisos) {
                        if (!interaction.member.permissions.has(command.permisos))
                                return interaction.reply({
                                        embeds: [new EmbedBuilder()
                                                .setTitle(sintaxis["interaction"]["titles"]["title6"])
                                                .setTimestamp()
                                                .setDescription(sintaxis["interaction"]["interaction6"])
                                                .setFields({
                                                        name: `Permisos Faltantes`,
                                                        value: `${command.permisos.map(permiso => `\`${permiso}\``).join(", ")}`
                                                })
                                                .setColor("Red")
                                                .setFooter({ text: sintaxis["footer"] })
                                        ], ephemeral: true
                                })
                };


                command.execute(interaction, client);
        }
}