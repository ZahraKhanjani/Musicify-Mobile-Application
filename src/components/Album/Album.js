import React from 'react';
import Link from 'navigation/Link';
import {ScreensNames} from 'navigation/routeNames';
import FastImage from 'react-native-fast-image';
import get from 'lodash/get';
import {StyleSheet} from 'react-native';
import {Text} from 'components/index';
import AlbumRow from './AlbumRow';

function Album({
  album,
  viewType,
  size,
  showInfo = true,
}: {
  album: Object,
  viewType?: 'row' | 'grid' | 'default',
  size?: 'large' | 'small',
  showInfo?: boolean,
}) {
  const artistsName = album.artists
    ? album.artists.data.map(artist => artist.name).join(', ')
    : 'Unknown';
  if (viewType === 'row') {
    return <AlbumRow album={album} />;
  }
  return (
    <Link params={{album}} routeName={ScreensNames.Album}>
      <FastImage
        source={{
          uri: get(album, 'image.medium.url', ''),
        }}
        style={styles.albumPicture(size === 'large' ? 166 : 125)}
        resizeMode={FastImage.resizeMode.cover}
      />
      {showInfo && (
        <>
          <Text numberOfLines={1} style={styles.albumName}>
            {artistsName}
          </Text>
          <Text numberOfLines={1} style={styles.name}>
            {get(album, 'name', '')}
          </Text>
        </>
      )}
    </Link>
  );
}

const styles = StyleSheet.create({
  name: {
    textAlign: 'left',
    fontSize: 13,
    color: '#B3B3B3',
    maxWidth: 140,
    overflow: 'hidden',
  },
  albumPicture: size => {
    return {
      height: size,
      width: size,
      borderRadius: 7,
    };
  },
  albumName: {
    textAlign: 'left',
    marginTop: 12,
    fontSize: 14,
    color: 'white',
    maxWidth: 125,
    overflow: 'hidden',
  },
});

export default Album;
