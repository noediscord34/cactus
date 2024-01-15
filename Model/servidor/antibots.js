const { Schema, model } = require('mongoose');

let Setup = new Schema({
    GuildID: String,
});

module.exports = model('Setups-AntiBots-Guilds', Setup);