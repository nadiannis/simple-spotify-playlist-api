<div align="center">
  <br>
  <h1>Simple Spotify Playlist API</h1>
  <p>A simple API that contains songs</p>
  <br>
</div>

## Description

This is a simple API that contains songs. It is created with Express. The data is read from JSON files & write to JSON files. This project is created as an answer to module 2.3 homework of Generasi GIGIH 3.0.

## Run Locally

### Getting Started

- Make sure you have [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com) installed on your computer.

- Clone the repo.

  ```bash
  git clone https://github.com/nadiannis/simple-spotify-playlist-api.git
  cd simple-spotify-playlist-api
  ```

- Install the dependencies.

  ```bash
  yarn
  ```

### Development

Run the development server.

```bash
yarn dev
```

## Endpoint

### Get songs sorted by the most played

**GET** `/api/songs/most-played-songs`

### Get all songs

**GET** `/api/songs`

### Create a new song

**POST** `/api/songs`

Request body example:

```json
{
  "title": "Stop This Train",
  "artists": ["John Mayer"],
  "url": "https://open.spotify.com/track/3E6iea9uEmB7gRru4lyP6h?si=8758d3dd306a414f"
}
```

### Get a song

**GET** `/api/songs/:songId`

### Update a song

**PUT** `/api/songs/:songId`

Request body example:

```json
{
  "title": "Bond",
  "artists": ["Anomalie"],
  "url": "https://open.spotify.com/track/0xcyIqCJ3rGfChfBxVF1FL?si=8b17481849024e01",
  "playCount": 42
}
```

### Play a song

**GET** `/api/songs/:songId/play`

### Get all playlists

**GET** `/api/playlists`

### Create a new playlist

**POST** `/api/playlists`

Request body example:

```json
{
  "name": "Favorites"
}
```

### Get a playlist

**GET** `/api/playlists/:playlistId`

### Update a playlist

**PUT** `/api/playlists/:playlistId`

Request body example:

```json
{
  "name": "My Favorites"
}
```

### Delete a playlist

**DELETE** `/api/playlists/:playlistId`

### Get songs from a playlist

**GET** `/api/playlists/:playlistId/songs`

### Add a song to a playlist

**POST** `/api/playlists/:playlistId/songs`

Request body example:

```json
{
  "songId": "4efb36ed-b46e-4596-a440-192de9b6b321"
}
```

### Delete a song from a playlist

**DELETE** `/api/playlists/:playlistId/songs/:songId`

### Play a song from a playlist

**GET** `/api/playlists/:playlistId/songs/:songId/play`
