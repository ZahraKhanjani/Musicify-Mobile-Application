// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Path, G, Circle} from 'react-native-svg';

function Queue({style, color = '#b3b3b3'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="17.503"
        height="16.519"
        viewBox="0 0 17.503 16.519">
        <G id="Group_189" data-name="Group 189" transform="translate(0.5 0.5)">
          <G id="Group_180" data-name="Group 180" transform="translate(-1.139)">
            <Line
              id="Line_58"
              data-name="Line 58"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              x2="6.139"
              transform="translate(1.333 14.869)"
            />
            <Path
              id="Line_59"
              data-name="Line 59"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              d="M0,0H6.139"
              transform="translate(1.333 9.913)"
            />
            <Line
              id="Line_60"
              data-name="Line 60"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              x2="15.935"
              transform="translate(1.139 4.956)"
            />
            <Line
              id="Line_61"
              data-name="Line 61"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              x2="15.934"
              transform="translate(1.139 0)"
            />
          </G>
          <Path
            id="Path_97"
            data-name="Path 97"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit={10}
            d="M357.426,709.865l-4.382,2.637a.858.858,0,0,1-1.3-.734v-5.274a.858.858,0,0,1,1.3-.732l4.382,2.637a.858.858,0,0,1,0,1.467Z"
            transform="translate(-341.339 -697.106)"
          />
        </G>
      </Svg>
    </View>
  );
}
export default Queue;
