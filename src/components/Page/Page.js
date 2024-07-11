/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';
import get from 'lodash/get';

import {connect} from 'react-redux';
import {AppApi} from 'api/index';
import {ListCollection, RowList, GridList, Loading} from 'components/index';
import {setPageData} from './pageActions';
import {useSafeArea} from 'react-native-safe-area-context';
import {BOTTOM_TAB_HEIGHT, MINIMIZED_PLAYER_HEIGHT} from 'theme/constants';
type PropsType = {
  page: string,
  navigation: any,
  setPageData: Function,
  pages: Object,
  offlineMode: boolean,
  style?: Object,
};
function Page(props: PropsType) {
  const insets = useSafeArea();
  const pagesID = {
    home: 'PAGE_HOME_ID',
    search: 'PAGE_SEARCH_ID',
    playlist: 'PAGE_PLAYLIST_ID',
  };
  const pageId = get(props, ['initInfo', pagesID[props.page]], '');
  const data = props.pages[props.page];
  function renderCollection({item}) {
    switch (item.view_type) {
      case 'LIST':
      case 'LIST_LARGE':
        return <ListCollection navigation={props.navigation} data={item} />;
      case 'ROW_LIST':
        return <RowList navigation={props.navigation} data={item} />;
      case 'GRID_LIST':
      case 'GRID_LIST_LARGE':
        return <GridList navigation={props.navigation} data={item} />;
      default:
        return <ListCollection navigation={props.navigation} data={item} />;
    }
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getPageData() {
    AppApi.getPage(pageId)
      .then(res => {
        props.setPageData(props.page, get(res, 'data.collections.data', []));
      })
      .catch(e => {
        console.log({e});
      });
  }
  function keyExtractor(item: Object) {
    return `${props.page}-${item.id}`;
  }
  useEffect(getPageData, []);
  return (
    <View style={{paddingBottom: insets.bottom}}>
      {!data?.length ? (
        <View style={{marginTop: 200, alignItems: 'center'}}>
          <Loading size={50} />
        </View>
      ) : (
        <FlatList
          style={props.style || {}}
          keyExtractor={keyExtractor}
          data={data}
          renderItem={renderCollection}
          ListFooterComponent={
            <View
              style={{height: BOTTOM_TAB_HEIGHT + MINIMIZED_PLAYER_HEIGHT}}
            />
          }
        />
      )}
    </View>
  );
}

function mapStateToProps(state) {
  return {
    initInfo: state.auth.initInfo,
    pages: state.pages,
    offlineMode: state.general.offlineMode,
  };
}

export default connect(
  mapStateToProps,
  {setPageData},
)(Page);
