/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useReducer, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import get from 'lodash/get';
import concat from 'lodash/concat';
import {useSafeArea} from 'react-native-safe-area-context';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Animated,
} from 'react-native';
import {
  addSongsToQueue,
  setQueueAndPlay,
  setQueueAndShufflePlay,
} from '../Player/NewPlayer';
import FastImage from 'react-native-fast-image';
import FavSwitch from '../Library/FavSwitch';
import {PlaylistApi} from 'api/index';
import {getPlaylistTracks} from 'api/offlineModeMiddleware';
import {
  Icon,
  Loading,
  Track,
  ListInfo,
  ShuffleButton,
  PlayListButton,
  ListDownloadSwitch,
  ScreenWrapper,
} from 'components/index';
import {TrackSources} from 'utils/AnalyticsEvents';
const initialState = {
  playlist: {},
  isRequesting: false,
  isLoadingMore: false,
  tracks: [],
  error: '',
  currentPage: 0,
  totalPages: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case 'GET_PLAYLIST_INFO_REQ':
      return {
        ...state,
        isRequesting: true,
      };
    case 'GET_PLAYLIST_INFO_SUCCESS':
      return {
        ...state,
        isRequesting: false,
        playlist: action.data,
      };
    case 'GET_PLAYLIST_INFO_ERROR':
      return {
        ...state,
        isRequesting: false,
      };
    case 'GET_TRACKS_REQ':
      return {
        ...state,
        isRequesting: true,
        tracks: [],
      };
    case 'GET_MORE_TRACKS_REQ':
      return {
        ...state,
        isLoadingMore: true,
      };
    case 'GET_TRACKS_SUCCESS':
      return {
        ...state,
        isRequesting: false,
        tracks: action.data,
        currentPage: action.currentPage,
        totalPages: action.totalPages,
      };
    case 'GET_MORE_TRACKS_SUCCESS':
      return {
        ...state,
        isLoadingMore: false,
        tracks: concat(state.tracks, action.data),
        currentPage: action.currentPage,
      };
    case 'GET_TRACKS_ERROR':
      return {
        ...state,
        isRequesting: false,
        error: action.error,
      };
    default:
      return state;
  }
}

