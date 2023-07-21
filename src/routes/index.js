const router = require('express').Router();
const songRoute = require('./song.route');

router.use('/songs', songRoute);

module.exports = router;
