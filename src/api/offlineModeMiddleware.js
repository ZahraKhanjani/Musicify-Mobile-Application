//@flow
import {store} from '../store';
import filter from 'lodash/filter';
import AlbumApi from './album';
import PlaylistApi from './playlist';

export function getAlbumTracks(albumId: string, page: number = 1) {
  const downloadedList = filter(
    store.getState().savedSongs.savedLists,
    function(item) {
      return item.id === albumId;
    },
  );
  if (downloadedList.length > 0) {
    return new Promise(function() {
      return {data: {data: downloadedList[0].tracks}};
    });
  }
  return AlbumApi.getAlbumTracks(albumId, page);
}
export function getPlaylistTracks(playlistId: string, page: number = 1) {
  const downloadedList = filter(
    store.getState().savedSongs.savedLists,
    function(item) {
      return item.id === playlistId;
    },
  );
  if (downloadedList.length > 0) {
    return new Promise(function(resolve) {
      resolve({data: {data: downloadedList[0].tracks}});
    });
  }
  return PlaylistApi.getPlaylistTracks(playlistId, page);
}
