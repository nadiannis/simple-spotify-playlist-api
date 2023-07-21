const httpStatus = require('http-status');
const playlistService = require('../services/playlist.service');

const getAll = (req, res) => {
  const data = playlistService.getAll();

  if (data.length === 0) {
    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'There are no playlists available',
      data,
    });
    return;
  }

  res
    .status(httpStatus.OK)
    .json({
      status: 'success',
      message: 'Playlists retrieved successfully',
      data,
    });
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ status: 'error', message: 'Invalid request body' });
    return;
  }

  const data = playlistService.create(name);

  res
    .status(httpStatus.CREATED)
    .json({
      status: 'success',
      message: 'Playlist created successfully',
      data,
    });
};

const get = (req, res) => {
  try {
    const { playlistId } = req.params;

    const data = playlistService.get(playlistId);

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Playlist retrieved successfully',
      data,
    });
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }
};

const update = (req, res) => {
  try {
    const { playlistId } = req.params;
    const newPlaylistData = req.body;

    const data = playlistService.update(newPlaylistData, playlistId);

    res
      .status(httpStatus.OK)
      .json({
        status: 'success',
        message: 'Playlist updated successfully',
        data,
      });
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }
};

const remove = (req, res) => {
  try {
    const { playlistId } = req.params;

    const isSuccess = playlistService.remove(playlistId);
    if (!isSuccess) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', message: 'Failed to delete playlist' });
      return;
    }

    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }
};

module.exports = {
  getAll,
  create,
  get,
  update,
  remove,
};
