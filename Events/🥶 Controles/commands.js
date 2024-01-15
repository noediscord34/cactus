const { loadCommands } = require("../../Handlers/Commands");
module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    console.log(`The Client is now ready to use ${client.user.tag}`);
    loadCommands(client);
  },
};
