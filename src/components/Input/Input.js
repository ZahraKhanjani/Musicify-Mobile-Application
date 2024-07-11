import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {Text} from 'components/index';
import {COLOURS} from 'theme/constants';

const Input = ({
  autoCapitalize,
  containerStyle,
  inputStyle,
  placeholderTextColor,
  errorMessage,
  leftIconContainerStyle,
  placeholder,
  value,
  defaultValue,
  leftIcon,
  rightIcon,
  onChangeText,
  secureTextEntry,
  caretHidden,
  ref,
}) => (
  <View style={containerStyle}>
    <View style={styles.container}>
      <View
        style={StyleSheet.flatten([leftIconContainerStyle, styles.leftIcon])}>
        {leftIcon}
      </View>
      <TextInput
        caretHidden={caretHidden}
        ref={ref}
        autoCapitalize={autoCapitalize}
        style={StyleSheet.flatten([styles.textInput, inputStyle])}
        placeholderTextColor={placeholderTextColor}
        errorMessage={errorMessage}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
      />
      <View style={styles.rightIcon}>{rightIcon}</View>
    </View>
    <Text style={styles.errorMessage}>{errorMessage}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 0.75,
    borderBottomColor: COLOURS.borderColor,
  },
  textInput: {
    color: COLOURS.white,
    flexGrow: 1,
    paddingVertical: 12,
  },
  leftIcon: {
    alignSelf: 'center',
  },
  rightIcon: {
    position: 'absolute',
    right: 0,
    bottom: 12,
    alignSelf: 'center',
  },
  errorMessage: {
    color: COLOURS.red,
    fontSize: 12,
    marginTop: 8,
  },
});

export default Input;
