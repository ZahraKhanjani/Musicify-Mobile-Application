// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, G, Circle} from 'react-native-svg';

function Setting({style, color = '#fff'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23.8"
        viewBox="0 0 23 23.8">
        <G
          id="Group_1"
          data-name="Group 1"
          transform="translate(-49 400) rotate(-90)">
          <Line
            id="Line_1"
            data-name="Line 1"
            fill="none"
            strokeLinecap="round"
            stroke={color}
            strokeWidth="2px"
            x1="21.6"
            transform="translate(377.2 52.5)"
          />
          <Line
            id="Line_2"
            data-name="Line 2"
            fill="none"
            strokeLinecap="round"
            stroke={color}
            strokeWidth="2px"
            x1="21.6"
            transform="translate(377.2 60.45)"
          />
          <Line
            id="Line_3"
            data-name="Line 3"
            fill="none"
            strokeLinecap="round"
            stroke={color}
            strokeWidth="2px"
            x1="21.6"
            transform="translate(377.2 68.4)"
          />
          <Circle
            id="Ellipse_2"
            data-name="Ellipse 2"
            stroke={color}
            strokeWidth="2px"
            fill="#14192D"
            cx="2.5"
            cy="2.5"
            r="2.5"
            transform="translate(394 58)"
          />
          <Circle
            id="Ellipse_3"
            data-name="Ellipse 3"
            stroke={color}
            strokeWidth="2px"
            fill="#14192D"
            cx="2.5"
            cy="2.5"
            r="2.5"
            transform="translate(384 66)"
          />
          <Circle
            id="Ellipse_4"
            data-name="Ellipse 4"
            stroke={color}
            strokeWidth="2px"
            fill="#14192D"
            cx="2.5"
            cy="2.5"
            r="2.5"
            transform="translate(379 50)"
          />
        </G>
      </Svg>
    </View>
  );
}
export default Setting;
