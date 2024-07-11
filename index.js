/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './src/App';
import {name as appName} from './app.json';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://f37a5389c3514ecea7bf1ab97c203554@tracker.sibche.com/17',
});
AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service'));
