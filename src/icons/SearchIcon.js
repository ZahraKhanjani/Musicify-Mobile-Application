// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Path, G} from 'react-native-svg';

function SearchIcon({style, color = '#545766', size = 28.418}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 28.418 28.418">
        <G
          id="Icon_feather-search"
          data-name="Icon feather-search"
          transform="translate(-3.5 -3.5)">
          <Path
            id="Path_137"
            data-name="Path 137"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="join"
            strokeWidth="2px"
            d="M27.614,16.057A11.557,11.557,0,1,1,16.057,4.5,11.557,11.557,0,0,1,27.614,16.057Z"
          />
          <Path
            id="Path_138"
            data-name="Path 138"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="join"
            strokeWidth="2px"
            d="M31.259,31.259l-6.284-6.284"
            transform="translate(-0.756 -0.756)"
          />
        </G>
      </Svg>
    </View>
  );
}
export default SearchIcon;
