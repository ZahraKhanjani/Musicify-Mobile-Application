import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {COLOURS} from 'theme/constants';

const LoadingSpinner = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="small" color={COLOURS.white} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default LoadingSpinner;
