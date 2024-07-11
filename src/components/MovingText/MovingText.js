// @flow
import React from 'react';
import MarqueeText from 'react-native-marquee';
type PropsType = {
  style?: Object,
  text: string,
};

function MovingText(props: PropsType) {
  return (
    <MarqueeText
      style={props.style}
      duration={3000}
      marqueeOnStart
      loop
      useNativeDriver
      marqueeDelay={1000}
      marqueeResetDelay={1000}>
      {props.text}
    </MarqueeText>
  );
}

export default MovingText;
