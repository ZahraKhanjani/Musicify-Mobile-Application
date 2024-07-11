//@flow
import React, {useEffect, useReducer} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Text, Loading} from 'components/index';
import get from 'lodash/get';
import FastImage from 'react-native-fast-image';
import {ProfileApi} from 'api/index';
import Link from 'navigation/Link';
import {ScreensNames} from 'navigation/routeNames';

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
    case 'GET_ARTISTS_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_ARTISTS__SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.data,
      };
    case 'GET_ARTISTS__FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

function Artists(props: PropsType) {
  const {containerStyle} = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const {isLoading, data} = state;

  function getArtists() {
    dispatch({type: 'GET_ARTISTS_REQUEST'});
    ProfileApi.getSavedArtists()
      .then(res => {
        dispatch({
          type: 'GET_ARTISTS__SUCCESS',
          data: get(res, 'data.data', []),
        });
      })
      .catch(e => {
        dispatch({
          type: 'GET_ARTISTS__FAILURE',
          data: get(e, 'response.data.message', 'Something Went Wrong :('),
        });
      });
  }

  function renderItem({item}) {
    return (
      <Link
        routeName={ScreensNames.Artist}
        params={{artist: item.artist}}
        style={styles.artist}>
        <FastImage
          source={{
            uri: get(item, 'artist.image.medium.url', ''),
          }}
          style={styles.artistImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.artistInfo}>
          <Text style={styles.artistName}>
            {get(item, 'artist.name', 'Unknown')}
          </Text>
        </View>
      </Link>
    );
  }

  useEffect(getArtists, []);
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
          You haven't followed an artist yet :)
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: 'transparent',
  },
  artist: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  artistName: {
    color: 'white',
    fontSize: 17,
  },
  artistInfo: {
    marginLeft: 12,
    alignSelf: 'center',
  },
  artistImage: {
    width: 73,
    height: 73,
    backgroundColor: '#2E3244',
    borderRadius: 36.5,
    justifyContent: 'center',
  },
});

export default Artists;
