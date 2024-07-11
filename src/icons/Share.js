// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, G, Circle} from 'react-native-svg';

function Share({style, color = '#fff', width = '21.15', height = '25.825'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 21.15 25.825">
        <G
          id="Group_201"
          data-name="Group 201"
          transform="translate(-452.015 -685.375)">
          <G
            id="Group_199"
            data-name="Group 199"
            transform="translate(460.576 692.374)">
            <Line
              id="Line_70"
              data-name="Line 70"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              y1="2.975"
              x2="3.849"
            />
            <Line
              id="Line_71"
              data-name="Line 71"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              x2="3.849"
              y2="2.975"
              transform="translate(0 8.851)"
            />
          </G>
          <G
            id="Group_200"
            data-name="Group 200"
            transform="translate(464.001 685.875)">
            <Circle
              id="Ellipse_36"
              data-name="Ellipse 36"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              cx="4.332"
              cy="4.332"
              r="4.332"
            />
            <Circle
              id="Ellipse_36-2"
              data-name="Ellipse 36"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              cx="4.332"
              cy="4.332"
              r="4.332"
              transform="translate(0 16.161)"
            />
          </G>
          <Circle
            id="Ellipse_36-3"
            data-name="Ellipse 36"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit={10}
            cx="4.332"
            cy="4.332"
            r="4.332"
            transform="translate(452.515 693.955)"
          />
        </G>
      </Svg>
    </View>
  );
}
export default Share;
