import React, {useEffect} from 'react';
import TrackPlayer, {
  useProgress,
  usePlaybackState,
} from 'react-native-track-player';
import {connect} from 'react-redux';
import {updateProgress} from './playerActions';
import {repeatStatus} from './playerReducer';
import PlayMusicAnalyticsHandler from 'utils/AnalyticsEvents';

function Progress(props) {
  let {position, duration} = useProgress(250);
  if (
    position &&
    duration &&
    Math.floor(position) == Math.floor(duration) &&
    props.repeat === repeatStatus.single
  ) {
    TrackPlayer.seekTo(0);
  }
  const state = usePlaybackState();
  useEffect(() => {
    PlayMusicAnalyticsHandler.setLastPosition({position});
    props.updateProgress({
      position,
      duration,
      state,
    });
  }, [duration, position, props, state]);
  return <></>;
}

function mapStateToProps(state) {
  return {
    repeat: state.player.repeat,
  };
}

export default connect(
  mapStateToProps,
  {updateProgress},
)(Progress);
