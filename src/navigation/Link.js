import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function Link({
  routeName,
  params,
  isForced = true,
  style,
  children,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={style || {}}
      onPress={() => {
        if (isForced) {
          navigation.push(routeName, params);
        } else {
          navigation.navigate(routeName, params);
        }
      }}>
      {children}
    </TouchableOpacity>
  );
}
