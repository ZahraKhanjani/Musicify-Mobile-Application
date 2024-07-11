// @flow
import React, {useReducer} from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {
  ListItem,
  SearchBar,
  Loading,
  Track,
  SearchHistory,
} from 'components/index';
import SearchIcon from 'icons/SearchIcon';
import slice from 'lodash/slice';
import get from 'lodash/get';
import {setQueueAndPlay} from 'screens/Player/NewPlayer';
import {connect} from 'react-redux';
import {minimizePlayer} from 'screens/Player/playerActions';
import {addToSearchHistory} from 'screens/Search/searchActions';
import FastImage from 'react-native-fast-image';
import axios from 'axios';
import Link from 'navigation/Link';
import {ScreensNames} from 'navigation/routeNames';
import NavigationService from 'navigation/NavigationService';
import {AppApi} from 'api/index';
import {logSearchEvent, TrackSources} from 'utils/AnalyticsEvents';

type PropsType = {
  deactiveSearchMode: Function,
  addToSearchHistory: Function,
  navigation: any,
};

const initialState = {
  query: '',
  isSearching: false,
  results: [],
  error: '',
  lastTimeOut: null,
  lastRequest: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_LAST_REQUEST':
      return {
        ...state,
        lastRequest: action.data,
      };
    case 'SET_LAST_TIME_OUT':
      return {
        ...state,
        lastTimeOut: action.data,
      };
    case 'SET_QUERY':
      return {
        ...state,
        query: action.data,
      };
    case 'SEARCH_QUERY_REQ':
      return {
        ...state,
        isSearching: true,
        results: [],
        query: action.query,
      };
    case 'SEARCH_QUERY_SUCCESS':
      return {
        ...state,
        isSearching: false,
        results: action.data,
      };
    case 'SEARCH_QUERY_ERROR':
      return {
        ...state,
        isSearching: false,
        error: action.error,
      };
    default:
      return state;
  }
}
function SearchFormScreen(props: PropsType) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {isSearching, lastTimeOut, lastRequest, results, query} = state;
  const artistsData = get(results, 'artists.data', []);
  const tracksData = get(results, 'tracks.data', []);
  const albumsData = get(results, 'albums.data', []);
  const playlistsData = get(results, 'playlists.data', []);

  function deactiveSearchMode() {
    if (lastTimeOut) {
      clearTimeout(lastTimeOut);
    }
    if (lastRequest) {
      lastRequest.cancel();
    }
    props.deactiveSearchMode();
  }

  function searchQuery(query, cancelToken) {
    AppApi.searchQuery(query, cancelToken)
      .then(res => {
        logSearchEvent(query);
        dispatch({
          type: 'SEARCH_QUERY_SUCCESS',
          data: res.data,
        });
      })
      .catch(err => {});
  }

  function updateQuery(data) {
    dispatch({
      type: 'SEARCH_QUERY_REQ',
      query: data,
    });
    if (lastTimeOut) {
      clearTimeout(lastTimeOut);
    }
    if (lastRequest) {
      lastRequest.cancel();
    }
    if (data) {
      const timeOut = setTimeout(function() {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        dispatch({
          type: 'SET_LAST_REQUEST',
          data: source,
        });
        searchQuery(data, source.token);
      }, 800);
      dispatch({
        type: 'SET_LAST_TIME_OUT',
        data: timeOut,
      });
    }
  }

  function isResultsEmpty() {
    return (
      artistsData.length +
        tracksData.length +
        albumsData.length +
        playlistsData.length ===
      0
    );
  }

  function renderTrack({item}) {
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.track}
        onPress={() => {
          setQueueAndPlay(
            tracksData,
            item.id,
            `${query}-tracks`,
            TrackSources.search,
            null,
          );
        }}>
        <Track viewType="searchList" track={item} />
      </TouchableOpacity>
    );
  }
  function renderArtist({item}) {
    return (
      <Link
        key={item.id}
        style={styles.track}
        routeName={ScreensNames.Artist}
        params={{artist: item}}>
        <ListItem
          containerStyle={{
            backgroundColor: 'transparent',
            paddingHorizontal: 0,
          }}
          leftAvatar={{
            // ImageComponent: FastImage,
            source: {uri: get(item, 'image.medium.url', '')},
            containerStyle: {
              height: 55,
              width: 55,
              borderRadius: 27.5,
              overflow: 'hidden',
            },
          }}
          titleStyle={{color: 'white', fontSize: 17, lineHeight: 22}}
          titleProps={{numberOfLines: 1}}
          title={get(item, 'name', 'Unknown')}
          subtitle="Artist"
          subtitleProps={{numberOfLines: 1}}
          subtitleStyle={{fontSize: 13, color: '#C7C7C7', marginTop: 6}}
        />
      </Link>
    );
  }

  function renderAlbum({item}) {
    const artistsName = item.artists
      ? item.artists.data.map(artist => artist.name).join(', ')
      : 'Unknown';
    return (
      <Link
        routeName={ScreensNames.Album}
        params={{album: item}}
        key={item.id}
        style={styles.album}>
        <FastImage
          source={{
            uri: get(item, 'image.medium.url', ''),
          }}
          style={styles.albumPicture}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text numberOfLines={1} style={styles.albumName}>
          {get(item, 'name', '')}
        </Text>
        <Text numberOfLines={1} style={styles.albumArtist}>
          {artistsName}
        </Text>
      </Link>
    );
  }
  function renderAlbumsList({item}) {
    function separator() {
      return <View style={{marginHorizontal: 8}} />;
    }
    return (
      item.length > 0 && (
        <View>
          <Text style={styles.listTitle}>Albums</Text>
          <FlatList
            data={item}
            horizontal
            renderItem={renderAlbum}
            ItemSeparatorComponent={separator}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )
    );
  }
  function renderPlaylist({item}) {
    return (
      <Link
        routeName={ScreensNames.Playlist}
        params={{playlist: item}}
        key={item.id}
        style={styles.playlist}>
        <FastImage
          source={{
            uri: get(item, 'image.medium.url', ''),
          }}
          style={styles.playlistPicture}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text numberOfLines={1} style={styles.playlistName}>
          {get(item, 'name', '')}
        </Text>
      </Link>
    );
  }
  function renderPlaylistsList({item}) {
    function separator() {
      return <View style={{marginHorizontal: 8}} />;
    }
    return (
      item.length > 0 && (
        <View>
          <Text style={styles.listTitle}>Playlists</Text>
          <FlatList
            data={item}
            horizontal
            renderItem={renderPlaylist}
            ItemSeparatorComponent={separator}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )
    );
  }

  const sections = [
    {
      data: slice(artistsData, 0, 3),
      key: 'artistsSection',
      renderItem: renderArtist,
    },
    {
      data: slice(tracksData, 0, 6),
      key: 'tracksSection',
      renderItem: renderTrack,
      ItemSeparatorComponent: () => (
        <View
          style={{
            borderTopColor: '#181F3B',
            borderTopWidth: 1,
          }}
        />
      ),
    },
    {
      data: [slice(albumsData, 0, 6)],
      key: 'albumsSection',
      renderItem: renderAlbumsList,
    },
    {
      data: [slice(playlistsData, 0, 6)],
      key: 'playlistsSection',
      renderItem: renderPlaylistsList,
    },
  ];

  function onSeeAll(type) {
    const typedData = {
      Artists: artistsData,
      Albums: albumsData,
      Tracks: tracksData,
      Playlists: playlistsData,
    };
    return function onPressSeeAll() {
      NavigationService.navigate(ScreensNames.SeeAll, {
        data: typedData[type],
        title: `"${query}" in ${type}`,
        listId: `${query}-tracks`,
      });
    };
  }

  function generateSeeAllLinks(data) {
    if (!data.trailingItem) {
      if (data.section.key === 'artistsSection') {
        return artistsData.length > 3 ? (
          <TouchableOpacity
            onPress={onSeeAll('Artists')}
            style={styles.seeAllLink}>
            <Text style={styles.seeAllLinkText}>See All Artists ></Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.seeAllLink} />
        );
      }
      if (data.section.key === 'tracksSection') {
        return tracksData.length > 6 ? (
          <TouchableOpacity
            onPress={onSeeAll('Tracks')}
            style={styles.seeAllLink}>
            <Text style={styles.seeAllLinkText}>See All Tracks ></Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.seeAllLink} />
        );
      }
      if (data.section.key === 'albumsSection') {
        return albumsData.length > 6 ? (
          <TouchableOpacity
            onPress={onSeeAll('Albums')}
            style={[styles.seeAllLink, {marginTop: 8}]}>
            <Text style={styles.seeAllLinkText}>See All Albums ></Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.seeAllLink} />
        );
      }
      if (data.section.key === 'playlistsSection') {
        return playlistsData.length > 6 ? (
          <TouchableOpacity
            onPress={onSeeAll('Playlists')}
            style={[styles.seeAllLink, {marginTop: 8}]}>
            <Text style={styles.seeAllLinkText}>See All Playlists ></Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.seeAllLink} />
        );
      }
    }
    return null;
  }
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <SearchBar
          onSubmitEditing={() => {
            props.addToSearchHistory(query);
            searchQuery(query);
          }}
          onChangeText={updateQuery}
          value={query}
        />
        <TouchableOpacity onPress={deactiveSearchMode}>
          <Text style={styles.cancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultsContainer}>
        {query ? (
          <>
            {isResultsEmpty() ? (
              <>
                {isSearching ? (
                  <View style={{marginTop: 32, alignItems: 'center'}}>
                    <Loading size={40} />
                  </View>
                ) : (
                  <Text
                    style={{
                      marginTop: 32,
                      textAlign: 'center',
                      fontSize: 14,
                      color: 'white',
                    }}>
                    We're so sorry.. there isn't anything to show :(
                  </Text>
                )}
              </>
            ) : (
              <SectionList
                showsVerticalScrollIndicator={false}
                sections={sections}
                SectionSeparatorComponent={generateSeeAllLinks}
              />
            )}
          </>
        ) : (
          <SearchHistory
            onSearch={item => {
              dispatch({
                type: 'SET_QUERY',
                data: item,
              });
              searchQuery(item);
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cancel: {
    fontSize: 18,
    color: '#C7C7C7',
    marginLeft: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  track: {
    height: 80,
  },
  songName: {
    textAlign: 'center',
  },
  seeAllLink: {
    flexDirection: 'row',
    marginBottom: 36,
  },
  seeAllLinkText: {
    color: '#F82B46',
    fontSize: 13,
  },

  albumPicture: {
    height: 145,
    width: 145,
    borderRadius: 7,
  },
  albumName: {
    textAlign: 'left',
    marginTop: 12,
    fontSize: 14,
    color: 'white',
    maxWidth: 125,
    overflow: 'hidden',
  },
  albumArtist: {
    textAlign: 'left',
    fontSize: 14,
    color: '#B3B3B3',
    maxWidth: 125,
    overflow: 'hidden',
  },
  playlistPicture: {
    height: 114,
    width: 145,
    borderRadius: 7,
  },
  playlistName: {
    textAlign: 'left',
    marginTop: 12,
    fontSize: 14,
    color: 'white',
    maxWidth: 125,
    overflow: 'hidden',
  },
  listTitle: {
    fontSize: 21,
    color: 'white',
    marginBottom: 21,
  },
});

export default connect(
  null,
  {minimizePlayer, addToSearchHistory},
)(SearchFormScreen);
