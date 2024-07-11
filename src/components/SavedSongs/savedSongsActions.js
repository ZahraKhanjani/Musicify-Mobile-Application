export function saveSongRequest(song) {
  return {
    type: 'SAVE_SONG_REQUEST',
    song,
  };
}
export function unsaveSongRequest(song) {
  return {
    type: 'UNSAVE_SONG_REQUEST',
    song,
  };
}
export function removeFromDownloadQueue(song) {
  return {
    type: 'REMOVE_FROM_DOWNLOAD_QUEUE',
    song,
  };
}
export function saveSongListRequest(songList, songListInfo) {
  return {
    type: 'SAVE_SONG_LIST_REQUEST',
    songList,
    songListInfo,
  };
}
export function startSavingSong(song) {
  return {
    type: 'START_SAVING_SONG',
    song,
  };
}
export function finishSavingSong(song) {
  return {
    type: 'FINISH_SAVING_SONG',
    song,
  };
}
export function unsaveSongList(songListId) {
  return {
    type: 'UNSAVE_SONG_LIST',
    songListId,
  };
}
