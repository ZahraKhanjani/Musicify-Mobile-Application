// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Path, G} from 'react-native-svg';

function BackIcon({style, color = '#fff'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="18.087"
        height="28.174"
        viewBox="0 0 18.087 28.174">
        <G className="cls-2" transform="matrix(1, 0, 0, 1, 0, 0)">
          <Path
            id="Path_150-2"
            data-name="Path 150"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth="2px"
            d="M-38.958,188.548l-9.673,9.673-9.673-9.673"
            transform="translate(202.22 61.72) rotate(90)"
          />
        </G>
      </Svg>
    </View>
  );
}
export default BackIcon;
