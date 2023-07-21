const { v4: uuidv4 } = require('uuid');

class Playlist {
  constructor(name, songs = []) {
    this.id = uuidv4();
    this.name = name;
    this.songs = songs;
  }
}

module.exports = Playlist;
