const path = require('path');
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
    throw new Error('Song not found');
  }

  return song;
};

const update = (songData, songId) => {
  const songs = load(SONGS_FILE_PATH);
  const instance = songs.find((song) => song.id === songId);

  if (!instance) {
    throw new Error('Song not found');
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
