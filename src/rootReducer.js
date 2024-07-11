import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import playerReducer from 'screens/Player/playerReducer';
import authReducer from 'screens/Auth/authReducer';
import playlistsReducer from 'screens/Playlist/playlistsReducer';
import savedSongsReducer from 'components/SavedSongs/savedSongsReducer';
import libraryReducer from 'screens/Library/libraryReducer';
import pageReducer from 'components/Page/pageReducer';
import searchReducer from 'screens/Search/searchReducer';
import generalReducer from './generalReducer';

const playerPersistConfig = {
  key: 'player',
  storage: AsyncStorage,
  blacklist: [
    'currentSong',
    'currentSongIndex',
    'queue',
    'songsList',
    'shuffledList',
    'isPlaying',
    'minimized',
  ],
};

const savedSongsPersistConfig = {
  key: 'savedSongs',
  storage: AsyncStorage,
  blacklist: ['currentlySavingSong'],
};

const rootReducer = combineReducers({
  player: persistReducer(playerPersistConfig, playerReducer),
  auth: authReducer,
  savedSongs: persistReducer(savedSongsPersistConfig, savedSongsReducer),
  playlists: playlistsReducer,
  library: libraryReducer,
  pages: pageReducer,
  search: searchReducer,
  general: generalReducer,
});

export default rootReducer;
