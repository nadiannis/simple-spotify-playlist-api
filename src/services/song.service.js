const path = require('path');
const httpStatus = require('http-status');
const { load, save } = require('../utils/data');
const Song = require('../models/song.model');

const SONGS_FILE_PATH = path.join(__dirname, '../data/songs.json');

const getAll = () => {
  const songs = load(SONGS_FILE_PATH);

  return songs;
};

const create = (title, artists, url) => {
  const songs = load(SONGS_FILE_PATH);
  const song = new Song(title, artists, url);

  songs.push(song);
  save(songs, SONGS_FILE_PATH);
  return song;
};

const get = (songId) => {
  const songs = load(SONGS_FILE_PATH);
  const song = songs.find((song) => song.id === songId);

  if (!song) {
    const error = new Error('Song not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  return song;
};

const update = (songData, songId) => {
  const songs = load(SONGS_FILE_PATH);
  const instance = songs.find((song) => song.id === songId);

  if (!instance) {
    const error = new Error('Song not found');
    error.statusCode = httpStatus.NOT_FOUND;
    throw error;
  }

  instance.title = songData.title || instance.title;
  instance.artists = songData.artists || instance.artists;
  instance.url = songData.url || instance.url;
  instance.playCount = songData.playCount || instance.playCount;
  save(songs, SONGS_FILE_PATH);
  return instance;
};

module.exports = {
  getAll,
  create,
  get,
  update,
};
