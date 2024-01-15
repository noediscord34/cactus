async function loadEvents(client) {
    const { loadFiles } = require(`../Functions/fileLoader.js`);
    const ascii = require(`ascii-table`);
    const chalk = require("chalk");
    const table = new ascii("Event List").setHeading(`Event ID`, `Load status`);

    await client.events.clear();

    const Files = await loadFiles(`Events`);
    Files.forEach((file) => {
        const event = require(file);

        const execute = (...args) => event.execute(...args, client);
        client.events.set(event.name, execute);

        if (event.rest) {
            if (event.once) client.rest.once(event.name, execute);
            else
                client.rest.on(event.name, execute);
        } else {
            if (event.once) client.once(event.name, execute);
            else
                client.on(event.name, execute);
        }

        table.addRow(event.name, `🟩 Success`);
    })

    return console.log(table.toString(), `\n${chalk.red(`✅ Events loaded successfully!`)}`);
}

module.exports = { loadEvents };