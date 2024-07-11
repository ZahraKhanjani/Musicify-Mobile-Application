import React from 'react';
import {BlurView as RNBlurView} from '@react-native-community/blur';

function BlurView({style}) {
  return (
    <RNBlurView
      blurRadius={15}
      downsampleFactor={5}
      overlayColor={'rgba(18, 28, 70, 0.3)'}
      style={style}
      blurType="dark"
      blurAmount={10}
    />
  );
}
export default BlurView;
