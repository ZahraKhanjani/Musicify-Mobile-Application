/* eslint-disable react-hooks/exhaustive-deps */
// @flow
// Album.js
import React, {useReducer, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Animated,
} from 'react-native';
import get from 'lodash/get';
import concat from 'lodash/concat';
import FastImage from 'react-native-fast-image';
import {
  addSongsToQueue,
  setQueueAndPlay,
  setQueueAndShufflePlay,
} from '../Player/NewPlayer';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeArea} from 'react-native-safe-area-context';
import FavSwitch from '../Library/FavSwitch';
import {getAlbumTracks} from 'api/offlineModeMiddleware';
import {AlbumApi} from 'api/index';
import Link from 'navigation/Link';
import {ScreensNames} from 'navigation/routeNames';
import {
  Icon,
  ListDownloadSwitch,
  Loading,
  ListInfo,
  MovingText,
  Track,
  ScreenWrapper,
  PlayListButton,
  ShuffleButton,
} from 'components/index';
import {TrackSources} from 'utils/AnalyticsEvents';
const initialState = {
  album: {},
  isRequesting: false,
  isLoadingMore: false,
  tracks: [],
  error: '',
  currentPage: 0,
  totalPages: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case 'GET_ALBUM_INFO_REQ':
      return {
        ...state,
        isRequesting: true,
      };
    case 'GET_ALBUM_INFO_SUCCESS':
      return {
        ...state,
        isRequesting: false,
        album: action.data,
      };
    case 'GET_ALBUM_INFO_FAILURE':
      return {
        ...state,
        isRequesting: false,
        album: {},
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
function AlbumScreen(props) {
  const insets = useSafeArea();
  const scrollYِ = useRef(new Animated.Value(0)).current;
  const [state, dispatch] = useReducer(reducer, initialState);
  const {album, id} = props.route.params;
  const albumToUse = id ? state.album : album;
  const albumId = id || album.id;
  const backgroundColor = get(albumToUse, 'background_color', 'black');
  const name = get(albumToUse, 'name', 'Unknown');
  const artistsName = albumToUse?.artists
    ? albumToUse?.artists.data.map(artist => artist.name).join(', ')
    : 'Unknown';

  function getAlbumInfo() {
    dispatch({
      type: 'GET_ALBUM_INFO_REQ',
    });
    AlbumApi.getAlbum(id)
      .then(res => {
        dispatch({
          type: 'GET_ALBUM_INFO_SUCCESS',
          data: res.data,
        });
        getTracks();
      })
      .catch(err => {
        dispatch({
          type: 'GET_ALBUM_INFO_FAILURE',
        });
      });
  }

  function getTracks() {
    dispatch({
      type: 'GET_TRACKS_REQ',
    });
    getAlbumTracks(albumId)
      .then(res => {
        dispatch({
          type: 'GET_TRACKS_SUCCESS',
          data: res.data.data,
          currentPage: get(res, 'data.meta.pagination.current_page', 1),
          totalPages: get(res, 'data.meta.pagination.total_pages', 1),
        });
      })
      .catch(err => {});
  }
  function renderTrack({item}) {
    return (
      <TouchableOpacity
        key={item.id}
        onPress={() => {
          setQueueAndPlay(state.tracks, item.id, albumId, TrackSources.album);
        }}>
        <Track viewType="list" showMoreIcon track={item} subtitle="artist" />
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
      getAlbumTracks(albumId, state.currentPage + 1)
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
      getAlbumInfo();
    } else {
      getTracks();
    }
  }, [album, id]);
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
            uri: get(albumToUse, 'image.medium.url', ''),
          }}
          style={styles.artistImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <Text style={styles.artistName}>{name}</Text>
        <Link
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 12,
          }}
          routeName={ScreensNames.Artist}
          params={{artist: albumToUse?.artists?.data[0]}}>
          <View
            style={{
              maxWidth: 200,
              justifyContent: 'center',
              alignSelf: 'center',
              alignContent: 'center',
            }}>
            <MovingText
              text={`Album By ${artistsName}`}
              style={{
                fontSize: 15,
                color: 'white',
              }}
            />
          </View>
        </Link>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
            marginTop: 16,
            justifyContent: 'space-between',
          }}>
          <ListInfo
            duration={get(albumToUse, 'duration', 0)}
            trackCounts={get(albumToUse, 'tracks_count', 0)}
          />
          <FavSwitch
            style={{alignSelf: 'center'}}
            item={albumToUse}
            type="album"
          />
        </View>
        <View style={{flexDirection: 'row', padding: 16}}>
          <PlayListButton
            navigation={props.navigation}
            listId={albumId}
            tracks={state.tracks}
          />
          <ShuffleButton
            onPress={() => {
              setQueueAndShufflePlay(state.tracks, albumId, TrackSources.album);
            }}
            containerStyle={{}}
          />
          <ListDownloadSwitch
            style={{alignSelf: 'center', position: 'absolute', right: 16}}
            listInfo={albumToUse}
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
  artistImage: {
    width: 183,
    height: 183,
    borderRadius: 7,
    alignSelf: 'center',
  },
  artistName: {
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});
export default AlbumScreen;
