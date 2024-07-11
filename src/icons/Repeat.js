// @flow

import React from 'react';
import {View} from 'react-native';
import Svg, {Line, Path, G, Circle} from 'react-native-svg';

function Repeat({style, color = '#c7c7c7'}) {
  return (
    <View style={style}>
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="15.099"
        height="16.925"
        viewBox="0 0 15.099 16.925">
        <G
          id="Group_93"
          data-name="Group 93"
          transform="translate(-375.5 -599.293)">
          <G id="Group_86" data-name="Group 86" transform="translate(303 -31)">
            <G
              id="Group_81"
              data-name="Group 81"
              transform="translate(125.129 479.776)">
              <Path
                id="Path_71"
                data-name="Path 71"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M-40.165,162.483l2.126,2.126-2.126,2.126"
              />
              <Path
                id="Path_72"
                data-name="Path 72"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M-50,156.476l-2.126-2.126L-50,152.224"
                transform="translate(0 -1)"
              />
              <Path
                id="Path_73"
                data-name="Path 73"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeMiterlimit={10}
                d="M-38.484,164.609H-48.76a3.369,3.369,0,0,1-3.369-3.369v-2.982"
              />
              <Path
                id="Path_74"
                data-name="Path 74"
                fill="none"
                stroke={color}
                strokeLinecap="round"
                strokeMiterlimit={10}
                d="M-51.675,154.35H-41.4a3.368,3.368,0,0,1,3.369,3.368v2.618"
                transform="translate(0 -1)"
              />
            </G>
          </G>
        </G>
      </Svg>
    </View>
  );
}
export default Repeat;
