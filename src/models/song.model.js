const { v4: uuidv4 } = require('uuid');

class Song {
  constructor(title, artists, url, playCount = 0) {
    this.id = uuidv4();
    this.title = title;
    this.artists = artists;
    this.url = url;
    this.playCount = playCount;
  }
}

module.exports = Song;
