import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import get from 'lodash/get';
import {connect} from 'react-redux';
import {minimizePlayer} from 'screens/Player/playerActions';
import {Playlist} from 'components/index';
import {ITEM_HEIGHTS} from 'theme/constants';

function GridListLarge(props) {
  const artists = get(props, 'data.artists.data', []);
  const albums = get(props, 'data.albums.data', []);
  const playlists = get(props, 'data.playlists.data', []);
  const tracks = get(props, 'data.tracks.data', []);
  const showData = [...artists, ...albums, ...playlists, ...tracks];
  function renderItem({item}) {
    if (item.type === 'playlist') {
      return <Playlist playlist={item} showInfo={false} size="large" />;
    }
    return null;
  }
  function itemSeparatorComponent() {
    return <View style={styles.separator} />;
  }
  function listFooterComponent() {
    return <View style={styles.last} />;
  }
  function keyExtractor(item: Object, index: number) {
    return `${item.id}-${index}`;
  }
  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHTS.LARGE,
    offset: ITEM_HEIGHTS.LARGE * index,
    index,
  });
  return (
    <View style={styles.collection}>
      <FlatList
        getItemLayout={getItemLayout}
        ItemSeparatorComponent={itemSeparatorComponent}
        data={showData}
        style={styles.list}
        renderItem={renderItem}
        ListFooterComponent={listFooterComponent}
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  collection: {
    width: '100%',
    marginBottom: 16,
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  last: {
    marginRight: 32,
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'left',
  },
  artistPicture: {
    height: 166,
    width: 199,
    borderRadius: 84,
  },
  artistName: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    color: 'white',
    maxWidth: 166,
    overflow: 'hidden',
  },
  playlistPicture: {
    height: 166,
    width: 199,
    borderRadius: 7,
  },
  playlistName: {
    textAlign: 'left',
    marginTop: 12,
    fontSize: 14,
    color: 'white',
    maxWidth: 166,
    overflow: 'hidden',
  },
  name: {
    textAlign: 'left',
    fontSize: 13,
    color: '#B3B3B3',
    maxWidth: 199,
    overflow: 'hidden',
  },
  trackPicture: {
    height: 166,
    width: 199,
    borderRadius: 7,
  },
  trackName: {
    textAlign: 'left',
    marginTop: 12,
    fontSize: 14,
    color: 'white',
    maxWidth: 199,
    overflow: 'hidden',
  },
  separator: {
    marginHorizontal: 9,
  },
});
export default connect(
  null,
  {minimizePlayer},
)(GridListLarge);
