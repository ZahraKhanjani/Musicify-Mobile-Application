import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, PageList, ListLarge} from 'components/index';
import get from 'lodash/get';

function ListCollection(props) {
  const title = get(props, 'data.name', '');
  const id = get(props, 'data.id', null);
  const viewType = get(props, 'data.view_type', 'LIST');
  const artists = get(props, 'data.artists.data', []);
  const albums = get(props, 'data.albums.data', []);
  const playlists = get(props, 'data.playlists.data', []);
  const tracks = get(props, 'data.tracks.data', []);
  const showData = [...artists, ...albums, ...playlists, ...tracks];
  return (
    <View style={styles.collection}>
      {title && <Text style={styles.title}>{title}</Text>}
      {viewType === 'LIST' ? (
        <PageList id={id} navigation={props.navigation} data={showData} />
      ) : (
        <ListLarge id={id} navigation={props.navigation} data={showData} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  collection: {
    width: '100%',
    marginBottom: 16,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    paddingLeft: 18,
    marginBottom: 18,
  },
});

export default ListCollection;
