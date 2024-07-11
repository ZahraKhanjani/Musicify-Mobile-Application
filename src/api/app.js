import {getURL, postURL} from './requestTypes';
import Config from 'react-native-config';

const API_ENDPOINT = Config.API_ENDPOINT;

function init() {
  const requestURL = `${API_ENDPOINT}/init`;
  return postURL(requestURL, {});
}
function searchQuery(query, cancelToken) {
  const requestURL = `${API_ENDPOINT}/search?query=${query}&include=tracks.artists,tracks.album,albums.artists`;
  return getURL(requestURL, {cancelToken});
}
function getPage(pageId) {
  const requestURL = `${API_ENDPOINT}/pages/${pageId}?include=collections.tracks.artists,collections.albums.artists`;
  return getURL(requestURL);
}

export default {
  init,
  searchQuery,
  getPage,
};
