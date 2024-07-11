// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

function Like({
  style,
  width = '28.5',
  height = '24.696',
  filled,
  color = '#fff',
}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 28.5 24.696">
        <Path
          id="Path_103"
          data-name="Path 103"
          fill={filled ? color : 'none'}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M286.593,605.417a7.077,7.077,0,0,0-5.265-2.288,6.521,6.521,0,0,0-4.069,1.409,9.53,9.53,0,0,0-2.267,2.623l-.008.01-.008-.01a9.539,9.539,0,0,0-2.268-2.623,6.518,6.518,0,0,0-4.069-1.409,7.076,7.076,0,0,0-5.264,2.288,8.523,8.523,0,0,0-2.142,5.829c0,2.385.887,4.519,2.875,6.918a52.181,52.181,0,0,0,5.944,5.738,33.927,33.927,0,0,0,3.925,2.629,2.024,2.024,0,0,0,2.014,0,34.071,34.071,0,0,0,3.925-2.629,52.179,52.179,0,0,0,5.944-5.738c1.988-2.4,2.874-4.533,2.874-6.918A8.522,8.522,0,0,0,286.593,605.417Z"
          transform="translate(-260.733 -602.629)"
        />
      </Svg>
    </View>
  );
}
export default Like;
