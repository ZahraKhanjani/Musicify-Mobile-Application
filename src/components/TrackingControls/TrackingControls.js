import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Shuffle from 'icons/Shuffle';
import Prev from 'icons/Prev';
import Pause from 'icons/Pause';
import Play from 'icons/Play';
import Next from 'icons/Next';
import {repeatStatus} from 'screens/Player/playerReducer';
import Repeat from 'icons/Repeat';
import RepeatAll from 'icons/RepeatAll';
import {connect} from 'react-redux';
import {
  playPrevSong,
  playSong,
  pauseSong,
  playNextSong,
  turnShuffleOn,
  turnShuffleOff,
} from 'screens/Player/NewPlayer';
import {toggleRepeat} from 'screens/Player/playerActions';
import {usePlaybackState} from 'react-native-track-player';
import RepeatSingle from 'icons/RepeatSingle';

function TrackingControls(props) {
  const state = usePlaybackState();
  const {isPlaying, shuffle, repeat} = props;
  return (
    <View style={styles.trackingControls}>
      <TouchableOpacity
        style={{height: 30, width: 30, justifyContent: 'center'}}
        onPress={shuffle ? turnShuffleOff : turnShuffleOn}>
        <View style={styles.controlOption}>
          <Shuffle color={shuffle ? 'red' : '#c7c7c7'} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{width: 40, height: 40, justifyContent: 'center'}}
        onPress={playPrevSong}>
        <View style={styles.controlOption}>
          <Prev />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={state === 'loading'}
        onPress={isPlaying ? pauseSong : playSong}>
        <View style={styles.controlOption}>
          {isPlaying ? (
            <Pause size={68.5} />
          ) : (
            <View
              style={{
                backgroundColor: '#FF3636',
                height: 68,
                width: 68,
                borderRadius: 34.25,
              }}>
              <Play
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
        style={{width: 40, height: 40, justifyContent: 'center'}}
        onPress={playNextSong}>
        <View style={styles.controlOption}>
          <Next />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{height: 30, width: 30, justifyContent: 'center'}}
        onPress={props.toggleRepeat}>
        <View style={styles.controlOption}>
          {repeat === repeatStatus.single && <RepeatSingle />}
          {repeat === repeatStatus.off && <Repeat />}
          {repeat === repeatStatus.all && <RepeatAll />}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  trackingControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    playPrevSong,
    toggleRepeat,
  },
)(TrackingControls);
