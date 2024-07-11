// @flow
import LottieView from 'lottie-react-native';
import React from 'react';

function Loading({size}: {size: number}) {
  return (
    <LottieView
      style={{width: size, height: size}}
      source={require('assets/Preloader.json')}
      autoPlay
      loop
    />
  );
}

export default Loading;
