import {getURL, postURL} from './requestTypes';

import Config from 'react-native-config';

const API_ENDPOINT = Config.API_ENDPOINT;

function getTrack(trackId) {
  const requestURL = `${API_ENDPOINT}/tracks/${trackId}?include=artists&albums`;
  return getURL(requestURL);
}

function postTrackPlayData(trackId, duration) {
  const requestURL = `${API_ENDPOINT}/tracks/${trackId}/play`;
  return postURL(requestURL, {duration});
}
export default {
  getTrack,
  postTrackPlayData,
};
