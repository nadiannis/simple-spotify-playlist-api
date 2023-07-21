const router = require('express').Router();
const playlistController = require('../controllers/playlist.controller');
const playlistSongController = require('../controllers/playlist-song.controller');

router
  .route('/')
  .get(playlistController.getAll)
  .post(playlistController.create);

router
  .route('/:playlistId')
  .get(playlistController.get)
  .put(playlistController.update)
  .delete(playlistController.remove);

router
  .route('/:playlistId/songs')
  .get(playlistSongController.getAllSongs)
  .post(playlistSongController.addSong);

router.delete('/:playlistId/songs/:songId', playlistSongController.removeSong);

router.get('/:playlistId/songs/:songId/play', playlistSongController.playSong);

module.exports = router;
