const httpStatus = require('http-status');
const songService = require('../services/song.service');

const getAll = (req, res) => {
  const data = songService.getAll();

  if (data.length === 0) {
    res
      .status(httpStatus.OK)
      .json({ success: true, message: 'There are no songs available', data });
    return;
  }

  res
    .status(httpStatus.OK)
    .json({ success: true, message: 'Songs retrieved successfully', data });
};

const create = (req, res) => {
  const { title, artists, url } = req.body;

  if (!title || !artists || !url) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ success: false, message: 'Invalid request body' });
    return;
  }

  let data = songService.create(title, artists, url);

  res
    .status(httpStatus.CREATED)
    .json({ success: true, message: 'Song created successfully', data });
};

const get = (req, res) => {
  try {
    const { songId } = req.params;

    const data = songService.get(songId);

    res
      .status(httpStatus.OK)
      .json({ success: true, message: 'Song retrieved successfully', data });
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
  }
};

const update = (req, res) => {
  try {
    const { songId } = req.params;
    const newSongData = req.body;

    const data = songService.update(newSongData, songId);

    res
      .status(httpStatus.OK)
      .json({ success: true, message: 'Song updated successfully', data });
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
  }
};

const getSongsByMostPlayed = (req, res) => {
  const songs = songService.getAll();
  const data = songs.sort((a, b) => b.playCount - a.playCount);

  if (data.length === 0) {
    res
      .status(httpStatus.OK)
      .json({ success: true, message: 'There are no songs available', data });
    return;
  }

  res
    .status(httpStatus.OK)
    .json({ success: true, message: 'Songs retrieved successfully', data });
};

module.exports = {
  getAll,
  create,
  get,
  update,
  getSongsByMostPlayed,
};
