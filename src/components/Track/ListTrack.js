//@flow
import React from 'react';
import get from 'lodash/get';
import FastImage from 'react-native-fast-image';
import {Icon, Text, SongDownloadStatus} from 'components/index';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import Link from 'navigation/Link';
import {ModalsNames} from 'navigation/routeNames';
import Logo from 'assets/Logo.png';
type PropsType = {
  showMoreIcon: boolean,
  currentSong: Object,
  track: Object,
  subtitle: ?string,
};

function ListTrack({track, currentSong, showMoreIcon, subtitle}: PropsType) {
  const trackImageURL = get(track, 'image.medium.url', '');
  const isPlaying = get(currentSong, 'id', '') === get(track, 'id', '');
  const artistsName = track.artists
    ? track.artists.data.map(artist => artist.name).join(', ')
    : 'Unknown';
  return (
    <View style={{position: 'relative', height: 80}}>
      {isPlaying && (
        <>
          <FastImage
            source={{
              uri: trackImageURL,
            }}
            style={styles.track}
            resizeMode={FastImage.resizeMode.cover}
          />
          <LinearGradient
            start={{x: 1.0, y: 0.0}}
            end={{x: 0.0, y: 1.0}}
            colors={['rgba(20, 25, 45, 0.3)', 'rgba(20, 25, 45, 1)']}
            style={styles.layer}
          />
        </>
      )}
      <View
        style={{
          position: 'absolute',
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          flexDirection: 'row',
          paddingHorizontal: 16,
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FastImage
              source={{
                uri: trackImageURL,
              }}
              style={styles.trackImage}
              resizeMode={FastImage.resizeMode.cover}
            />
            {isPlaying && (
              <View
                style={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(20, 25, 45, 0.6)',
                  height: 55,
                  width: 55,
                  position: 'absolute',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FastImage style={{width: 32, height: 18}} source={Logo} />
              </View>
            )}
          </View>
          <View style={{alignSelf: 'center', marginLeft: 10}}>
            <Text
              numberOfLines={1}
              style={{
                color: isPlaying ? '#FF3752' : 'white',
                fontSize: 17,
                maxWidth: 180,
              }}>
              {get(track, 'name', 'Unknown')}
            </Text>
            <View style={{flexDirection: 'row', marginTop: 8}}>
              <SongDownloadStatus songId={track.id} />
              <Text
                numberOfLines={1}
                style={{fontSize: 13, color: 'white', maxWidth: 180}}>
                {subtitle === 'artist'
                  ? artistsName
                  : get(track, 'album.name', 'Single')}
              </Text>
            </View>
          </View>
          {!!showMoreIcon && (
            <Link
              style={{alignSelf: 'center', right: 0, position: 'absolute'}}
              routeName={ModalsNames.SongInfo}
              params={{track}}>
              <Icon name="more-horiz" size={24} color="#93A8B3" />
            </Link>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  track: {
    height: 80,
  },
  trackImage: {
    height: 55,
    width: 55,
    borderRadius: 4,
  },
  layer: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
});

function mapStateToProps(state) {
  return {
    currentSong: state.player.currentSong,
  };
}
export default connect(
  mapStateToProps,
  null,
)(ListTrack);
