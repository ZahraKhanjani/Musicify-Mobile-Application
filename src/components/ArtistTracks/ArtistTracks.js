// @flow
// Artist.js
import React, {useReducer, useEffect} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, Loading, TopSongs} from 'components/index';
import LinearGradient from 'react-native-linear-gradient';
import Shuffle from 'icons/Shuffle';
import {setQueueAndShufflePlay} from 'screens/Player/NewPlayer';
import get from 'lodash/get';
import {ArtistApi} from 'api/index';
import NavigationService from 'navigation/NavigationService';
import {ScreensNames} from 'navigation/routeNames';
import {TrackSources} from 'utils/AnalyticsEvents';
const initialState = {
  isRequesting: false,
  tracks: [],
  error: '',
  totalPages: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case 'GET_TRACKS_REQ':
      return {
        ...state,
        isRequesting: true,
      };
    case 'GET_TRACKS_SUCCESS':
      return {
        ...state,
        isRequesting: false,
        tracks: action.data,
        totalPages: action.totalPages,
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
function ArtistTracks(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {artistId, artistName} = props;
  function getTracks() {
    dispatch({
      type: 'GET_TRACKS_REQ',
    });
    ArtistApi.getArtistTracks(artistId)
      .then(res => {
        dispatch({
          type: 'GET_TRACKS_SUCCESS',
          data: res.data.data,
          totalPages: get(res, 'data.meta.pagination.total_pages', 1),
        });
      })
      .catch(err => {
        console.log('this shit happended', err, artistId);
      });
  }
  function onSeeAll() {
    NavigationService.navigate(ScreensNames.SeeAll, {
      data: state.tracks,
      title: `${artistName} Songs`,
      tracksSubtitle: 'album',
      getList: ArtistApi.getArtistTracks,
      param: artistId,
      listId: `${artistId}-tracks`,
      totalPages: state.totalPages,
    });
  }

  useEffect(getTracks, [artistId]);
  return (
    <>
      <View
        style={{
          backgroundColor: 'transparent',
          top: -64,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            backgroundColor: 'transparent',
            textAlign: 'center',
            fontSize: 48,
            color: 'white',
          }}>
          {artistName}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setQueueAndShufflePlay(state.tracks, null, TrackSources.artist);
          }}>
          <LinearGradient
            start={{x: 0.0, y: 1.0}}
            end={{x: 1.0, y: 0.0}}
            colors={['#DB007C', '#FF3737']}
            style={{
              height: 48,
              marginVertical: 18,
              borderRadius: 24,
              paddingHorizontal: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Shuffle color="white" />
            <Text style={{fontSize: 15, color: 'white', marginLeft: 8}}>
              SHUFFLE PLAY
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {state.isRequesting ? (
        <View style={{marginVertical: 20, alignItems: 'center'}}>
          <Loading size={40} />
        </View>
      ) : (
        <TopSongs
          listId={`${artistId}-top-songs`}
          onSeeAll={onSeeAll}
          navigation={props.navigation}
          tracks={state.tracks.slice(0, 5)}
        />
      )}
    </>
  );
}

export default ArtistTracks;
