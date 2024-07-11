// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Circle, G} from 'react-native-svg';

function MoreHoriz({style, color = '#fff'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="21.75"
        height="4.35"
        viewBox="0 0 21.75 4.35">
        <G
          id="Group_96"
          data-name="Group 96"
          transform="translate(-239.034 -33.165)">
          <Circle
            id="Ellipse_2"
            data-name="Ellipse 2"
            fill={color}
            cx="2.175"
            cy="2.175"
            r="2.175"
            transform="translate(239.034 33.165)"
          />
          <Circle
            id="Ellipse_2-2"
            data-name="Ellipse 2"
            fill={color}
            cx="2.175"
            cy="2.175"
            r="2.175"
            transform="translate(247.734 33.165)"
          />
          <Circle
            id="Ellipse_2-3"
            data-name="Ellipse 2"
            fill={color}
            cx="2.175"
            cy="2.175"
            r="2.175"
            transform="translate(256.434 33.165)"
          />
        </G>
      </Svg>
    </View>
  );
}
export default MoreHoriz;
