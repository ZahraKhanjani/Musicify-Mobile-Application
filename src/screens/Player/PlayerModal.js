/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useSafeArea} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {minimizePlayer} from './playerActions';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import get from 'lodash/get';
import LinearGradient from 'react-native-linear-gradient';
import QueueIcon from 'icons/Queue';
import DownArrow from 'icons/DownArrow';
import MoreHoriz from 'icons/MoreHoriz';
import {
  TrackingControls,
  SuggestedSongs,
  MovingText,
  NewProgressBar,
} from 'components/index';
import LyricsIcon from 'icons/Lyrics';
import FavSwitch from '../Library/FavSwitch';
import NavigationService from 'navigation/NavigationService';
import {ModalsNames, ScreensNames} from 'navigation/routeNames';
import Link from 'navigation/Link';
import {TrackApi} from 'api/index';
import {setQueueAndPlay} from './NewPlayer';
import {TrackSources} from 'utils/AnalyticsEvents';

function PlayerModal(props) {
  const insets = useSafeArea();
  const [state, setState] = useState({currentSong: {}});
  const screenHeight = Math.round(Dimensions.get('window').height);
  const isFocused = useIsFocused();
  const id = props.route?.params?.id;
  const {currentSong} = id ? state : props;
  const songName = get(currentSong, 'name', 'Unknown');
  const artistsName = currentSong?.artists
    ? currentSong?.artists.data.map(artist => artist.name).join(', ')
    : 'Unknown';
  const backgroundColor = get(currentSong, 'background_color', 'black');
  function goToArtistScreen() {
    NavigationService.navigate(ScreensNames.Artist, {
      artist: currentSong?.artists.data[0],
    });
  }
  function minimize() {
    props.navigation.pop();
  }
  function getTrackInfo() {
    setState({currentSong: {}});
    TrackApi.getTrack(id)
      .then(res => {
        setState({
          currentSong: res.data,
        });
        setQueueAndPlay([res.data], res.data?.id, null, TrackSources.deepLink);
      })
      .catch(e => {});
  }

  useEffect(() => {
    if (!isFocused) {
      props.minimizePlayer();
    }
    if (id) {
      getTrackInfo();
    }
  }, [isFocused, id]);

  return (
    <LinearGradient
      colors={[backgroundColor, 'rgba(20, 25, 45, 1)']}
      start={{x: 0.0, y: 0.0}}
      end={{x: 0.25, y: 0.75}}
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={minimize}>
          <DownArrow />
        </TouchableOpacity>
        <Link
          isForced={false}
          routeName={ModalsNames.SongInfo}
          params={{track: currentSong}}
          style={styles.moreIcon}>
          <MoreHoriz style={{alignSelf: 'flex-end'}} />
        </Link>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, paddingHorizontal: 16}}>
          <FastImage
            source={{
              uri: get(currentSong, 'image.medium.url', ''),
            }}
            style={[styles.player, {height: screenHeight / 2.15}]}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={{flex: 1}}>
            <View style={styles.center}>
              <MovingText
                text={songName}
                style={styles.songName}
                numberOfLines={1}
              />
            </View>
            <View style={styles.center}>
              <TouchableOpacity onPress={goToArtistScreen}>
                <MovingText text={artistsName} style={styles.artistName} />
              </TouchableOpacity>
            </View>
            <View style={{marginVertical: 16}}>
              <NewProgressBar />
            </View>
            <TrackingControls />
            <View style={styles.favIcon}>
              <FavSwitch
                style={styles.touchOption}
                type="song"
                item={currentSong}
              />

              {/*<TouchableOpacity style={styles.touchOption}>*/}
              {/*  <View style={styles.controlOption}>*/}
              {/*    <Share height={18} width={15} color="#c7c7c7" />*/}
              {/*  </View>*/}
              {/*</TouchableOpacity>*/}

              <Link routeName={ModalsNames.Lyrics} style={styles.touchOption}>
                <View style={styles.controlOption}>
                  <LyricsIcon />
                </View>
              </Link>

              <Link routeName={ModalsNames.Queue} style={styles.touchOption}>
                <View style={styles.controlOption}>
                  <QueueIcon />
                </View>
              </Link>
            </View>
          </View>
        </View>
        <SuggestedSongs navigation={props.navigation} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
  },
  center: {flexDirection: 'row', justifyContent: 'center'},
  moreIcon: {
    position: 'absolute',
    right: 16,
    zIndex: 100,
    width: 50,
    height: 30,
    justifyContent: 'center',
  },
  player: {
    borderRadius: 7,
    maxHeight: 380,
  },
  favIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 18,
    alignSelf: 'stretch',
    alignItems: 'center',
    alignContent: 'center',
  },
  songName: {
    overflow: 'hidden',
    marginTop: 16,
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  },
  artistName: {
    marginTop: 8,
    fontSize: 18,
    color: 'grey',
    textAlign: 'center',
    justifyContent: 'center',
  },
  touchOption: {
    height: 30,
    width: 30,
    justifyContent: 'center',
  },
  controlOption: {
    alignSelf: 'center',
    color: 'white',
  },
});

function mapStateToProps(state) {
  return {
    currentSong: state.player.currentSong,
    favSongs: state.player.favSongs,
    isPlaying: state.player.isPlaying,
  };
}

export default connect(
  mapStateToProps,
  {
    minimizePlayer,
  },
)(PlayerModal);
