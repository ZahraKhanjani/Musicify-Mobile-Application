import analytics from '@react-native-firebase/analytics';

const Events = {
  PlayMusic: 'AnalyticsEventPlayMusic',
  Search: 'AnalyticsEventSearch',
};
const TrackSources = {
  page: 'Page',
  search: 'Search',
  album: 'Album',
  playlist: 'Playlist',
  artist: 'Artist',
  deepLink: 'DeepLink',
  library: 'Library',
};

const PlayMusicAnalyticsHandler = (() => {
  let lastEventListId = null;
  let lastEventListType = null;
  let lastEventPageId = null;
  let seekedDuration = 0;
  let lastPosition = 0;
  const getPlayMusicParams = (id, title, duration, artistName, artistId) => ({
    ContentID: `${id}-${title}`,
    ContentSeconds: `${duration}`,
    ContentGenre: 'null',
    ContentArtist: `${artistId}-${artistName}`,
    ContentSource: `${lastEventListType}`,
    ListID: `${lastEventListId}`,
    PageID: `${lastEventPageId}`,
  });
  return {
    setLastEventListInfo: ({listId, listType, pageId}) => {
      lastEventListId = listId;
      lastEventListType = listType;
      lastEventPageId = pageId;
    },
    logEvent: ({track}) => {
      analytics().logEvent(
        Events.PlayMusic,
        getPlayMusicParams(
          track?.id,
          track?.name,
          track?.duration,
          track?.artists?.data?.[0]?.name,
          track?.artists?.data?.[0]?.id,
        ),
      );
    },
    setSeekedDuration: ({duration}) => {
      seekedDuration = seekedDuration + duration;
    },
    setLastPosition: ({position}) => {
      lastPosition = position;
    },
    getPlayedDuration: () => {
      return lastPosition + seekedDuration;
    },
    resetPlayState: () => {
      seekedDuration = 0;
      lastPosition = 0;
    },
  };
})();
const logSearchEvent = query => {
  analytics().logEvent(Events.Search, {
    SearchTerm: `${query}`,
  });
};
export {Events, logSearchEvent, TrackSources};
export default PlayMusicAnalyticsHandler;
