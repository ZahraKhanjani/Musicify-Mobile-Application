import React from 'react';
import get from 'lodash/get';
import FastImage from 'react-native-fast-image';
import {Icon, Text} from 'components/index';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, View} from 'react-native';

function NowPlaying(props) {
  const {song} = props;
  return (
    <View style={{position: 'relative'}}>
      <FastImage
        source={{
          uri: get(song, 'image.medium.url', ''),
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
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 11,
            height: 22,
            width: 22,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="equalizer" size={16} color="#FF3752" />
        </View>
        <View style={{alignSelf: 'center', position: 'absolute', left: 50}}>
          <Text numberOfLines={1} style={{color: '#FF3752', fontSize: 17}}>
            {get(song, 'name', 'Unknown')}
          </Text>
          <Text
            numberOfLines={1}
            style={{fontSize: 13, marginTop: 8, color: 'white'}}>
            {get(song, 'album.name', 'Unknown')}
          </Text>
        </View>
        <View style={{alignSelf: 'center', right: 0}}>
          <Icon name="more-horiz" size={24} color="#93A8B3" />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  track: {
    height: 80,
  },
  layer: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
});

export default NowPlaying;
