const router = require('express').Router();
const songRoute = require('./song.route');
const playlistRoute = require('./playlist.route');

router.use('/songs', songRoute);
router.use('/playlists', playlistRoute);

module.exports = router;
