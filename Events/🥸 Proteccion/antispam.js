const { Client, Message, EmbedBuilder } = require("discord.js");
const ms = require("ms");
const DB = require("../../Model/antispam/antispamDB");
const map = new Map();
require("colors");
const chalk = require("chalk");
module.exports = {
  name: "messageCreate",
  /**
   *
   * @param {Message} message
   * @param {Client} client
   */
  async execute(message, client) {
    const { author, guild, channel, member } = message;

    if (
      !guild ||
      author.bot ||
      guild.ownerId === author.id ||
      member.permissions.has(["Administrator", "ManageGuild"])
    )
      return;

    let datoscanal = await DB.findOne({ ServidorID: guild.id }).catch(
      (error) => {}
    );

    if (!datoscanal || !datoscanal.Canales.length) return;

    if (datoscanal.Canales.some((c) => c.CanalID === channel.id)) {
      if (map.has(author.id)) {
        const datos = map.get(author.id);
        const { lastmsg, timer } = datos;
        const dif = message.createdTimestamp - lastmsg.createdTimestamp;
        let mensajes = datos.mensajes;
        const mensajeserver = datoscanal.MensajeServer;
        const mensajeuser = datoscanal.MensajeUser;
        const imagen = datoscanal.Imagen;
        const tiempo = datoscanal.Tiempo;
        const canal = guild.channels.cache.get(datoscanal.CanalID);

        if (dif > 2000) {
          clearTimeout(timer);
          datos.mensajes = 1;
          datos.lastmsg = message;

          datos.timer = setTimeout(async () => {
            await map.delete(author.id);
          }, ms(tiempo));
        } else {
          const razon = `\`Spam!\``;

          ++mensajes;

          if (parseInt(mensajes) === 5) {
            const usuario = guild.members.cache.get(author.id);

            usuario.timeout(ms(tiempo), razon).catch((error) => {
              if (error) {
                return console.log(error);
              }
            });

            if (canal) {
              await usuario
                .send({
                  embeds: [
                    new EmbedBuilder()
                      .setColor("Random")
                      .setTitle(`Sistema Antispam de ${guild.name}`)
                      .setThumbnail(`${usuario.displayAvatarURL()}`)
                      .setDescription(
                        `${mensajeuser}`
                          .replace("{user}", usuario)
                          .replace("{razon}", razon)
                          .split("+n+")
                          .join("\n")
                      )
                      .setImage(`${imagen}`)
                      .setTimestamp()
                      .setFooter({
                        text: `Enviado del servidor ${guild.name}`,
                        iconURL: `${guild.iconURL()}`,
                      }),
                  ],
                })
                .catch((error) => { });	

              canal
                .send({
                  embeds: [
                    new EmbedBuilder()
                      .setColor("Random")
                      .setTitle(`Sistema Antispam de ${guild.name}`)
                      .setThumbnail(`${usuario.displayAvatarURL()}`)
                      .setDescription(
                        `${mensajeserver}`
                          .replace("{user}", usuario)
                          .replace("{razon}", razon)
                          .split("+n+")
                          .join("\n")
                      )
                      //.setImage(`https://i.imgur.com/2yILwhL.png`)
                      .setTimestamp()
                      .setFooter({
                        text: `Automoderador de ${guild.name}`,
                        iconURL: `${guild.iconURL()}`,
                      }),
                  ],
                })
                .catch((error) => { });

              if (usuario) {
                setTimeout(async () => {
                  await channel.messages.fetch({ limit: 100 });

                  message.channel.bulkDelete(mensajes, true).then((mensaje) => {
                    return console.log(chalk.redBright(`[Sistema]`) + ` He borrado ${mensaje.size} mensajes de ${usuario.user.tag} por spam! el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`);
                  });
                }, ms("10s"));
              }
            } else {
              await usuario
                .send({
                  embeds: [
                    new EmbedBuilder()
                      .setColor("Random")
                      .setTitle(`Sistema Antispam de ${guild.name}`)
                      .setThumbnail(`${usuario.displayAvatarURL()}`)
                      .setDescription(
                        `${mensajeuser}`
                          .replace("{user}", usuario)
                          .replace("{razon}", razon)
                          .split("+n+")
                          .join("\n")
                      )
                      .setImage(`${imagen}`)
                      .setTimestamp()
                      .setFooter({
                        text: `Enviado del servidor ${guild.name}`,
                        iconURL: `${guild.iconURL()}`,
                      }),
                  ],
                })
                .catch((error) => { })
              message
                .reply({
                  embeds: [
                    new EmbedBuilder()
                      .setColor("Random")
                      .setTitle(`Sistema Antispam de ${guild.name}`)
                      .setThumbnail(`${usuario.displayAvatarURL()}`)
                      .setDescription(
                        `${mensajeserver}`
                          .replace("{user}", usuario)
                          .replace("{razon}", razon)
                          .split("+n+")
                          .join("\n")
                      )
                      //.setImage(`https://i.imgur.com/2yILwhL.png`)
                      .setTimestamp()
                      .setFooter({
                        text: `Automoderador de ${guild.name}`,
                        iconURL: `${guild.iconURL()}`,
                      }),
                  ],
                })
                .catch((error) => { })

              if (usuario) {
                setTimeout(async () => {
                  await channel.messages.fetch({ limit: 100 });

                  message.channel.bulkDelete(mensajes, true).then((mensaje) => {
                    return console.log(chalk.redBright(`[Sistema]`) + ` He borrado ${mensaje.size} mensajes de ${usuario.user.tag} por spam! el dia ${new Date().toLocaleDateString()} a las ${new Date().toLocaleTimeString()}`);
                  });
                }, ms("10s"));
              }
            }
          } else {
            datos.mensajes = mensajes;
            map.set(author.id, datos);
          }
        }
      } else {
        let remover = setTimeout(async () => {
          await map.delete(author.id);
        }, ms("5s"));

        map.set(author.id, {
          mensajes: 1,
          lastmsg: message,
          timer: remover,
        });
      }
    } else return;
  },
};
