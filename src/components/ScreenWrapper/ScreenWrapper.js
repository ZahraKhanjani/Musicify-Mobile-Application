import React from 'react';
import {View} from 'react-native';
import {BOTTOM_TAB_HEIGHT} from 'theme/constants';
import {useSafeArea} from 'react-native-safe-area-context';

function ScreenWrapper({children}) {
  const insets = useSafeArea();
  return (
    <View
      style={{
        flex: 1,
        paddingBottom: BOTTOM_TAB_HEIGHT + insets.bottom,
      }}>
      {children}
    </View>
  );
}
export default ScreenWrapper;
