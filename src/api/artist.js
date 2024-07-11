import {getURL} from './requestTypes';
import Config from 'react-native-config';

const API_ENDPOINT = Config.API_ENDPOINT;

function getArtist(artistId) {
  const requestURL = `${API_ENDPOINT}/artists/${artistId}`;
  return getURL(requestURL);
}
function getArtistTracks(artistId, page = 1, cancelToken) {
  const requestURL = `${API_ENDPOINT}/artists/${artistId}/tracks?page=${page}&include=artists,album`;
  return getURL(requestURL, {cancelToken});
}
function getArtistAlbums(artistId, page, cancelToken) {
  const requestURL = `${API_ENDPOINT}/artists/${artistId}/albums?page=${page}&include=artists`;
  return getURL(requestURL, {cancelToken});
}

export default {getArtist, getArtistTracks, getArtistAlbums};
