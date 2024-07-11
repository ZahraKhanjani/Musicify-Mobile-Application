import React from 'react';
import get from 'lodash/get';
import FastImage from 'react-native-fast-image';
import {StyleSheet, View} from 'react-native';
import {Text} from 'components/index';

function LibraryAlbum(props) {
  const {album} = props;
  const artistsName = album.artists
    ? album.artists.data.map(artist => artist.name).join(', ')
    : 'Unknown';
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <FastImage
        source={{
          uri: get(album, 'image.medium.url', ''),
        }}
        style={styles.album}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style={{flexGrow: 1, paddingHorizontal: 8}}>
        <Text style={{color: 'white', fontSize: 17, marginBottom: 8}}>
          {get(album, 'name', 'Unknown')}
        </Text>
        <Text style={{color: '#C7C7C7', fontSize: 13}}>{artistsName}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  album: {
    height: 75,
    width: 75,
    borderRadius: 7,
    backgroundColor: '#C7C7C7',
  },
  layer: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
});
export default LibraryAlbum;
