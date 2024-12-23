const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    default: 0
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game'
  }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
