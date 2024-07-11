import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {store} from '../../store';
import {
  setConnectingToInternet,
  unsetConnectingToInternet,
} from '../../generalActions';
import Config from 'react-native-config';

const CONNECTION_CHECK_ENDPOINT = Config.CONNECTION_CHECK_ENDPOINT;

function ConnectionChecker() {
  useEffect(function() {
    NetInfo.configure({
      reachabilityUrl: `${CONNECTION_CHECK_ENDPOINT}/ip`,
      reachabilityTest: async response => response.status === 204,
      reachabilityLongTimeout: 60 * 1000, // 60s
      reachabilityShortTimeout: 5 * 1000, // 5s
      reachabilityRequestTimeout: 15 * 1000, // 15s
    });

    return NetInfo.addEventListener(state => {
      if (state.isInternetReachable) {
        store.dispatch(unsetConnectingToInternet());
      } else {
        store.dispatch(setConnectingToInternet());
      }
    });
  }, []);

  return <></>;
}

export default ConnectionChecker;
