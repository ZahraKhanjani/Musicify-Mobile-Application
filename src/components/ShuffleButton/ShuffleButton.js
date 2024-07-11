//@flow
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'components/index';
import Shuffle from 'icons/Shuffle';
type PropsType = {
  onPress: Function,
  containerStyle: ?Object,
};

function ShuffleButton(props: PropsType) {
  const {onPress, containerStyle} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 0.0}}
        colors={['#DB007C', '#FF3737']}
        style={[styles.createButton, containerStyle || {}]}>
        <Shuffle color="white" />
        <Text style={styles.textStyle}>SHUFFLE</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  createButton: {
    height: 48,
    width: 145,
    borderRadius: 24,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 15,
    color: 'white',
    marginLeft: 8,
  },
});

export default ShuffleButton;
