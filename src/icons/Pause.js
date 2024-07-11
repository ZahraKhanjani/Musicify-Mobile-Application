// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, G, Circle} from 'react-native-svg';

function Pause({style, size = 52, color = '#ff4d4d'}) {
  return (
    <View style={style}>
      <Svg
        id="Component_18_3"
        data-name="Component 18 – 3"
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 52 52">
        <Circle
          id="Ellipse_34"
          data-name="Ellipse 34"
          fill="#fff"
          cx="26"
          cy="26"
          r="26"
        />
        <G
          id="Group_174"
          data-name="Group 174"
          transform="translate(-30.083 -332)">
          <G
            id="Group_173"
            data-name="Group 173"
            transform="translate(6.583 -0.5)">
            <Line
              id="Line_56"
              data-name="Line 56"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeWidth="5px"
              y2="10.667"
              transform="translate(45.5 353.5)"
            />
            <Line
              id="Line_57"
              data-name="Line 57"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeWidth="5px"
              y2="10.667"
              transform="translate(54.333 353.5)"
            />
          </G>
        </G>
      </Svg>
    </View>
  );
}
export default Pause;
