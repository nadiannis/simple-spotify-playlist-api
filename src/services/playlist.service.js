const path = require('path');
const httpStatus = require('http-status');
const { load, save } = require('../utils/data');
const Playlist = require('../models/playlist.model');

const PLAYLISTS_FILE_PATH = path.join(__dirname, '../data/playlists.json');
const SONGS_FILE_PATH = path.join(__dirname, '../data/songs.json');

const getAll = () => {
  const playlists = load(PLAYLISTS_FILE_PATH);
  const songs = load(SONGS_FILE_PATH);

  const playlistsDetails = playlists.map((playlist) => {
    const playlistSongs = songs.filter((song) =>
      playlist.songs.includes(song.id)
    );

    return {
      id: playlist.id,
      name: playlist.name,
      songs: playlistSongs,
    };
  });

  return playlistsDetails;
};

const create = (name) => {
  const playlists = load(PLAYLISTS_FILE_PATH);
  const playlist = new Playlist(name);

  playlists.push(playlist);
  save(playlists, PLAYLISTS_FILE_PATH);
  return playlist;
};

const get = (playlistId) => {
  const playlists = load(PLAYLISTS_FILE_PATH);
  const playlist = playlists.find((playlist) => playlist.id === playlistId);

  if (!playlist) {
    const error = new Error('Playlist not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  const songs = load(SONGS_FILE_PATH);
  const playlistSongs = songs.filter((song) => {
    return playlist.songs.includes(song.id);
  });

  const playlistDetails = {
    id: playlist.id,
    name: playlist.name,
    songs: playlistSongs,
  };

  return playlistDetails;
};

const update = (playlistData, playlistId) => {
  const playlists = load(PLAYLISTS_FILE_PATH);
  const instance = playlists.find((playlist) => playlist.id === playlistId);

  if (!instance) {
    const error = new Error('Playlist not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  instance.name = playlistData.name || instance.name;
  save(playlists, PLAYLISTS_FILE_PATH);
  return instance;
};

const remove = (playlistId) => {
  const playlists = load(PLAYLISTS_FILE_PATH);

  const index = playlists.findIndex((playlist) => playlist.id === playlistId);
  const NOT_FOUND_VALUE = -1;
  if (index === NOT_FOUND_VALUE) {
    const error = new Error('Playlist not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  playlists.splice(index, 1);
  save(playlists, PLAYLISTS_FILE_PATH);
  return true;
};

module.exports = {
  getAll,
  create,
  get,
  update,
  remove,
};
