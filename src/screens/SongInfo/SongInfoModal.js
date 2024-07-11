import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text, Icon, LikeMenuItem, SongDownloadMenuItem} from 'components/index';
import {BlurView} from '@react-native-community/blur';
import FastImage from 'react-native-fast-image';
import get from 'lodash/get';
import Playlist from 'icons/Playlist';
import Artist from 'icons/Artist';
import {connect} from 'react-redux';
import {addToQueue} from '../Player/playerActions';
import {saveSongRequest} from 'components/SavedSongs/savedSongsActions';
import {useSafeArea} from 'react-native-safe-area-context';
import Link from 'navigation/Link';
import {ModalsNames, ScreensNames} from 'navigation/routeNames';

function SongInfoModal(props) {
  const insets = useSafeArea();
  const {track} = props.route.params;
  const artistsName = track.artists
    ? track.artists.data.map(artist => artist.name).join(', ')
    : 'Unknown';
  const ActionSeparator = () => <View style={styles.separator} />;
  return (
    <View style={styles.flexView}>
      <View
        style={[
          styles.container,
          {paddingTop: insets.top + 32, paddingBottom: insets.bottom},
        ]}>
        <BlurView
          blurRadius={15}
          downsampleFactor={5}
          overlayColor={'rgba(0,0,0,0.4)'}
          style={[styles.blurView]}
          blurType="dark"
          blurAmount={16}
        />
        <FastImage
          source={{
            uri: get(track, 'image.medium.url', ''),
          }}
          style={styles.songImage}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.songName}>{get(track, 'name', 'Unknow')}</Text>
        <Text style={styles.songSubtitle}>{artistsName}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'column-reverse',
            width: '100%',
            marginBottom: 100 + insets.bottom,
          }}>
          <Link
            isForced={false}
            routeName={ScreensNames.Artist}
            params={{
              artist: get(track, ['artists', 'data', 0], {}),
            }}>
            <View style={{flexDirection: 'row'}}>
              <Artist style={{height: 26, width: 26}} />
              <Text style={styles.actionText}>View artist</Text>
            </View>
          </Link>
          <ActionSeparator />
          <LikeMenuItem size={26} type="song" item={track} />
          <ActionSeparator />
          <Link routeName={ModalsNames.AddToPlaylist} params={{track}}>
            <View style={{flexDirection: 'row'}}>
              <Playlist style={{height: 26, width: 26}} />
              <Text style={styles.actionText}>Add to playlist</Text>
            </View>
          </Link>
          <ActionSeparator />
          <SongDownloadMenuItem song={track} />
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.pop();
          }}
          style={[
            styles.close,
            {
              bottom: insets.bottom,
            },
          ]}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              style={styles.closeIcon}
              name="close"
              size={18}
              color="#6E6E6E"
            />
            <Text style={styles.closeButtonText}>Close</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  container: {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 35,
  },
  close: {
    height: 59,
    position: 'absolute',
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: '#14192D',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  closeIcon: {
    borderWidth: 0.7,
    borderColor: '#6E6E6E',
    borderRadius: 10,
    height: 20,
    width: 20,
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#6E6E6E',
    marginLeft: 4,
    fontWeight: '300',
    alignSelf: 'center',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(18,28,70, 0.2)',
  },
  songImage: {
    height: 128,
    width: 128,
    borderRadius: 14,
  },
  songName: {
    marginTop: 20,
    fontSize: 26,
    color: 'white',
  },
  songSubtitle: {
    marginTop: 14,
    marginBottom: 10,
    fontSize: 15,
    color: '#C7C7C7',
  },
  actionText: {
    marginLeft: 24,
    fontSize: 20,
    color: 'white',
  },
  separator: {
    marginTop: 32,
  },
});
export default connect(
  null,
  {
    addToQueue,
    saveSongRequest,
  },
)(SongInfoModal);
