export function setSongsList(list, listId = '') {
  return {
    type: 'SET_SONGS_LIST',
    list,
    listId,
  };
}
export function setCurrentSong(songId) {
  return {
    type: 'SET_CURRENT_SONG',
    songId,
  };
}
export function setIsPlaying(isPlaying) {
  return {
    type: 'SET_IS_PLAYING',
    isPlaying,
  };
}
export function setQueue(queue) {
  return {
    type: 'SET_QUEUE',
    queue,
  };
}
export function minimizePlayer() {
  return {
    type: 'MINIMIZE_PLAYER',
  };
}
export function turnOnShuffle(shuffledList) {
  return {
    type: 'TURN_ON_SHUFFLE',
    shuffledList,
  };
}
export function turnOffShuffle() {
  return {
    type: 'TURN_OFF_SHUFFLE',
  };
}
export function toggleRepeat() {
  return {
    type: 'TOGGLE_REPEAT',
  };
}
export function updateProgress(state) {
  return {
    type: 'UPDATE_PROGRESS',
    state,
  };
}
export function addToQueue(songs) {
  return {
    type: 'ADD_TO_QUEUE',
    songs,
  };
}
