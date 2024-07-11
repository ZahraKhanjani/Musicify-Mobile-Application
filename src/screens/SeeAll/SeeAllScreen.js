import React, {useReducer, useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigationState} from '@react-navigation/native';
import {useSafeArea} from 'react-native-safe-area-context';
import homeBg from 'assets/homeBg.png';
import {Icon, ScreenWrapper, Album, Artist, Track} from 'components/index';
import get from 'lodash/get';
import {addSongsToQueue, setQueueAndPlay, setUpcomingSongs} from '../Player/NewPlayer';
import concat from 'lodash/concat';
import axios from 'axios';
const initialState = {
  isLoadingMore: false,
  data: [],
  error: '',
  currentPage: 1,
  totalPages: 1,
};
function reducer(state, action) {
  switch (action.type) {
    case 'GET_MORE_REQ':
      return {
        ...state,
        isLoadingMore: true,
      };
    case 'GET_MORE_SUCCESS':
      return {
        ...state,
        isLoadingMore: false,
        data: concat(state.data, action.data),
        currentPage: action.currentPage,
      };
    case 'GET_ERROR':
      return {
        ...state,
        isRequesting: false,
        error: action.error,
      };
    case 'LOAD_DATA':
      return {
        ...initialState,
        data: action.data,
        totalPages: action.totalPages,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
function SeeAllScreen(props) {
  const insets = useSafeArea();
  const navigationState = useNavigationState(state => state);
  const routesLength = navigationState?.routes?.length || 0;
  const routeName = get(
    navigationState,
    ['routes', routesLength - 2, 'name'],
    '',
  );
  const {
    data,
    title,
    tracksSubtitle,
    getList,
    param,
    totalPages,
    listId = null,
  } = props?.route?.params;
  const [lastRequest, setLastRequest] = useState(null);
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    data,
    totalPages: totalPages || 1,
  });
  function keyExtractor(item: Object) {
    return `${item.id}`;
  }
  function renderItem({item}) {
    switch (item.type) {
      case 'artist':
        return <Artist artist={item} key={item.id} view="row" />;
      case 'album':
        return <Album album={item} viewType="row" />;
      case 'track':
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              setQueueAndPlay(state.data, item.id, listId, routeName);
            }}>
            <Track
              viewType="list"
              showMoreIcon
              track={item}
              subtitle={tracksSubtitle || 'artist'}
            />
          </TouchableOpacity>
        );
      default:
        return null;
    }
  }
  function loadMore() {
    if (
      !!getList &&
      !!param &&
      !state.isLoadingMore &&
      state.totalPages > 1 &&
      state.currentPage !== state.totalPages
    ) {
      dispatch({
        type: 'GET_MORE_REQ',
      });
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      setLastRequest(source);
      getList(param, state.currentPage + 1, source.token)
        .then(res => {
          dispatch({
            type: 'GET_MORE_SUCCESS',
            data: res?.data?.data,
            currentPage: get(res, 'data.meta.pagination.current_page', 1),
          });
          addSongsToQueue(res?.data?.data);
        })
        .catch(err => {});
    }
  }
  useEffect(() => {
    dispatch({
      type: 'LOAD_DATA',
      data,
      totalPages: totalPages || 1,
    });
  }, [data, totalPages]);
  return (
    <ScreenWrapper>
      <ImageBackground
        source={homeBg}
        style={[styles.container, {paddingTop: insets.top}]}>
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'center',
            alignItems: 'center',
            height: 64,
          }}>
          <Text style={{fontSize: 18, color: 'white'}}>{title || ''}</Text>
          <TouchableOpacity
            style={{position: 'absolute', right: 16}}
            onPress={() => {
              if (lastRequest) {
                lastRequest.cancel();
              }
              props.navigation.goBack(null);
            }}>
            <Icon name="chevron-left" size={32} color="white" />
          </TouchableOpacity>
        </View>
        <FlatList
          keyExtractor={keyExtractor}
          data={state.data}
          renderItem={renderItem}
          ListFooterComponent={<View style={{height: 64}} />}
          onEndReached={loadMore}
        />
      </ImageBackground>
    </ScreenWrapper>
  );
}
const styles = StyleSheet.create({
  fullWidth: {
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 18,
  },
});

export default SeeAllScreen;
