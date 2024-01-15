const Enmap = require("enmap");
const Discord = require("discord.js");
module.exports = async (client) => {

    let dateNow = Date.now();
    console.log(`${String("[x] :: ".magenta)}Ahora cargando la base de datos...`.brightGreen);

    client.applys = new Enmap({
        name: "applys",
        dataDir: "./social_logs/applys",
    });

    client.automods = new Enmap({
        name: "automods",
        dataDir: "./social_logs/automods",
    });

    client.autoanime = new Enmap({
        name: "autoanime",
        dataDir: "./social_logs/autoanime",
    });

    console.log(`[x] :: `.magenta + `Cargando la Base de Datos después: `.brightGreen + `${Date.now() - dateNow}ms`.green)
}