function PlaylistScreen(props) {
  const insets = useSafeArea();

  const scrollYِ = useRef(new Animated.Value(0)).current;
  const [state, dispatch] = useReducer(reducer, initialState);
  const {playlist, id} = props.route.params;
  const playlistToUse = id ? state.playlist : playlist;
  const playlistId = id || playlist?.id;
  const backgroundColor = get(playlistToUse, 'background_color', 'black');
  const name = get(playlistToUse, 'name', 'Unknown');
  function getPlaylistInfo() {
    dispatch({
      type: 'GET_PLAYLIST_INFO_REQ',
    });
    PlaylistApi.getPlaylist(playlistId)
      .then(res => {
        dispatch({
          type: 'GET_PLAYLIST_INFO_SUCCESS',
          data: res?.data,
        });
        getTracks();
      })
      .catch(e => {
        dispatch({
          type: 'GET_PLAYLIST_INFO_ERROR',
        });
        //todo
        console.log('playlist error');
        console.log({e});
      });
  }
  function getTracks() {
    dispatch({
      type: 'GET_TRACKS_REQ',
    });
    getPlaylistTracks(playlistId)
      .then(res => {
        dispatch({
          type: 'GET_TRACKS_SUCCESS',
          data: get(res, 'data.data', []),
          currentPage: get(res, 'data.meta.pagination.current_page', 1),
          totalPages: get(res, 'data.meta.pagination.total_pages', 1),
        });
      })
      .catch(e => {
        //todo
        console.log('playlist error');
        console.log({e});
      });
  }
  function renderTrack({item}) {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          setQueueAndPlay(
            state.tracks,
            item.id,
            playlistId,
            TrackSources.playlist,
          );
        }}>
        <Track viewType="list" showMoreIcon subtitle="artist" track={item} />
      </TouchableOpacity>
    );
  }
  const notchOpacity = scrollYِ.interpolate({
    inputRange: [0, 300],
    outputRange: [0, 0.6],
  });
  function loadMore() {
    if (
      !state.isRequesting &&
      !state.isLoadingMore &&
      state.totalPages > 1 &&
      state.currentPage !== state.totalPages
    ) {
      dispatch({
        type: 'GET_MORE_TRACKS_REQ',
      });
      getPlaylistTracks(playlistId, state.currentPage + 1)
        .then(res => {
          dispatch({
            type: 'GET_MORE_TRACKS_SUCCESS',
            data: res?.data?.data,
            currentPage: get(res, 'data.meta.pagination.current_page', 1),
          });
          addSongsToQueue(res?.data?.data);
        })
        .catch(err => {});
    }
  }
  useEffect(() => {
    if (id) {
      getPlaylistInfo();
    } else {
      getTracks();
    }
  }, [playlist]);
  return (
    <ScreenWrapper>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: insets.top,
          backgroundColor: 'rgba(20, 25, 45, 1)',
          opacity: notchOpacity,
          zIndex: 1000,
        }}
      />
      <LinearGradient
        colors={[backgroundColor, 'rgba(20, 25, 45, 1)']}
        start={{x: 0.0, y: 0.0}}
        end={{x: 0.25, y: 0.75}}
        style={{
          flex: 1,
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
      />
      <ScrollView
        scrollEventThrottle={1}
        onScroll={Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollYِ,
              },
            },
          },
        ])}
        style={{
          backgroundColor: 'transparent',
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}>
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: 'row',
            alignItems: 'center',
            height: 64,
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack(null);
            }}>
            <Icon name="chevron-left" size={32} color="white" />
          </TouchableOpacity>
          {/*<TouchableOpacity style={{position: 'absolute', right: 16}}>*/}
          {/*  <MoreHoriz />*/}
          {/*</TouchableOpacity>*/}
        </View>
        <FastImage
          source={{
            uri: get(playlistToUse, 'image.medium.url', ''),
          }}
          style={styles.playlistImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.playlistName}>{name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 12,
          }}>
          <Text style={{fontSize: 15, color: '#C7C7C7'}}>{'Created by '}</Text>
          <Text style={{fontSize: 15, color: 'white'}}>{'Musicify'}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            marginTop: 16,
            justifyContent: 'space-between',
          }}>
          <ListInfo
            duration={get(playlistToUse, 'duration', 0)}
            trackCounts={get(playlistToUse, 'tracks_count', 0)}
          />
          <FavSwitch
            style={{alignSelf: 'center'}}
            item={playlistToUse}
            type="playlist"
          />
        </View>

        <View style={{flexDirection: 'row', padding: 16, marginTop: 16}}>
          <PlayListButton
            tracks={state.tracks}
            listId={playlistId}
            navigation={props.navigation}
          />
          <ShuffleButton
            onPress={() => {
              setQueueAndShufflePlay(
                state.tracks,
                playlistId,
                TrackSources.playlist,
              );
            }}
            containerStyle={{}}
          />
          <ListDownloadSwitch
            style={{alignSelf: 'center', position: 'absolute', right: 16}}
            listInfo={playlistToUse}
            listTracks={state.tracks}
          />
        </View>
        {state.isRequesting ? (
          <View style={{marginTop: 32, alignItems: 'center'}}>
            <Loading size={40} />
          </View>
        ) : (
          <FlatList
            data={state.tracks}
            renderItem={renderTrack}
            ListFooterComponent={<View style={{height: 100}} />}
            onEndReached={loadMore}
          />
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  playlistImage: {
    width: 183,
    height: 183,
    borderRadius: 7,
    alignSelf: 'center',
  },
  playlistName: {
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PlaylistScreen;
