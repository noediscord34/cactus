const Discord = require("discord.js");
const conteo = require("../../Model/conteo/conteoDB");
const { Message, Client } = require("discord.js");
module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Message} message 
     * @param {Client} client 
     *  
     */
    async execute(message, client) {
        let dataco = await conteo.findOne({ guildId: message.guild.id })
        if (!message.guild.members.me.permissions.has("ManageMessages")) return;
        if (!message.guild.members.me.permissions.has("ManageChannels")) return;
        if(!dataco) return;
        if (dataco) {
            if (message.channel.id === dataco.channelId) {
                if (!message.content.includes(dataco.numero)) return message.delete()
                if (message.content.includes(dataco.numero)) {
                    await conteo.findOneAndUpdate({ guildId: message.guild.id }, {
                        $inc: {
                            numero: 1
                        }
                    })
                }
            }
        }
    }
}