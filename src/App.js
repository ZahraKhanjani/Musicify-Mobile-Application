/**
 * @format
 * @flow
 */

import React, {useMemo, createContext} from 'react';
import {Provider} from 'react-redux';
import {StatusBar, I18nManager} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './store';
import AsyncStorage from '@react-native-community/async-storage';
import {ProfileApi, AppApi} from './api';
import {signOut, signIn, initializedApp} from 'screens/Auth/authActions';
import NewPlayer from 'screens/Player/NewPlayer';
import {ConnectionChecker, InternetErrorBox} from 'components/index';
import SongDownloader from 'components/SavedSongs/SongDownloader';
import get from 'lodash/get';
import Progress from 'screens/Player/Progress';
import RootStack from 'navigation/RootStack';
import {goToAuth, goToForceUpdate, goToMain} from 'navigation/linkBuilder';
export const AuthContext = createContext();

const App: () => React$Node = () => {
  I18nManager.forceRTL(false);
  AsyncStorage.getAllKeys((err, keys) => {
    AsyncStorage.multiGet(keys, (error, stores) => {
      stores.map(() => true);
    });
  });
  const authContext = useMemo(
    () => ({
      signOut: async () => {
        ProfileApi.logout();
        AsyncStorage.clear().then(() => {
          store.dispatch(signOut());
        });
        persistor.purge().then(() => {
          goToAuth();
        });
        AsyncStorage.removeItem('persist:root');
      },
      signInApp: token => {
        store.dispatch(signIn(token, true));
        AppApi.init()
          .then(res => {
            if (get(res, 'data.LOGGED_IN', false)) {
              store.dispatch(initializedApp(res.data));
              goToMain();
            } else {
              goToAuth();
            }
            if (get(res, 'data.VERSION.FORCE_UPDATE', false)) {
              goToForceUpdate(get(res, 'data.VERSION.LINK', ''));
            }
          })
          .catch(e => {
            if (e && !e.response && store.getState().auth.token) {
              goToMain();
            }
            //todo
            console.log({e});
          });
        // NavigationService.popToTop();
      },
    }),
    [],
  );
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" />
          <RootStack authContext={authContext} />
          <NewPlayer />
          <Progress />
          <SongDownloader />
          <InternetErrorBox />
          <ConnectionChecker />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
