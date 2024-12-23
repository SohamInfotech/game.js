const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String

    },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }]
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
