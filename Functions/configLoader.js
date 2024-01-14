const configDatabase = require("../Model/servidor/memberLogs");
const chalk = require("chalk");
async function loadConfig(client) {
    (await configDatabase.find()).forEach((doc) => {
        client.guildConfig.set(doc.Guild, {
            logChannel: doc.logChannel,
            memberRole: doc.memberRole,
            botRole: doc.botRole,
        });
    });

    return console.log(chalk.magenta("[x] ::") + " Cargada funcion de memberlogs en los servidores de discord en la base de datos")
}

module.exports = { loadConfig }