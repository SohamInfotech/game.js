const Game = require('../model/game');
const Player = require('../model/players');

// Create a new game
exports.createGame = async (req, res) => {
  try {
    const { name, genre } = req.body;
    const game = new Game({ name, genre });
    await game.save();
    res.status(201).json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all games
exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find().populate('players');
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a game by ID
exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate('players');
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




exports.gamedelete = async (req, res) => {
    const Id = req.params.id;
    try {
        const deletdata = await Game.findByIdAndDelete(Id);

        res.status(200).json({
            status: "success",
            message: 'Data deleted successfully',
            data: deletdata
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
            data: []
        });
    }
};

exports.gameupdete = async (req, res) => {
    const Id = req.params.id;
    try {
        const updetedata = await Game.findByIdAndUpdate(Id, req.body)
        res.status(200).json({
            status: "success",
            Message: 'data updete succes',
            Data: updetedata
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            Message: "not updete",
            data: []
        })

    }
}
