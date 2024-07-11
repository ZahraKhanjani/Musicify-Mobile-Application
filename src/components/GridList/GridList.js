import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import get from 'lodash/get';
import {connect} from 'react-redux';
import {minimizePlayer} from 'screens/Player/playerActions';
import {Playlist} from 'components/index';
import {ITEM_HEIGHTS} from 'theme/constants';

function GridList(props) {
  const artists = get(props, 'data.artists.data', []);
  const albums = get(props, 'data.albums.data', []);
  const playlists = get(props, 'data.playlists.data', []);
  const tracks = get(props, 'data.tracks.data', []);
  const showData = [...artists, ...albums, ...playlists, ...tracks];
  function renderItem({item}) {
    if (item.type === 'playlist') {
      return <Playlist playlist={item} showInfo={false} />;
    }
    return null;
  }
  function keyExtractor(item: Object, index: number) {
    return `${item.id}-${index}`;
  }

  const getItemLayout = (data, index) => ({
    length: ITEM_HEIGHTS.DEFAULT,
    offset: ITEM_HEIGHTS.DEFAULT * index,
    index,
  });
  return (
    <View style={styles.collection}>
      {/*{title && <Text style={styles.componentTitle}>{title}</Text>}*/}
      <FlatList
        getItemLayout={getItemLayout}
        data={showData}
        style={styles.list}
        renderItem={({item}) => (
          <View style={{margin: 8}}>{renderItem({item})}</View>
        )}
        // ListFooterComponent={listFooterComponent}
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
  componentTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    paddingLeft: 18,
    marginBottom: 18,
  },
  artistPicture: {
    height: 102,
    width: 166,
    borderRadius: 84,
  },
  artistName: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    color: 'white',
    maxWidth: 102,
    overflow: 'hidden',
  },
  playlistPicture: {
    height: 102,
    width: 166,
    borderRadius: 7,
  },
  playlistName: {
    textAlign: 'left',
    marginTop: 12,
    fontSize: 14,
    color: 'white',
    maxWidth: 102,
    overflow: 'hidden',
  },
  name: {
    textAlign: 'left',
    fontSize: 13,
    color: '#B3B3B3',
    maxWidth: 166,
    overflow: 'hidden',
  },
  trackPicture: {
    height: 102,
    width: 166,
    borderRadius: 7,
  },
  trackName: {
    textAlign: 'left',
    marginTop: 12,
    fontSize: 14,
    color: 'white',
    maxWidth: 166,
    overflow: 'hidden',
  },
  separator: {
    marginHorizontal: 9,
  },
});
export default connect(
  null,
  {minimizePlayer},
)(GridList);
