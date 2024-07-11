import TrackPlayer, {
  Capability,
  IOSCategory,
  IOSCategoryMode,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
import {getTracksList} from 'models/models';
import shuffle from 'lodash/shuffle';
import concat from 'lodash/concat';
import {store} from '../../store';
import {
  setCurrentSong,
  setIsPlaying,
  setSongsList,
  turnOnShuffle,
  turnOffShuffle,
} from './playerActions';
import {useEffect} from 'react';
import slice from 'lodash/slice';
import {repeatStatus} from './playerReducer';
import NavigationService from 'navigation/NavigationService';
import {ModalsNames} from 'navigation/routeNames';
import {TrackApi} from 'api/index';
import PlayMusicAnalyticsHandler from 'utils/AnalyticsEvents';
import filter from 'lodash/filter';
import {PREV_TRACK_MIN_DURATION} from 'utils/constants';

function NewPlayer() {
  const events = [
    Event.PlaybackTrackChanged,
    Event.PlaybackQueueEnded,
    Event.PlaybackError,
    Event.RemotePause,
    Event.RemoteNext,
    Event.RemotePrevious,
    Event.RemotePlay,
    Event.RemotePause,
    Event.RemoteStop,
    Event.RemoteSeek,
    Event.RemoteDuck,
  ];
  function getTrack() {
    TrackPlayer.getCurrentTrack().then(newTrack => {
      store.dispatch(setCurrentSong(newTrack));
      TrackPlayer.seekTo(0);
    });
  }
  useTrackPlayerEvents(events, event => {
    switch (event.type) {
      case Event.RemoteDuck:
        pauseSong();
        break;
      case Event.PlaybackError:
        console.warn(
          'An error occured while playing the current track.',
          event,
        );
        break;
      case Event.PlaybackQueueEnded:
        if (store.getState().player.repeat === repeatStatus.all) {
          skipToSong(store.getState().player.songsList[0].id);
        } else {
          TrackPlayer.play().then(pauseSong);
        }
        break;
      case Event.PlaybackTrackChanged:
        const currentSong =
          filter(store.getState().player?.songsList, [
            'id',
            event?.nextTrack,
          ])[0] || {};
        PlayMusicAnalyticsHandler.logEvent({track: currentSong});
        if (event?.track) {
          TrackApi.postTrackPlayData(
            event.track,
            PlayMusicAnalyticsHandler.getPlayedDuration(),
          );
        }
        PlayMusicAnalyticsHandler.resetPlayState();
        getTrack();
        break;
      case Event.RemoteNext:
        playNextSong();
        break;
      case Event.RemotePrevious:
        playPrevSong();
        break;
      case Event.RemotePlay:
        playSong();
        break;
      case Event.RemotePause:
        pauseSong();
        break;
      case Event.RemoteStop:
        pauseSong();
        break;
      case Event.RemoteSeek:
        TrackPlayer.seekTo(event.position);
        break;
      default:
    }
  });

  useEffect(() => {
    // Initialize
    TrackPlayer.setupPlayer({
      iosCategory: IOSCategory.Playback,
      // iosCategoryOptions:
      iosCategoryMode: IOSCategoryMode.Default,
    });
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
        Capability.SeekTo,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause],
    });
  }, []);
  return null;
}

function setUpcomingSongs(upcompingList, trackList) {
  TrackPlayer.removeUpcomingTracks().then(function() {
    TrackPlayer.add(getTracksList(upcompingList)).then(function() {
      store.dispatch(setSongsList(trackList));
    });
  });
}

function addSongsToQueue(upcompingList) {
  const songsList = store.getState().player.songsList;
  TrackPlayer.add(getTracksList(upcompingList)).then(function() {
    store.dispatch(setSongsList([...songsList, ...upcompingList]));
  });
}

function turnShuffleOn() {
  TrackPlayer.removeUpcomingTracks().then(function() {
    const songsList = store.getState().player.songsList;
    const currentSongIndex = store.getState().player.currentSongIndex;
    const shuffledList = shuffle(slice(songsList, currentSongIndex + 1));
    TrackPlayer.add(getTracksList(shuffledList)).then(function() {
      store.dispatch(
        turnOnShuffle(
          concat(slice(songsList, 0, currentSongIndex + 1), shuffledList),
        ),
      );
    });
  });
}

