import React, {useEffect} from 'react';
import {ImageBackground} from 'react-native';
import {setPageData} from 'components/Page/pageActions';
import get from 'lodash/get';
import {useSafeArea} from 'react-native-safe-area-context';
import bg from 'assets/Bg.jpg';
import AsyncStorage from '@react-native-community/async-storage';
import {store} from '../../store';
import {
  initializedApp,
  restoreToken,
  setProfileInfo,
} from '../Auth/authActions';
import {AppApi, ProfileApi} from 'api/index';
import LottieView from 'lottie-react-native';
import {goToAuth, goToForceUpdate, goToMain} from 'navigation/linkBuilder';
import messaging from '@react-native-firebase/messaging';
import handleDeepLink from '../../navigation/handleDeepLink';

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

function SplashScreen() {
  const insets = useSafeArea();
  function getAuthToken() {
    try {
      AsyncStorage.getItem('userToken').then(data => {
        store.dispatch(restoreToken(data, !!data));
      });
    } catch (e) {
      store.dispatch(restoreToken(null, false));
    } finally {
      init();
      requestUserPermission();
    }
  }
  function getProfile() {
    ProfileApi.getProfile()
      .then(res => {
        store.dispatch(setProfileInfo(get(res, 'data', {})));
      })
      .catch(() => {});
  }
  function goToHomePage() {
    const pageId = get(
      store.getState(),
      ['auth', 'initInfo', 'PAGE_HOME_ID'],
      '',
    );
    getProfile();
    AppApi.getPage(pageId)
      .then(res => {
        store.dispatch(
          setPageData('home', get(res, 'data.collections.data', [])),
        );
      })
      .catch(e => {
        console.log({e});
      })
      .finally(() => {
        goToMain();
        handleDeepLink();
      });
  }
  function init() {
    AppApi.init()
      .then(res => {
        if (get(res, 'data.LOGGED_IN', false)) {
          store.dispatch(initializedApp(res.data));
          goToHomePage();
        } else {
          goToAuth();
        }
        if (get(res, 'data.VERSION.FORCE_UPDATE', false)) {
          goToForceUpdate(get(res, 'data.VERSION.LINK', ''));
        }
      })
      .catch(e => {
        if (e && !e.response && store.getState().auth.token) {
          goToHomePage();
        }
        //todo
        console.log({e});
      });
  }
  useEffect(getAuthToken, []);
  return (
    <ImageBackground
      source={bg}
      style={{
        flex: 1,
        paddingBottom: insets.bottom,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <LottieView
        style={{width: 120, height: 120}}
        source={require('assets/Preloader.json')}
        autoPlay
        loop
      />
    </ImageBackground>
  );
}
export default SplashScreen;
