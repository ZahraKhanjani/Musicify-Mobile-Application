//@flow

import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Animated, PanResponder} from 'react-native';
import {Text} from 'components/index';
import LinearGradient from 'react-native-linear-gradient';
import padStart from 'lodash/padStart';
import TrackPlayer from 'react-native-track-player';
import {connect} from 'react-redux';
import PlayMusicAnalyticsHandler from 'utils/AnalyticsEvents';

type PropTypes = {
  disableShowText: ?boolean,
  progressState: Object,
};

function NewProgressBar(props: PropTypes) {
  const {position, duration, state} = props.progressState;
  const {disableShowText} = props;
  let disabled = duration === 0 || state === 'loading';
  const [percent, setPercent] = useState(0);
  const [width, setWidth] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const setBarWidth = useCallback(function({nativeEvent}) {
    setWidth(nativeEvent.layout.width);
  }, []);
  function formatSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return padStart(minutes, 2, 0) + ':' + padStart(remainingSeconds, 2, 0);
  }
  useEffect(() => {
    if (!isSeeking) {
      setPercent(
        position > 0 && duration > 0
          ? (parseFloat(position) / parseFloat(duration)) * 100
          : 0,
      );
    }
  }, [duration, isSeeking, position]);
  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => !disabled,
        onPanResponderStart: () => {
          setIsSeeking(true);
        },

        onPanResponderMove: event => {
          const newPercent =
            width === 0
              ? 0
              : Math.floor(((event.nativeEvent.pageX - 22) / width) * 100);
          setPercent(newPercent);
        },
        onPanResponderRelease: event => {
          const newPercent =
            width === 0
              ? 0
              : Math.floor(((event.nativeEvent.pageX - 22) / width) * 100);
          setPercent(newPercent);
          let newTime = (newPercent * duration) / 100;
          PlayMusicAnalyticsHandler.setSeekedDuration({
            duration: position - newTime,
          });
          TrackPlayer.seekTo(newTime);
          setTimeout(() => {
            setIsSeeking(false);
          }, 1000);
        },
      }),
    [disabled, duration, position, width],
  );
  return (
    <View>
      <View
        onLayout={setBarWidth}
        style={{
          width: '100%',
          height: 25,
        }}>
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            width: '100%',
            alignSelf: 'center',
            height: 30,
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <LinearGradient
              colors={['#DB007C', 'rgb(255, 55, 55)']}
              start={{x: 0.0, y: 1.0}}
              end={{x: 1.0, y: 1.0}}
              style={[
                styles.line,
                {flex: disabled ? 0 : percent, top: 6, height: 5},
              ]}
            />
            <View
              style={{
                width: isSeeking ? 19 : 18,
                height: isSeeking ? 19 : 18,
                borderRadius: 9,
                borderWidth: 5,
                borderColor: 'white',
                backgroundColor: '#FF3737',
                alignSelf: 'center',
                marginHorizontal: 4,
              }}
            />
            <View
              style={[
                styles.line,
                {
                  flex: disabled ? 100 : 100 - percent,
                  backgroundColor: 'white',
                  top: 7,
                  height: 4,
                },
              ]}
            />
          </View>
        </Animated.View>
      </View>
      {!disableShowText && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.timeText]}>
            {disabled
              ? '--:--'
              : formatSeconds(
                  isSeeking ? (percent * duration) / 100 : position,
                )}
          </Text>
          <Text style={[styles.timeText]}>
            {disabled ? '--:--' : formatSeconds(duration)}
          </Text>
        </View>
      )}
    </View>
  );
}

let styles = StyleSheet.create({
  timeText: {color: 'rgb(201, 201, 201)', fontSize: 12},
  line: {
    borderRadius: 3,
  },
});

function mapStateToProps(state) {
  return {
    progressState: state.player.progressState,
  };
}

export default connect(
  mapStateToProps,
  null,
)(NewProgressBar);
