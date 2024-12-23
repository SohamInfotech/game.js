const Player = require('../model/players');
const Game = require('../model/game');

// Create a new player
exports.createPlayer = async (req, res) => {
  try {
    const { name, gameId } = req.body;
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    const player = new Player({ name, game: gameId });
    await player.save();
    
    // Add the player to the game's players array and save
    game.players.push(player);
    await game.save();

    res.status(201).json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get all players in a game
exports.getPlayersInGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.gameId).populate('players');
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(game.players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.gamedelete = async (req, res) => {
  const Id = req.params.id;
  try {
      const game = await Game.findById(Id);
      if (!game) {
          return res.status(404).json({ message: 'Game not found' });
      }

      // Optionally, delete players associated with the game
      await Player.deleteMany({ game: Id });

      const deletdata = await Game.findByIdAndDelete(Id);
      res.status(200).json({
          status: "success",
          message: 'Game and associated players deleted successfully',
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
      const updetedata = await Game.findByIdAndUpdate(Id, req.body, { new: true });
      res.status(200).json({
          status: "success",
          Message: 'data updated successfully',
          Data: updetedata
      });
  } catch (error) {
      res.status(404).json({
          status: "fail",
          Message: "Game not updated",
          data: []
      });
  }
};

