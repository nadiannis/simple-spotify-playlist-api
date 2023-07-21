const httpStatus = require('http-status');
const playlistService = require('../services/playlist.service');
const playlistSongService = require('../services/playlist-song.service');
const songService = require('../services/song.service');

const getAllSongs = (req, res) => {
  try {
    const { playlistId } = req.params;

    const data = playlistSongService.getAllSongs(playlistId);

    if (data.length === 0) {
      res.status(httpStatus.OK).json({
        status: 'success',
        message: 'There are no songs available in the playlist',
        data,
      });
      return;
    }

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Songs retrieved successfully',
      data,
    });
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }
};

const addSong = (req, res) => {
  const { playlistId } = req.params;
  const { songId } = req.body;

  if (!songId) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ status: 'error', message: 'Invalid request body' });
    return;
  }

  try {
    const data = playlistSongService.addSong(songId, playlistId);

    res.status(httpStatus.CREATED).json({
      status: 'success',
      message: 'Song added to the playlist successfully',
      data,
    });
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }
};

const removeSong = (req, res) => {
  try {
    const { playlistId, songId } = req.params;

    const isSuccess = playlistSongService.removeSong(songId, playlistId);
    if (!isSuccess) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: 'error',
        message: 'Failed to delete song from the playlist',
      });
      return;
    }

    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }
};

const playSong = (req, res) => {
  const { playlistId, songId } = req.params;

  try {
    const playlist = playlistService.get(playlistId);

    const index = playlist.songs.findIndex((song) => song.id === songId);
    const NOT_FOUND_VALUE = -1;
    if (index === NOT_FOUND_VALUE) {
      res
        .status(httpStatus.NOT_FOUND)
        .json({ status: 'error', message: 'Song not found in the playlist' });
      return;
    }

    const song = songService.get(songId);
    songService.update({ playCount: song.playCount + 1 }, songId);
    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Song played successfully',
      data: song.url,
    });
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }
};

module.exports = {
  getAllSongs,
  addSong,
  removeSong,
  playSong,
};
