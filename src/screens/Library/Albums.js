//@flow
import React, {useEffect, useReducer} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import {Text, Loading, LibraryAlbum} from 'components/index';
import get from 'lodash/get';
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
    case 'GET_ALBUMS_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_ALBUMS__SUCCESS':
      return {
        ...state,
        isLoading: false,
        data: action.data,
      };
    case 'GET_ALBUMS__FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

function Albums(props: PropsType) {
  const {containerStyle} = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const {isLoading, data, error} = state;

  function getAlbums() {
    dispatch({type: 'GET_ALBUMS_REQUEST'});
    ProfileApi.getSavedAlbums()
      .then(res => {
        dispatch({
          type: 'GET_ALBUMS__SUCCESS',
          data: get(res, 'data.data', []),
        });
      })
      .catch(e => {
        dispatch({
          type: 'GET_ALBUMS__FAILURE',
          data: get(e, 'response.data.message', 'Something Went Wrong :('),
        });
      });
  }

  function renderItem({item}) {
    return (
      <Link
        routeName={ScreensNames.Album}
        params={{album: item.album}}
        style={styles.album}>
        <LibraryAlbum album={item.album} />
      </Link>
    );
  }
  useEffect(getAlbums, []);
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
          You haven't liked an album yet :)
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
  album: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
  },
  addNewText: {
    color: '#93959E',
    fontSize: 17,
    marginLeft: 12,
    alignSelf: 'center',
  },
  albumName: {
    color: 'white',
    fontSize: 17,
  },
  albumSubtitle: {
    color: '#C7C7C7',
    fontSize: 13,
  },
  albumInfo: {
    marginLeft: 12,
    alignSelf: 'center',
  },
  albumImage: {
    width: 75,
    height: 58,
    backgroundColor: '#2E3244',
    borderRadius: 7,
    justifyContent: 'center',
  },
});

export default Albums;
