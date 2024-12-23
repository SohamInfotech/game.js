const express = require('express');
const router = express.Router();
const playerController = require('../controller/players');

router.post('/players', playerController.createPlayer);
router.get('/games/:gameId/players', playerController.getPlayersInGame);

module.exports = router;
