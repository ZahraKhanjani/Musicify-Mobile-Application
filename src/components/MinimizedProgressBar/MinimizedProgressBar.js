//@flow

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';

type PropTypes = {
  progressState: Object,
};

function MinimizedProgressBar(props: PropTypes) {
  const {duration, position, state} = props.progressState;
  let disabled = duration === 0 || state === 'loading';
  function getCurrentTimePercentage() {
    if (position > 0 && duration > 0) {
      return parseFloat(position) / parseFloat(duration);
    } else {
      return 0;
    }
  }
  const flexCompleted = getCurrentTimePercentage() * 100;
  const flexRemaining = (1 - getCurrentTimePercentage()) * 100;
  return (
    <View style={styles.progress}>
      <View
        style={[
          styles.innerProgressCompleted,
          {flex: disabled ? 0 : flexCompleted},
        ]}
      />
      <View
        style={[
          styles.innerProgressRemaining,
          {flex: disabled ? 100 : flexRemaining},
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
});

function mapStateToProps(state) {
  return {
    progressState: state.player.progressState,
  };
}

export default connect(
  mapStateToProps,
  null,
)(MinimizedProgressBar);
