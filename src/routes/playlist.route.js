const router = require('express').Router();
const playlistController = require('../controllers/playlist.controller');

router
  .route('/')
  .get(playlistController.getAll)
  .post(playlistController.create);

router
  .route('/:playlistId')
  .get(playlistController.get)
  .put(playlistController.update)
  .delete(playlistController.remove);

module.exports = router;
