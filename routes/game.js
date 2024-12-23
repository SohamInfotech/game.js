const express = require('express');
const router = express.Router();
const gameController = require('../controller/game');

router.post('/createGame', gameController.createGame);
router.get('/getAllGames', gameController.getAllGames);
router.get('/getAllGames', gameController.getAllGames);
router.delete('/gamedelete/:id', gameController.gamedelete);
router.get('/gameupdete/:id', gameController.gameupdete);

module.exports = router;
