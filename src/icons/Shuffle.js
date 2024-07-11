// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Path, G, Circle} from 'react-native-svg';

function Shuffle({style, color = '#c7c7c7'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="17.716"
        height="15.925"
        viewBox="0 0 17.716 15.925">
        <G
          id="Group_85"
          data-name="Group 85"
          transform="translate(-38.5 -631.293)">
          <G
            id="Group_82"
            data-name="Group 82"
            transform="translate(115.298 479.776)">
            <Path
              id="Path_67"
              data-name="Path 67"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              className="cls-1"
              d="M-76.3,154.35h.638a6.694,6.694,0,0,1,5.482,2.852l3.191,4.554a6.7,6.7,0,0,0,5.483,2.853h1.088"
            />
            <Path
              id="Path_68"
              data-name="Path 68"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeMiterlimit={10}
              className="cls-1"
              d="M-76.3,164.609h.638a6.7,6.7,0,0,0,5.482-2.853l3.191-4.554A6.694,6.694,0,0,1-61.5,154.35h1.088"
            />
            <Path
              id="Path_69"
              data-name="Path 69"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cls-2"
              d="M-61.708,152.224l2.126,2.126-2.126,2.126"
            />
            <Path
              id="Path_70"
              data-name="Path 70"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cls-2"
              d="M-61.708,162.483l2.126,2.126-2.126,2.126"
            />
          </G>
        </G>
      </Svg>
    </View>
  );
}
export default Shuffle;
