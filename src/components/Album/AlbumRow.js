import React from 'react';
import get from 'lodash/get';
import FastImage from 'react-native-fast-image';
import {StyleSheet, View} from 'react-native';
import {Text} from 'components/index';
import {ScreensNames} from 'navigation/routeNames';
import Link from 'navigation/Link';

function AlbumRow({album}) {
  return (
    <Link params={{album}} routeName={ScreensNames.Album}>
      <View style={styles.row}>
        <FastImage
          source={{
            uri: get(album, 'image.medium.url', ''),
          }}
          style={styles.album}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={{flexGrow: 1, paddingHorizontal: 8}}>
          <Text numberOfLines={1} style={styles.name}>
            {get(album, 'name', 'Unknown')}
          </Text>
          <Text style={styles.subtitle}>Album</Text>
        </View>
      </View>
    </Link>
  );
}
const styles = StyleSheet.create({
  name: {
    color: 'white',
    fontSize: 17,
    marginBottom: 8,
    overflow: 'hidden',
    maxWidth: 250,
  },
  subtitle: {
    color: '#C7C7C7',
    fontSize: 13,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  album: {
    height: 90,
    width: 90,
    borderRadius: 7,
    backgroundColor: '#C7C7C7',
  },
});
export default AlbumRow;
