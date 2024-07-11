// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Path, G, Circle} from 'react-native-svg';

function DownArrow({style, color = '#fff'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="37.058"
        height="22.529"
        viewBox="0 0 37.058 22.529">
        <G transform="matrix(1, 0, 0, 1, 0, 0)">
          <Path
            id="Path_75-2"
            data-name="Path 75"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth="2px"
            d="M-30.074,188.548l-14.115,14.115L-58.3,188.548"
            transform="translate(62.72 -185.13)"
          />
        </G>
      </Svg>
    </View>
  );
}
export default DownArrow;
