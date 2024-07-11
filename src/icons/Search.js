// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Path, G, Circle} from 'react-native-svg';

function Search({style, active = false, color = '#fff'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="23.156"
        height="23.156"
        viewBox="0 0 23.156 23.156">
        <G
          id="Group_27"
          data-name="Group 27"
          transform="translate(-299.645 -548.68)">
          <Circle
            id="Ellipse_13"
            data-name="Ellipse 13"
            fill={active ? color : 'none'}
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit={10}
            cx="9.703"
            cy="9.703"
            r="9.703"
            transform="translate(300.145 549.18)"
          />
          <Path
            id="Path_26"
            data-name="Path 26"
            fill="none"
            stroke={active ? '#101426' : color}
            strokeLinecap="round"
            strokeMiterlimit={10}
            d="M311.661,552.775a6.383,6.383,0,0,1,3.78,3.057"
          />
          <Line
            id="Line_14"
            data-name="Line 14"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeMiterlimit={10}
            x1="5.385"
            y1="5.385"
            transform="translate(316.708 565.744)"
          />
        </G>
      </Svg>
    </View>
  );
}
export default Search;
