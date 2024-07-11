//@flow

import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'components/index';
import LinearGradient from 'react-native-linear-gradient';
import padStart from 'lodash/padStart';
import TrackPlayer from 'react-native-track-player';
import {connect} from 'react-redux';

type PropTypes = {
  disableShowText: ?boolean,
  progressState: Object,
};

function ProgressBar(props: PropTypes) {
  const {position, duration, state} = props.progressState;
  const {disableShowText} = props;
  let disabled = duration === 0 || state === 'loading';
  const [percent, setPercent] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [width, setWidth] = useState(0);
  const [spent, setSpent] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  function setBarWidth({nativeEvent}) {
    setWidth(nativeEvent.layout.width);
  }
  function setMoving() {
    setIsMoving(true);
    setIsSeeking(true);
  }
  function setHolderPosition({nativeEvent}) {
    setSpent(nativeEvent.pageX - 22);
    const newPercent =
      width === 0 ? 0 : Math.floor(((nativeEvent.pageX - 22) / width) * 100);
    setPercent(newPercent);
  }
  function setTrackTime() {
    setIsMoving(false);
    const newPercent = width === 0 ? 0 : Math.floor((spent / width) * 100);
    let newTime = (newPercent * duration) / 100;
    TrackPlayer.seekTo(newTime).then(() => {});
  }
  function formatSeconds(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return padStart(minutes, 2, 0) + ':' + padStart(remainingSeconds, 2, 0);
  }
  useEffect(() => {
    if (!isMoving) {
      setPercent(
        position > 0 && duration > 0
          ? (parseFloat(position) / parseFloat(duration)) * 100
          : 0,
      );
    }
    return () => {};
  }, [duration, position, isSeeking, isMoving]);
  return (
    <View>
      <View style={{flexDirection: 'row', height: 25}}>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            height: 30,
            justifyContent: 'center',
          }}
          onLayout={setBarWidth}
          onMoveShouldSetResponderCapture={event => !disabled}
          onResponderMove={setHolderPosition}
          onResponderGrant={setMoving}
          onResponderRelease={setTrackTime}>
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
                width: 18,
                height: 18,
                borderRadius: 9,
                borderWidth: 5,
                borderColor: 'white',
                backgroundColor: '#FF3737',
                alignSelf: 'center',
                marginHorizontal: 4,
                shadowColor: 'white',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.7,
                shadowRadius: 6,
                elevation: 6,
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
        </View>
      </View>
      {!disableShowText && (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.timeText]}>
            {disabled ? '--:--' : formatSeconds(position)}
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
    shadowColor: 'white',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 6,
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
)(ProgressBar);
