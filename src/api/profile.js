import {
  deleteURL,
  generateHeaders,
  getURL,
  postURL,
  putURL,
} from './requestTypes';

import Config from 'react-native-config';

const API_ENDPOINT = Config.API_ENDPOINT;

async function authenticate({email, password}) {
  const requestURL = `${API_ENDPOINT}/profile/authenticate`;
  const headers = await generateHeaders();
  return postURL(requestURL, {email, password, ...headers});
}
async function register({name, email, password}) {
  const requestURL = `${API_ENDPOINT}/profile/register`;
  const headers = await generateHeaders();
  return postURL(requestURL, {
    name,
    email,
    password,
    ...headers,
  });
}
function logout() {
  const requestURL = `${API_ENDPOINT}/profile/logout`;
  return postURL(requestURL, {});
}

function getProfile() {
  const requestURL = `${API_ENDPOINT}/profile`;
  return getURL(requestURL);
}

function changePassword({oldPassword, newPassword}) {
  const requestURL = `${API_ENDPOINT}/profile/change-password`;
  return postURL(requestURL, {
    old_password: oldPassword,
    new_password: newPassword,
  });
}

function updateProfile({name}) {
  const requestURL = `${API_ENDPOINT}/profile`;
  return putURL(requestURL, {
    name,
  });
}

function forgetPassword({email}) {
  const requestURL = `${API_ENDPOINT}/profile/reset-password`;
  return postURL(requestURL, {
    email,
  });
}

function getSavedArtists() {
  const requestURL = `${API_ENDPOINT}/profile/artists?include=artists,album`;
  return getURL(requestURL);
}
function getSavedTracks() {
  const requestURL = `${API_ENDPOINT}/profile/tracks?include=artists,album`;
  return getURL(requestURL);
}

function getSavedAlbums() {
  const requestURL = `${API_ENDPOINT}/profile/albums`;
  return getURL(requestURL);
}

function getPlaylists(pageNumber = 1) {
  const requestURL = `${API_ENDPOINT}/profile/playlists?page=${pageNumber}`;
  return getURL(requestURL);
}

function favSong(songId) {
  const requestURL = `${API_ENDPOINT}/profile/tracks`;
  return postURL(requestURL, {track_id: songId});
}
function unfavSong(songId) {
  const requestURL = `${API_ENDPOINT}/profile/tracks/${songId}`;
  return deleteURL(requestURL);
}
function favAlbum(albumId) {
  const requestURL = `${API_ENDPOINT}/profile/albums`;
  return postURL(requestURL, {album_id: albumId});
}
function unfavAlbum(albumId) {
  const requestURL = `${API_ENDPOINT}/profile/albums/${albumId}`;
  return deleteURL(requestURL);
}
function favPlaylist(playlistId) {
  const requestURL = `${API_ENDPOINT}/profile/playlists`;
  return postURL(requestURL, {playlist_id: playlistId});
}
function unfavPlaylist(playlistId) {
  const requestURL = `${API_ENDPOINT}/profile/playlists/${playlistId}`;
  return deleteURL(requestURL);
}
function followArtist(artistId) {
  const requestURL = `${API_ENDPOINT}/profile/artists`;
  return postURL(requestURL, {artist_id: artistId});
}
function unfollowArtist(artistId) {
  const requestURL = `${API_ENDPOINT}/profile/artists/${artistId}`;
  return deleteURL(requestURL);
}

export default {
  authenticate,
  register,
  logout,
  getProfile,
  changePassword,
  updateProfile,
  forgetPassword,
  getSavedArtists,
  getSavedAlbums,
  getSavedTracks,
  getPlaylists,
  favSong,
  unfavSong,
  favAlbum,
  unfavAlbum,
  favPlaylist,
  unfavPlaylist,
  followArtist,
  unfollowArtist,
};
