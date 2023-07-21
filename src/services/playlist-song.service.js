const path = require('path');
const httpStatus = require('http-status');
const { load, save } = require('../utils/data');

const PLAYLISTS_FILE_PATH = path.join(__dirname, '../data/playlists.json');
const SONGS_FILE_PATH = path.join(__dirname, '../data/songs.json');

const getAllSongs = (playlistId) => {
  const playlists = load(PLAYLISTS_FILE_PATH);
  const playlist = playlists.find((playlist) => playlist.id === playlistId);

  if (!playlist) {
    const error = new Error('Playlist not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  const songs = load(SONGS_FILE_PATH);
  return songs.filter((song) => playlist.songs.includes(song.id));
};

const addSong = (songId, playlistId) => {
  const playlists = load(PLAYLISTS_FILE_PATH);
  const playlist = playlists.find((playlist) => playlist.id === playlistId);

  if (!playlist) {
    const error = new Error('Playlist not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  const songs = load(SONGS_FILE_PATH);
  const song = songs.find((song) => song.id === songId);
  if (!song) {
    const error = new Error('Song not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  playlist.songs.push(songId);
  save(playlists, PLAYLISTS_FILE_PATH);
  return playlist;
};

const removeSong = (songId, playlistId) => {
  const playlists = load(PLAYLISTS_FILE_PATH);
  const playlist = playlists.find((playlist) => playlist.id === playlistId);

  if (!playlist) {
    const error = new Error('Playlist not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  const index = playlist.songs.findIndex((id) => id === songId);
  const NOT_FOUND_VALUE = -1;
  if (index === NOT_FOUND_VALUE) {
    const error = new Error('Song not found in the playlist');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  playlist.songs.splice(index, 1);
  save(playlists, PLAYLISTS_FILE_PATH);
  return true;
};

module.exports = {
  getAllSongs,
  addSong,
  removeSong,
};
