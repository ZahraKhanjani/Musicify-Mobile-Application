// @flow
// Artist.js
import React, {useReducer, useEffect} from 'react';
import {View} from 'react-native';
import {ArtistApi} from 'api/index';
import {TopAlbums} from 'components/index';
import get from 'lodash/get';
import NavigationService from 'navigation/NavigationService';
import {ScreensNames} from 'navigation/routeNames';
const initialState = {
  isRequesting: false,
  albums: [],
  error: '',
  totalPages: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case 'GET_ALBUMS_REQ':
      return {
        ...state,
        isRequesting: true,
      };
    case 'GET_ALBUMS_SUCCESS':
      return {
        ...state,
        isRequesting: false,
        albums: action.data,
        totalPages: action.totalPages,
      };
    case 'GET_ALBUMS_ERROR':
      return {
        ...state,
        isRequesting: false,
        error: action.error,
      };
    default:
      return state;
  }
}
function ArtistAlbums(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {artistId, artistName} = props;
  function getAlbums() {
    dispatch({
      type: 'GET_ALBUMS_REQ',
    });
    ArtistApi.getArtistAlbums(artistId)
      .then(res => {
        dispatch({
          type: 'GET_ALBUMS_SUCCESS',
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
      data: state.albums,
      title: `${artistName} Albums`,
      getList: ArtistApi.getArtistAlbums,
      param: artistId,
      totalPages: state.totalPages,
    });
  }

  useEffect(getAlbums, [artistId]);
  return state.isRequesting || state.albums.length === 0 ? (
    <View />
  ) : (
    <TopAlbums
      onSeeAll={onSeeAll}
      navigation={props.navigation}
      albums={state.albums.slice(0, 3)}
    />
  );
}

export default ArtistAlbums;
