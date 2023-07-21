const router = require('express').Router();
const playlistRoute = require('./playlist.route');
const songRoute = require('./song.route');

router.use('/songs', songRoute);
router.use('/playlists', playlistRoute);

module.exports = router;
