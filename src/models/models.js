import {Platform} from 'react-native';
import get from 'lodash/get';
import filter from 'lodash/filter';
import {store} from '../store';

export function getTrack(data) {
  const artistsName = data.artists
    ? data.artists.data.map(artist => artist.name).join(', ')
    : 'Unknown';
  const songId = get(data, 'id', '');
  let songUrl = get(data, 'file', '');
  let savedSong = filter(store.getState().savedSongs.savedSongs, [
    'id',
    songId,
  ]);
  if (savedSong.length > 0) {
    songUrl =
      Platform.OS === 'android'
        ? `file://${savedSong[0].path}`
        : `file:/${savedSong[0].path}`;
  }
  return {
    id: songId,
    url: songUrl,
    title: get(data, 'name', 'Unknown'),
    artist: artistsName,
    album: 'Unknown',
    genre: 'Unknown',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork: get(data, 'image.medium.url', ''),
  };
}
export function getTracksList(data) {
  return data.map(item => getTrack(item));
}