function turnShuffleOff() {
  TrackPlayer.removeUpcomingTracks().then(function() {
    const songsList = store.getState().player.songsList;
    const currentSongIndex = store.getState().player.currentSongIndex;
    const list = slice(songsList, currentSongIndex);
    TrackPlayer.add(getTracksList(list)).then(function() {
      store.dispatch(turnOffShuffle());
    });
  });
}

function setQueueAndPlay(
  trackList,
  trackId,
  listId = null,
  listType,
  pageId = null,
) {
  if (listId && listId === store.getState().player?.currentListId) {
    skipToSong(trackId);
  } else {
    PlayMusicAnalyticsHandler.setLastEventListInfo({
      listId,
      listType,
      pageId,
    });
    store.dispatch(setSongsList(trackList, listId));
    TrackPlayer.reset().then(() => {
      TrackPlayer.add(getTracksList(trackList)).then(function() {
        // The tracks were added
        TrackPlayer.skip(trackId).then(function() {
          TrackPlayer.play().then(function() {
            if (!store.getState().player.minimized) {
              NavigationService.navigate('PlayerModal');
            }
            store.dispatch(setIsPlaying(true));
          });
        });
      });
    });
  }
}

function setQueueAndShufflePlay(trackList, listId, listType, pageId) {
  const shuffledList = shuffle(trackList);
  PlayMusicAnalyticsHandler.setLastEventListInfo({
    listId,
    listType,
    pageId,
  });
  store.dispatch(setSongsList(trackList, listId));
  TrackPlayer.reset().then(() => {
    TrackPlayer.add(getTracksList(shuffledList)).then(function() {
      store.dispatch(turnOnShuffle(shuffledList));
      // The tracks were added
      TrackPlayer.play().then(function() {
        if (!store.getState().player.minimized) {
          NavigationService.navigate(ModalsNames.Player);
        }
        store.dispatch(setIsPlaying(true));
      });
    });
  });
}

function skipToSong(songId) {
  TrackPlayer.pause().then(() => {
    store.dispatch(setIsPlaying(false));
    TrackPlayer.skip(songId).then(playSong);
  });
}

function playSong() {
  TrackPlayer.play().then(function() {
    store.dispatch(setIsPlaying(true));
  });
}
function pauseSong() {
  TrackPlayer.pause().then(function() {
    store.dispatch(setIsPlaying(false));
  });
}

function playNextSong() {
  TrackPlayer.skipToNext().catch(() => {
    skipToSong(store.getState().player.songsList[0].id);
  });
}

function playPrevSong() {
  const currentPosition = store.getState().player?.progressState?.position || 0;
  if (currentPosition <= PREV_TRACK_MIN_DURATION) {
    TrackPlayer.skipToPrevious().catch(() => {
      const {songsList} = store.getState().player;
      skipToSong(songsList[songsList.length - 1].id);
    });
  } else {
    TrackPlayer.seekTo(0);
  }
}

function checkAndUpdateSongInTheList(songId: string) {
  const songsList = store.getState().player.songsList;
  const savedSong =
    filter(store.getState().player?.songsList, ['id', songId])[0] || null;
  const savedSongIndex = songsList.indexOf(savedSong);
  const removeAndAddAgain = () => {
    TrackPlayer.remove([songId]).then(
      TrackPlayer.add(
        getTracksList([savedSong]),
        songsList[savedSongIndex + 1]?.id || null,
      ),
    );
  };
  if (savedSong) {
    if (savedSongIndex !== store.getState().player.currentSongIndex) {
      removeAndAddAgain();
    } else {
      const eventListener = TrackPlayer.addEventListener(
        Event.PlaybackTrackChanged,
        () => {
          removeAndAddAgain();
          eventListener.remove();
        },
      );
    }
  }
}

export {
  setQueueAndPlay,
  setUpcomingSongs,
  addSongsToQueue,
  playSong,
  pauseSong,
  playNextSong,
  playPrevSong,
  skipToSong,
  turnShuffleOn,
  turnShuffleOff,
  setQueueAndShufflePlay,
  checkAndUpdateSongInTheList,
};
export default NewPlayer;
