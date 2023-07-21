const httpStatus = require('http-status');
const playlistService = require('../services/playlist.service');

const getAll = (req, res) => {
  const data = playlistService.getAll();

  if (data.length === 0) {
    res.status(httpStatus.OK).json({
      success: true,
      message: 'There are no playlists available',
      data,
    });
    return;
  }

  res
    .status(httpStatus.OK)
    .json({ success: true, message: 'Playlists retrieved successfully', data });
};

const create = (req, res) => {
  const { name } = req.body;

  if (!name) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ success: false, message: 'Invalid request body' });
    return;
  }

  const data = playlistService.create(name);

  res
    .status(httpStatus.CREATED)
    .json({ success: true, message: 'Playlist created successfully', data });
};

const get = (req, res) => {
  try {
    const { playlistId } = req.params;

    const data = playlistService.get(playlistId);

    res.status(httpStatus.OK).json({
      success: true,
      message: 'Playlist retrieved successfully',
      data,
    });
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
  }
};

const update = (req, res) => {
  try {
    const { playlistId } = req.params;
    const newPlaylistData = req.body;

    const data = playlistService.update(newPlaylistData, playlistId);

    res
      .status(httpStatus.OK)
      .json({ success: true, message: 'Playlist updated successfully', data });
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
  }
};

const remove = (req, res) => {
  try {
    const { playlistId } = req.params;

    const isSuccess = playlistService.remove(playlistId);
    if (!isSuccess) {
      res
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: 'Failed to delete playlist' });
      return;
    }

    res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    res
      .status(error.statusCode)
      .json({ success: false, message: error.message });
  }
};

module.exports = {
  getAll,
  create,
  get,
  update,
  remove,
};
