// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Path, G, Circle} from 'react-native-svg';

function Next({style, width = 22.384, height = 27.25, color = '#fff'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 22.384 27.25">
        <G
          id="Group_68"
          data-name="Group 68"
          transform="translate(-292.282 -443.75)">
          <G id="Group_70" data-name="Group 70" transform="translate(0 -301)">
            <Path
              id="Path_51"
              data-name="Path 51"
              fill={color}
              className="cls-1"
              d="M219.369,650.476v24.268a1.4,1.4,0,0,0,2.191,1.08l18.206-12.134a1.281,1.281,0,0,0,0-2.158L221.56,649.4A1.4,1.4,0,0,0,219.369,650.476Z"
              transform="translate(72.913 95.846)"
            />
            <Path
              id="Path_54"
              data-name="Path 54"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeWidth="5px"
              className="cls-2"
              d="M307.167,744.893v22.25"
              transform="translate(5 2.357)"
            />
          </G>
        </G>
      </Svg>
    </View>
  );
}
export default Next;
