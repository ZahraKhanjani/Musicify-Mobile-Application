// @flow
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icon, NewProgressBar} from 'components/index';
import {useSafeArea} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import get from 'lodash/get';
import {BlurView} from '@react-native-community/blur';
import {pauseSong, playSong} from '../Player/NewPlayer';
import Pause from 'icons/Pause';
import Play from 'icons/Play';
import {connect} from 'react-redux';
import {COLOURS} from 'theme/constants';

type PropsType = {
  currentSong: Object,
  isPlaying: boolean,
  navigation: any,
};

function Lyrics(props: PropsType) {
  const insets = useSafeArea();
  const {currentSong, isPlaying} = props;
  const lyrics = currentSong.lyric || "Oops, there isn't any lyric to show :(";
  const backgroundColor = get(currentSong, 'background_color', 'black');
  const artistsName = currentSong.artists
    ? currentSong.artists.data.map(artist => artist.name).join(', ')
    : 'Unknown';
  function onClose() {
    props.navigation.pop();
  }
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[backgroundColor, 'rgba(20, 25, 45, 1)']}
        start={{x: 0.0, y: 0.0}}
        end={{x: 0.025, y: 0.5}}
        style={{
          flex: 4,
          paddingTop: insets.top,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 26,
            paddingHorizontal: 8,
          }}>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: 26}}>
          <FastImage
            source={{
              uri: get(currentSong, 'image.medium.url', ''),
            }}
            style={styles.songImage}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={{marginLeft: 12}}>
            <Text numberOfLines={1} style={styles.songName}>
              {get(currentSong, 'name', 'Unknown')}
            </Text>
            <Text style={styles.songSubtitle}>{artistsName}</Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{paddingBottom: 122 + insets.bottom}}>
          <Text style={styles.lyrics}>{lyrics}</Text>
        </ScrollView>
        <BlurView style={styles.blur} blurType="dark" blurAmount={16} />
        <View
          style={{
            height: 61,
            flexDirection: 'row',
            paddingHorizontal: 26,
          }}>
          <TouchableOpacity
            style={{marginRight: 16}}
            onPress={isPlaying ? pauseSong : playSong}>
            <View style={styles.controlOption}>
              {isPlaying ? (
                <Pause />
              ) : (
                <View
                  style={{
                    backgroundColor: COLOURS.white,
                    height: 52,
                    width: 52,
                    borderRadius: 26,
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      right: 3,
                      left: 3,
                      top: 3,
                      bottom: 3,
                      borderRadius: 26,
                      backgroundColor: '#FF3636',
                    }}
                  />
                  <Play
                    size={90}
                    style={{
                      position: 'absolute',
                      right: 0,
                      left: 0,
                      top: 0,
                      bottom: 0,
                    }}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
          <View style={{flex: 1, height: 61, justifyContent: 'center'}}>
            <NewProgressBar disableShowText />
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.close,
            {
              paddingBottom: insets.bottom,
              height: 61 + insets.bottom,
            },
          ]}
          onPress={onClose}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              style={styles.closeIcon}
              name="close"
              size={18}
              color="#6E6E6E"
            />
            <Text
              style={{
                fontSize: 20,
                color: '#6E6E6E',
                marginLeft: 4,
                fontWeight: '300',
                alignSelf: 'center',
              }}>
              Close
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  blur: {
    // flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  close: {
    borderTopWidth: 1,
    borderColor: '#343434',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  songImage: {
    height: 59,
    width: 59,
    borderRadius: 7,
  },
  songName: {
    maxWidth: 250,
    overflow: 'hidden',
    fontSize: 26,
    color: 'white',
  },
  songSubtitle: {
    fontSize: 18,
    color: '#C7C7C7',
    maxWidth: 250,
    overflow: 'hidden',
  },
  lyrics: {
    marginTop: 44,
    marginBottom: 16,
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
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
});
function mapStateToProps(state) {
  return {
    currentSong: state.player.currentSong,
    isPlaying: state.player.isPlaying,
  };
}

export default connect(
  mapStateToProps,
  null,
)(Lyrics);
