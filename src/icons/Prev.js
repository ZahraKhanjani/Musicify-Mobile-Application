// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Path, G, Circle} from 'react-native-svg';

function Prev({style, width = 22.384, height = 27.25, color = '#fff'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 22.384 27.25">
        <G id="Group_71" data-name="Group 71" transform="translate(1.396 0.25)">
          <G id="Group_70" data-name="Group 70">
            <Path
              id="Path_51"
              data-name="Path 51"
              fill={color}
              d="M240.357,650.476v24.268a1.4,1.4,0,0,1-2.191,1.08L219.96,663.69a1.281,1.281,0,0,1,0-2.158L238.166,649.4A1.4,1.4,0,0,1,240.357,650.476Z"
              transform="translate(-219.369 -649.154)"
            />
            <Path
              id="Path_54"
              data-name="Path 54"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeWidth="5px"
              d="M307.167,744.893v22.25"
              transform="translate(-306.063 -742.643)"
            />
          </G>
        </G>
      </Svg>
    </View>
  );
}
export default Prev;
