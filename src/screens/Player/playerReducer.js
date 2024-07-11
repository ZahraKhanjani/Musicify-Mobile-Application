import findIndex from 'lodash/findIndex';
import filter from 'lodash/filter';
import concat from 'lodash/concat';
export const repeatStatus = {
  off: 'off',
  single: 'single',
  all: 'all',
};
function nextRepeatStatus(status) {
  return status === repeatStatus.off
    ? repeatStatus.all
    : status === repeatStatus.all
    ? repeatStatus.single
    : status === repeatStatus.single
    ? repeatStatus.off
    : repeatStatus.off;
}
const initialState = {
  currentSong: {},
  currentSongIndex: 0,
  currentListId: '',
  queue: [],
  songsList: [],
  shuffledList: [],
  isPlaying: true,
  minimized: false,
  repeat: repeatStatus.off,
  shuffle: false,
  progressState: {
    duration: 0,
    position: 0,
    state: 'undefined',
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SET_IS_PLAYING':
      return {
        ...state,
        isPlaying: action.isPlaying,
      };
    case 'SET_CURRENT_SONG':
      return {
        ...state,
        currentSong: filter(state.songsList, ['id', action.songId])[0] || {},
        currentSongIndex:
          findIndex(state.shuffle ? state.shuffledList : state.songsList, [
            'id',
            action.songId,
          ]) || 0,
      };
    case 'SET_SONGS_LIST':
      return {
        ...state,
        songsList: action.list,
        currentListId: action.listId,
      };
    case 'SET_QUEUE':
      return {
        ...state,
        queue: action.queue,
      };
    case 'TURN_ON_SHUFFLE':
      return {
        ...state,
        shuffledList: action.shuffledList,
        shuffle: true,
      };
    case 'TURN_OFF_SHUFFLE':
      return {
        ...state,
        shuffledList: [],
        shuffle: false,
      };
    case 'TOGGLE_REPEAT':
      return {
        ...state,
        repeat: nextRepeatStatus(state.repeat),
      };
    case 'MINIMIZE_PLAYER':
      return {
        ...state,
        minimized: true,
      };
    case 'ADD_TO_QUEUE':
      return {
        ...state,
        queue: concat(state.queue, action.songs),
      };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        progressState: action.state,
      };
    default:
      return state;
  }
}
