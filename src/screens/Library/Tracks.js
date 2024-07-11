//@flow
import React, {useEffect, useReducer} from 'react';
import {StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import {Text, Track, Loading} from 'components/index';
import get from 'lodash/get';
import {setQueueAndPlay} from '../Player/NewPlayer';
import {ProfileApi} from 'api/index';
import {TrackSources} from 'utils/AnalyticsEvents';

type PropsType = {
  navigation: any,
};

const initialState = {
  isLoading: false,
  data: [],
  error: false,
};
function reducer(state, action) {
  switch (action.type) {
    case 'GET_TRACKS_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_TRACKS__SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.data,
      };
    case 'GET_TRACKS__FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

function Tracks(props: PropsType) {
  const {containerStyle} = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const {isLoading, data, error} = state;

  function getTracks() {
    dispatch({type: 'GET_TRACKS_REQUEST'});
    ProfileApi.getSavedTracks()
      .then(res => {
        dispatch({
          type: 'GET_TRACKS__SUCCESS',
          data: get(res, 'data.data', []),
        });
      })
      .catch(e => {
        dispatch({
          type: 'GET_TRACKS__FAILURE',
          data: get(e, 'response.data.message', 'Something Went Wrong :('),
        });
      });
  }

  function renderItem({item}) {
    return (
      <TouchableOpacity onPress={playTrack(item.track)}>
        <Track
          viewType="list"
          showMoreIcon={false}
          track={item.track}
          subtitle="artist"
        />
      </TouchableOpacity>
    );
  }

  function playTrack(track) {
    return function() {
      setQueueAndPlay(
        data.map(item => item.track),
        track.id,
        'library-tracks',
        TrackSources.library,
      );
    };
  }
  useEffect(getTracks, []);
  return (
    <View style={[styles.container, containerStyle || {}]}>
      {isLoading ? (
        <View style={{marginTop: 32, alignItems: 'center'}}>
          <Loading size={40} />
        </View>
      ) : data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          ListFooterComponent={<View style={{height: 100}} />}
        />
      ) : (
        <Text
          style={{
            fontSize: 16,
            color: 'grey',
            textAlign: 'center',
            margin: 16,
          }}>
          You haven't liked a track yet :)
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  addNewText: {
    color: '#93959E',
    fontSize: 17,
    marginLeft: 12,
    alignSelf: 'center',
  },
  trackName: {
    color: 'white',
    fontSize: 17,
  },
  trackSubtitle: {
    color: '#C7C7C7',
    fontSize: 13,
  },
  trackInfo: {
    marginLeft: 12,
    alignSelf: 'center',
  },
  trackImage: {
    width: 75,
    height: 58,
    backgroundColor: '#2E3244',
    borderRadius: 7,
    justifyContent: 'center',
  },
});

export default Tracks;
