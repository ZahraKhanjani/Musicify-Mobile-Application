import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Text, BlurView, MinimizedProgressBar} from 'components/index';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import get from 'lodash/get';
import {pauseSong, playSong} from 'screens/Player/NewPlayer';
import {MINIMIZED_PLAYER_HEIGHT} from 'theme/constants';
import Link from 'navigation/Link';
import {ModalsNames} from 'navigation/routeNames';

function MinimizedPlayer(props) {
  const {isPlaying, currentSong} = props;
  const songName = get(currentSong, 'name', 'Unknown');
  const artistsName = currentSong.artists
    ? currentSong.artists.data.map(artist => artist.name).join()
    : 'Unknown';
  return (
    <View
      style={{
        ...styles.minimizedPlayer,
        backgroundColor: 'rgba(18,28,70, 0.2)',
      }}>
      <BlurView style={styles.blurLayer} />
      <Link
        routeName={ModalsNames.Player}
        style={{
          height: MINIMIZED_PLAYER_HEIGHT,
          flex: 1,
        }}>
        <MinimizedProgressBar />
        <View style={styles.controls}>
          <FastImage
            source={{
              uri: get(currentSong, 'image.medium.url', ''),
            }}
            style={styles.cover}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View
            style={{
              flex: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{alignSelf: 'center', marginLeft: 16, flex: 4}}>
              <Text numberOfLines={1} style={styles.name}>
                {songName}
              </Text>
              <Text style={styles.artistName}>{artistsName}</Text>
            </View>
            <TouchableOpacity
              style={{alignSelf: 'center', flex: 1}}
              onPress={isPlaying ? pauseSong : playSong}>
              <View style={styles.controlText}>
                <MaterialIcons
                  name={!isPlaying ? 'play-arrow' : 'pause'}
                  color="white"
                  size={28}
                  solid
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  minimizedPlayer: {
    backgroundColor: 'rgba(18,28,70, 0.2)',
    height: 56,
    flexDirection: 'row',
    overflow: 'hidden',
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // left: 0,
  },
  blurLayer: {
    backgroundColor: 'rgba(18,28,70, 0.2)',
    height: MINIMIZED_PLAYER_HEIGHT,
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  controls: {
    height: MINIMIZED_PLAYER_HEIGHT - 2,
    justifyContent: 'space-between',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cover: {
    flex: 1,
    height: MINIMIZED_PLAYER_HEIGHT - 2,
    maxWidth: MINIMIZED_PLAYER_HEIGHT,
  },
  controlText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 18,
    marginHorizontal: 8,
    textAlign: 'center',
  },
  name: {
    color: 'white',
    fontSize: 13,
  },
  artistName: {
    color: 'rgb(179, 179, 179)',
    fontSize: 13,
  },
});

function mapStateToProps(state) {
  return {
    isPlaying: state.player.isPlaying,
    currentSong: state.player.currentSong,
  };
}

export default connect(
  mapStateToProps,
  null,
)(MinimizedPlayer);
