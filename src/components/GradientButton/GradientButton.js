//@flow
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, LoadingSpinner} from 'components/index';
type PropsType = {
  onPress: Function,
  containerStyle: ?Object,
  textStyle: ?Object,
  disabled: ?boolean,
  requesting: ?boolean,
  text: ?string,
};

function GradientButton({
  onPress,
  containerStyle,
  disabled,
  requesting,
  textStyle,
  text,
}: PropsType) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <LinearGradient
        start={{x: 0.0, y: 1.0}}
        end={{x: 1.0, y: 0.0}}
        colors={['#DB007C', '#FF3737']}
        style={[styles.createButton, containerStyle || {}]}>
        {requesting ? (
          <LoadingSpinner />
        ) : (
          <Text style={[styles.textStyle, textStyle || {}]}>{text}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  createButton: {
    height: 48,
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

export default GradientButton;
