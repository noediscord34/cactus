const { Schema, model } = require('mongoose');

let setup = new Schema({
    GuildID: String,
    Option: String,
    Channel: String,
    Days: String,
});

module.exports = model('Setups-AntiLinks-Guilds', setup);