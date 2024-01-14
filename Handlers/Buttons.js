async function loadButtons(client) {
  const { loadFiles } = require("../Functions/fileLoader");
  const ascii = require("ascii-table");
  const chalk = require("chalk");
  const table = new ascii("Buttons List");

  const Files = await loadFiles("Botones");

  Files.forEach((file) => {
    const button = require(file);
    if (!button.id) return;

    client.buttons.set(button.id, button);
    table.setHeading(`Button ID`, `Status`);
    table.addRow(`${button.id}`, "🟩 Success");
  });

  return console.log(table.toString(), `\n${chalk.red(`✅ Buttons loaded successfully!`)}`);
}

module.exports = { loadButtons };