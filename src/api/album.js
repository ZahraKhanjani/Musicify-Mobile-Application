import {getURL} from './requestTypes';

import Config from 'react-native-config';

const API_ENDPOINT = Config.API_ENDPOINT;

function getAlbum(albumId) {
  const requestURL = `${API_ENDPOINT}/albums/${albumId}?include=artists`;
  return getURL(requestURL);
}
function getAlbumTracks(albumId, page) {
  const requestURL = `${API_ENDPOINT}/albums/${albumId}/tracks?page=${page}&include=artists,album`;
  return getURL(requestURL);
}

export default {
  getAlbum,
  getAlbumTracks,
};
