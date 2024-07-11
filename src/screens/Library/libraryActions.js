export function favSong(songId) {
  return {
    type: 'FAV_SONG',
    songId,
  };
}

export function unfavSong(songId) {
  return {
    type: 'UNFAV_SONG',
    songId,
  };
}

export function favPlaylist(playlistId) {
  return {
    type: 'FAV_PLAYLIST',
    playlistId,
  };
}

export function unfavPlaylist(playlistId) {
  return {
    type: 'UNFAV_PLAYLIST',
    playlistId,
  };
}

export function favAlbum(albumId) {
  return {
    type: 'FAV_ALBUM',
    albumId,
  };
}

export function unfavAlbum(albumId) {
  return {
    type: 'UNFAV_ALBUM',
    albumId,
  };
}

export function followArtist(artistId) {
  return {
    type: 'FOLLOW_ARTIST',
    artistId,
  };
}

export function unfollowArtist(artistId) {
  return {
    type: 'UNFOLLOW_ARTIST',
    artistId,
  };
}
