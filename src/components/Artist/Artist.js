import React from 'react';
import Link from 'navigation/Link';
import {ScreensNames} from 'navigation/routeNames';
import FastImage from 'react-native-fast-image';
import get from 'lodash/get';
import {StyleSheet} from 'react-native';
import {Text} from 'components/index';
import ArtistRow from './ArtistRow';

function Artist({
  artist,
  size,
  view,
}: {
  artist: Object,
  size?: 'large' | 'default',
  view?: 'row' | 'default',
}) {
  return (
    <Link params={{artist}} routeName={ScreensNames.Artist}>
      {view === 'row' ? (
        <ArtistRow artist={artist} />
      ) : (
        <>
          <FastImage
            source={{
              uri: get(artist, 'image.medium.url', ''),
            }}
            style={styles.artistPicture(size === 'large' ? 166 : 125)}
            resizeMode={FastImage.resizeMode.cover}
          />
          <Text numberOfLines={1} style={styles.artistName}>
            {get(artist, 'name', '')}
          </Text>
        </>
      )}
    </Link>
  );
}

const styles = StyleSheet.create({
  artistPicture: size => {
    return {
      height: size,
      width: size,
      borderRadius: Math.round(size / 2),
    };
  },
  artistName: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
    color: 'white',
    maxWidth: 125,
    overflow: 'hidden',
  },
});

export default Artist;
