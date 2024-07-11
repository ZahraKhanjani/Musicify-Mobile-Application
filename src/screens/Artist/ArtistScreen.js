/* eslint-disable react-hooks/exhaustive-deps */
// @flow
// Artist.js
import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import get from 'lodash/get';
import FastImage from 'react-native-fast-image';
import {
  Icon,
  ArtistAlbums,
  ArtistTracks,
  ScreenWrapper,
} from 'components/index';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeArea} from 'react-native-safe-area-context';
import FollowSwitch from '../Library/FollowSwitch';
import {ArtistApi} from 'api/index';

function ArtistScreen(props) {
  const {artist, id} = props.route.params;
  const artistId = id || artist?.id;
  const insets = useSafeArea();
  const [stateArtist, setStateArtist] = useState({});
  const artistToUse = id ? stateArtist : artist;
  const [height, setHeight] = useState(300);
  const scrollYِ = useRef(new Animated.Value(0)).current;
  const notchOpacity = scrollYِ.interpolate({
    inputRange: [0, height],
    outputRange: [0, 0.9],
  });
  function setScrollHeight(e) {
    setHeight(e.nativeEvent.layout.height);
  }
  function getAlbumInfo() {
    ArtistApi.getArtist(artistId)
      .then(res => {
        setStateArtist(res.data);
      })
      .catch(e => {});
  }
  useEffect(() => {
    if (id) {
      getAlbumInfo();
    }
  }, []);
  return (
    <ScreenWrapper>
      <View style={{flex: 1, width: '100%'}}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: insets.top,
            backgroundColor: 'rgba(20, 25, 45, 1)',
            opacity: notchOpacity,
            zIndex: 1000,
          }}
        />
        <ScrollView
          onLayout={setScrollHeight}
          scrollEventThrottle={1}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollYِ,
                },
              },
            },
          ])}
          style={{
            backgroundColor: 'rgba(20, 25, 45, 1)',
          }}>
          <View style={[styles.header, {paddingTop: insets.top + 16}]}>
            <TouchableOpacity
              style={{alignSelf: 'center', height: 30, width: 30}}
              onPress={() => {
                props.navigation.goBack(null);
              }}>
              <Icon name="chevron-left" size={32} color="white" />
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
              <FollowSwitch style={styles.followButton} artist={artistToUse} />
              {/*<TouchableOpacity style={{alignSelf: 'center'}} onPress={() => {}}>*/}
              {/*  <Icon name="more-horiz" size={32}  color="white" />*/}
              {/*</TouchableOpacity>*/}
            </View>
          </View>
          <View>
            <FastImage
              source={{
                uri: get(artistToUse, 'image.medium.url', ''),
              }}
              style={{height: 300 + insets.top + insets.top + insets.top}}
              resizeMode={FastImage.resizeMode.cover}
            />
            <LinearGradient
              colors={[
                'rgba(20, 25, 45, 0.1)',
                'rgba(20, 25, 45, 0.25)',
                'rgba(20, 25, 45, 0.5)',
                'rgba(20, 25, 45, 0.75)',
                'rgba(20, 25, 45, 1)',
              ]}
              style={styles.layer}
            />
          </View>
          <ArtistTracks
            navigation={props.navigation}
            artistId={artistId}
            artistName={artistToUse?.name}
          />
          <ArtistAlbums
            navigation={props.navigation}
            artistId={artistId}
            artistName={artistToUse?.name}
          />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    top: 0,
    right: 0,
    left: 0,
    position: 'absolute',
    height: 80,
    paddingHorizontal: 16,
    zIndex: 100,
  },
  followButton: {
    alignSelf: 'center',
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 18,
    height: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    marginRight: 8,
  },
  artistInfo: {
    backgroundColor: 'transparent',
    // position: 'absolute',
    // left: 0,
    // right: 0,
    top: -32,
    // bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artistName: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 48,
    // marginVertical: 32,
    color: 'white',
  },
  shuffleButton: {
    height: 48,
    marginVertical: 18,
    borderRadius: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  layer: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
});
export default ArtistScreen;
