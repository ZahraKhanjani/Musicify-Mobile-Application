import React from 'react';
import RNIcon from 'react-native-vector-icons/MaterialIcons';
const Icon = ({name, size, color, style}) => (
  <RNIcon style={style} name={name} size={size} color={color} />
);
export default Icon;
