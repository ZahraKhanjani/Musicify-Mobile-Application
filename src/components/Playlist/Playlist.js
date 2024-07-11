import React from 'react';
import {ScreensNames} from 'navigation/routeNames';
import FastImage from 'react-native-fast-image';
import get from 'lodash/get';
import {StyleSheet} from 'react-native';
import {Text} from 'components/index';
import Link from 'navigation/Link';
import ListPlaylist from './ListPlaylist';

function Playlist({
  playlist,
  size,
  showInfo = true,
  viewType,
  onPressMore,
}: {
  playlist: Object,
  size?: 'large' | 'default',
  showInfo?: boolean,
  viewType?: 'list' | 'default',
  onPressMore?: Function,
}) {
  return (
    <Link params={{playlist}} routeName={ScreensNames.Playlist}>
      {viewType === 'list' ? (
        <ListPlaylist onPressMore={onPressMore} playlist={playlist} />
      ) : (
        <>
          <FastImage
            source={{
              uri: get(playlist, 'image.medium.url', ''),
            }}
            style={styles.playlistPicture(size)}
            resizeMode={FastImage.resizeMode.cover}
          />
          {showInfo && (
            <Text numberOfLines={1} style={styles.playlistName}>
              {get(playlist, 'name', '')}
            </Text>
          )}
        </>
      )}
    </Link>
  );
}

const styles = StyleSheet.create({
  playlistPicture: size => {
    return {
      height: size === 'large' ? 166 : 102,
      width: size === 'large' ? 199 : 150,
      borderRadius: 7,
    };
  },
  playlistSubtitle: {
    color: '#C7C7C7',
    fontSize: 13,
  },
  playlistInfo: {
    marginLeft: 12,
    alignSelf: 'center',
  },
  playlistImage: {
    width: 75,
    height: 58,
    backgroundColor: '#2E3244',
    borderRadius: 7,
    justifyContent: 'center',
  },
  playlistName: {
    textAlign: 'left',
    marginTop: 12,
    fontSize: 14,
    color: 'white',
    maxWidth: 166,
    overflow: 'hidden',
  },
});

export default Playlist;
