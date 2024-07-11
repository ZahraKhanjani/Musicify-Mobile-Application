import axios from 'axios';
import {persistor, store} from '../store';
import {setConnectingToInternet} from '../generalActions';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import {signOut} from 'screens/Auth/authActions';
import NavigationService from 'navigation/NavigationService';
import DeviceInfo from 'react-native-device-info';
import {StackNames} from 'navigation/routeNames';

export async function generateHeaders(): Object {
  let {token} = store.getState().auth;
  const fcmToken = await messaging().getToken();
  let headers = {
    Uuid: DeviceInfo.getUniqueId(),
    OS: DeviceInfo.getSystemName(),
    'OS-Version': DeviceInfo.getSystemVersion(),
    'Device-Type': DeviceInfo.getDeviceId(),
    'Device-Name': 'test',
    'App-Version': 'test',
    Store: 'test',
    'FCM-TOKEN': fcmToken,
  };
  if (token && token.length > 0) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return headers;
}

function errorHandling(response: Object, config: Object) {
  if (!response) {
    store.dispatch(setConnectingToInternet());
    return;
  }
  switch (response.status) {
    case 503:
    case 504:
      // NavigationService.navigate('Error', {
      //   mode: 'maintenance',
      // });
      break;
    case 401:
      persistor.purge();
      AsyncStorage.removeItem('persist:root');
      AsyncStorage.clear();
      store.dispatch(signOut());
      NavigationService.navigate(StackNames.Auth);
      break;
    case 400:
      break;
    default:
      break;
  }
}

export async function getURL(url: string, otherConfig) {
  const headers = await generateHeaders();
  const config = {headers, ...otherConfig};
  return axios.get(url, config).catch(error => {
    errorHandling(error.response, error.config);
    throw error;
  });
}
export async function postURL(url: string, data: Object) {
  const headers = await generateHeaders();
  const config = {headers};
  return axios.post(url, data, config).catch(error => {
    errorHandling(error.response, error.config);
    throw error;
  });
}
export async function putURL(url: string, data: Object) {
  const headers = await generateHeaders();
  const config = {headers};
  return axios.put(url, data, config).catch(error => {
    errorHandling(error.response, error.config);
    throw error;
  });
}
export async function deleteURL(url: string) {
  const headers = await generateHeaders();
  const config = {headers};
  return axios.delete(url, config).catch(error => {
    errorHandling(error.response, error.config);
    throw error;
  });
}
