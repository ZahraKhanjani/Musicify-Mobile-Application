import {getURL, postURL, deleteURL, putURL} from './requestTypes';

import Config from 'react-native-config';

const API_ENDPOINT = Config.API_ENDPOINT;

function getPlaylist(playlistId) {
  const requestURL = `${API_ENDPOINT}/playlists/${playlistId}?include=artists`;
  return getURL(requestURL);
}
function createPlaylist(name, trackId) {
  const requestURL = `${API_ENDPOINT}/playlists`;
  return postURL(requestURL, trackId ? {name, track_id: trackId} : {name});
}
function editPlaylist(playlistId, name) {
  const requestURL = `${API_ENDPOINT}/playlists/${playlistId}`;
  return putURL(requestURL, {name});
}
function deletePlaylist(playlistId) {
  const requestURL = `${API_ENDPOINT}/playlists/${playlistId}`;
  return deleteURL(requestURL);
}
function getPlaylistTracks(playlistId, page) {
  const requestURL = `${API_ENDPOINT}/playlists/${playlistId}/tracks?page=${page}&include=artists,album`;
  return getURL(requestURL);
}
function addSongToPlaylist(playlistId, trackId) {
  const requestURL = `${API_ENDPOINT}/playlists/${playlistId}/tracks`;
  return postURL(requestURL, {track_id: trackId});
}

export default {
  getPlaylist,
  createPlaylist,
  editPlaylist,
  deletePlaylist,
  getPlaylistTracks,
  addSongToPlaylist,
};
