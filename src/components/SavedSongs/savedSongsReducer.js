import concat from 'lodash/concat';
import filter from 'lodash/filter';
const initialState = {
  savedSongs: [],
  currentlySavingSong: null,
  savingQueue: [],
  savedLists: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_SONG_REQUEST':
      return {
        ...state,
        savingQueue: concat(state.savingQueue, action.song),
      };
    case 'REMOVE_FROM_DOWNLOAD_QUEUE':
      return {
        ...state,
        savingQueue: filter(state.savingQueue, function(item) {
          return item.id !== action.song.id;
        }),
      };
    case 'UNSAVE_SONG_REQUEST':
      if (action.song.id === state.currentlySavingSong) {
        return {
          ...state,
          currentlySavingSong: null,
          savingQueue: filter(state.savingQueue, function(item) {
            return item.id !== action.song.id;
          }),
        };
      }
      return {
        ...state,
        savedSongs: filter(state.savedSongs, function(item) {
          return item.id !== action.song.id;
        }),
        savingQueue: filter(state.savingQueue, function(item) {
          return item.id !== action.song.id;
        }),
      };
    case 'SAVE_SONG_LIST_REQUEST':
      return {
        ...state,
        savingQueue: concat(state.savingQueue, action.songList),
        savedLists: concat(state.savedLists, {
          ...action.songListInfo,
          tracks: action.songList,
        }),
      };
    case 'START_SAVING_SONG':
      return {
        ...state,
        currentlySavingSong: action.song,
      };
    case 'FINISH_SAVING_SONG':
      state.savingQueue.shift();
      return {
        ...state,
        currentlySavingSong: null,
        savedSongs: concat(state.savedSongs, action.song),
      };
    case 'UNSAVE_SONG_LIST':
      return {
        ...state,
        savedLists: filter(state.savedLists, function(item) {
          return item.id !== action.songListId;
        }),
        savingQueue: [],
        currentlySavingSong: null,
      };
    case 'SIGN_OUT':
      return initialState;
    default:
      return state;
  }
}
