// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Path, G} from 'react-native-svg';

function Eye({style, color = '#9f9f9f'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="17.25"
        height="13.091"
        viewBox="0 0 17.25 13.091">
        <G
          id="Icon_feather-eye"
          data-name="Icon feather-eye"
          transform="translate(-0.5 -5)">
          <Path
            id="Path_153"
            data-name="Path 153"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2px"
            d="M1.5,11.545S4.273,6,9.125,6s7.625,5.545,7.625,5.545-2.773,5.545-7.625,5.545S1.5,11.545,1.5,11.545Z"
          />
          <Path
            id="Path_154"
            data-name="Path 154"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2px"
            d="M17.659,15.58a2.08,2.08,0,1,1-2.08-2.08A2.08,2.08,0,0,1,17.659,15.58Z"
            transform="translate(-6.455 -4.034)"
          />
        </G>
      </Svg>
    </View>
  );
}
export default Eye;
