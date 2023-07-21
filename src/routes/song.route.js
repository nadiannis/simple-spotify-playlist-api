const router = require('express').Router();
const songController = require('../controllers/song.controller');

router.get('/most-played-songs', songController.getSongsByMostPlayed);

router.route('/').get(songController.getAll).post(songController.create);

router.route('/:songId').get(songController.get).put(songController.update);

module.exports = router;
