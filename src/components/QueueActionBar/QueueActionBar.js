import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text} from 'components/index';
import {BlurView} from '@react-native-community/blur';
import {connect} from 'react-redux';
import {minimizePlayer, toggleRepeat} from 'screens/Player/playerActions';
import {
  playPrevSong,
  playSong,
  pauseSong,
  playNextSong,
  turnShuffleOn,
  turnShuffleOff,
} from 'screens/Player/NewPlayer';
import {repeatStatus} from 'screens/Player/playerReducer';
import Shuffle from 'icons/Shuffle';
import Prev from 'icons/Prev';
import Next from 'icons/Next';
import Pause from 'icons/Pause';
import Play from 'icons/Play';
import Repeat from 'icons/Repeat';
import RepeatAll from 'icons/RepeatAll';
import {useSafeArea} from 'react-native-safe-area-context';
import RepeatSingle from 'icons/RepeatSingle';

function QueueActionBar(props) {
  const insets = useSafeArea();
  const {isPlaying, shuffle, repeat} = props;
  const {selectMode, addToQueue, includesQueue, onRemove} = props;
  return (
    <View
      style={{
        ...styles.minimizedPlayer,
        paddingBottom: insets.bottom,
        height: 64 + insets.bottom,
        overflow: 'hidden',
      }}>
      <BlurView
        style={[styles.minimizedPlayer, {height: 64 + insets.bottom}]}
        blurType="dark"
        blurAmount={5}
      />
      <View
        style={{
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
          flex: 1,
          justifyContent: 'center',
        }}>
        {selectMode ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            {/*{!includesQueue && (*/}
            {/*  <TouchableOpacity onPress={addToQueue}>*/}
            {/*    <Text style={{fontSize: 18, color: 'white'}}>Add</Text>*/}
            {/*  </TouchableOpacity>*/}
            {/*)}*/}
            <TouchableOpacity onPress={onRemove}>
              <Text style={{fontSize: 18, color: 'white'}}>Remove</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.trackingControls}>
            <TouchableOpacity
              style={styles.touchOption}
              onPress={shuffle ? turnShuffleOff : turnShuffleOn}>
              <View style={styles.controlOption}>
                <Shuffle color={shuffle ? 'red' : 'white'} />
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={styles.touchOption}
                onPress={playPrevSong}>
                <View style={styles.controlOption}>
                  <Prev width={14.75} height={18.91} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginHorizontal: 16}}
                onPress={isPlaying ? pauseSong : playSong}>
                <View style={styles.controlOption}>
                  {isPlaying ? (
                    <Pause />
                  ) : (
                    <View
                      style={{
                        backgroundColor: '#FF3636',
                        height: 52,
                        width: 52,
                        borderRadius: 26,
                      }}>
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
              <TouchableOpacity
                style={styles.touchOption}
                onPress={playNextSong}>
                <View style={styles.controlOption}>
                  <Next width={14.75} height={18.91} />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.touchOption}
              onPress={props.toggleRepeat}>
              <View style={styles.controlOption}>
                {repeat === repeatStatus.single && <RepeatSingle />}
                {repeat === repeatStatus.off && <Repeat />}
                {repeat === repeatStatus.all && <RepeatAll />}
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  minimizedPlayer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  innerProgressCompleted: {
    height: 2,
    top: 0,
    backgroundColor: 'rgb(255, 55, 55)',
  },
  innerProgressRemaining: {
    height: 2,
    top: 0,
    backgroundColor: 'rgb(214, 214, 214)',
  },
  progress: {
    flexDirection: 'row',
    overflow: 'hidden',
    height: 2,
  },
  controls: {
    height: 54,
    justifyContent: 'space-between',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cover: {
    flex: 1,
    height: 54,
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
  container: {
    flex: 1,
  },
  player: {
    alignSelf: 'stretch',
    // backgroundColor: 'lightblue',
    flex: 1,
    borderRadius: 7,
  },
  songInfo: {
    // alignSelf: 'center',
  },
  songName: {
    marginTop: 32,
    fontSize: 26,
    color: 'white',
    textAlign: 'center',
  },
  trackingControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'stretch',
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
    isPlaying: state.player.isPlaying,
    shuffle: state.player.shuffle,
    repeat: state.player.repeat,
  };
}

export default connect(
  mapStateToProps,
  {
    minimizePlayer,
    toggleRepeat,
  },
)(QueueActionBar);
