// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Path, G, Rect} from 'react-native-svg';

function PlayListHome({style, active = false, color = '#fff'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="22.293"
        height="21.81"
        viewBox="0 0 22.293 21.81">
        <G
          id="Component_19"
          data-name="Component 19"
          transform="translate(0 0.5)">
          <G
            id="Group_40"
            data-name="Group 40"
            transform="translate(-212.339 -549.769)">
            <Line
              id="Line_15"
              data-name="Line 15"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              x2="16.266"
              transform="translate(215.352 553.094)"
            />
            <Line
              id="Line_16"
              data-name="Line 16"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              x2="9.051"
              transform="translate(218.96 549.769)"
            />
            <G
              id="Rectangle_13"
              data-name="Rectangle 13"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              transform="translate(212.339 555.914)">
              <Rect stroke="none" width="22.293" height="15.165" rx="1.313" />
              <Rect
                fill={active ? color : 'none'}
                x="0.5"
                y="0.5"
                width="21.293"
                height="14.165"
                rx="0.813"
              />
            </G>
            <Path
              id="Path_39"
              data-name="Path 39"
              fill={active ? '#101426' : 'none'}
              stroke={active ? '#101426' : color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              d="M226.856,564.435l-5.611,3.378a1.1,1.1,0,0,1-1.662-.939v-6.755a1.1,1.1,0,0,1,1.662-.94l5.611,3.378A1.1,1.1,0,0,1,226.856,564.435Z"
            />
          </G>
        </G>
      </Svg>
    </View>
  );
}
export default PlayListHome;
